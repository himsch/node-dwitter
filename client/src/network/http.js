import axios from "axios";
import axiosRetry from "axios-retry";

const defaultRetryConfig = {
  retries: 5,
  initialDelayMs: 100,
};
export default class HttpClient {
  constructor(
    baseURL,
    authErrorEventBus,
    getCsrfToken,
    config = defaultRetryConfig // 설정값은 외부에서 전달받는게 좋다.
  ) {
    this.authErrorEventBus = authErrorEventBus;
    this.getCsrfToken = getCsrfToken;
    this.client = axios.create({
      baseURL,
      headers: { "Content-Type": "application/json" },
      withCredentials: true, // fetch 의 credentials: "include" 같다.
    });
    axiosRetry(this.client, {
      retries: config.retries,
      retryDelay: (retry) => {
        const delay = Math.pow(2, retry) * config.initialDelayMs; // 100 200 400 800 1600
        const jitter = delay * 0.1 * Math.random(); // 10 20 40 80 160 안에서 랜덤한 값 생성.
        return delay + jitter;
      },
      retryCondition: (err) =>
        axiosRetry.isNetworkOrIdempotentRequestError(err) || // 네트워크 에러 || 상태를 변경하지않는 요청일때
        err.response.status === 429, // || 또는 상태코드가 429 일때 재시도.
    });
  }

  async fetch(url, options) {
    const { body, method, headers } = options;
    const req = {
      url,
      method,
      headers: {
        ...headers,
        "dwitter-csrf-token": this.getCsrfToken(),
      },
      data: body,
    };

    try {
      const res = await this.client(req);
      return res.data;
    } catch (e) {
      // network error || status 200대가 아닐시 에러.
      if (e.response) {
        const data = e.response.data;
        const message =
          data && data.message ? data.message : "Something went wrong! 💩";
        throw new Error(message);
      }
      throw new Error("connection error");
    }
  }
}
