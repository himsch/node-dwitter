import bcrypt from "bcrypt";
import { config } from "../config.js";

export const csrfCheck = (req, res, next) => {
  if (
    req.method === "GET" ||
    req.method === "OPTIONS" ||
    req.method === "HEAD"
  ) {
    return next();
  }

  const csrfHeader = req.get("dwitter-csrf-token");

  if (!csrfHeader) {
    console.warn(
      'Missing required "dwitter-csrf-token" header.',
      req.headers.origin
    );
    return res.status(403).json({ message: "Failed CSRF check" });
  }

  validateCsrfToken(csrfHeader)
    .then((valid) => {
      if (!valid) {
        console.warn(
          'Value provided in "dwitter-csrf-token" header does not validate.',
          req.headers.origin,
          csrfHeader
        );
        return res.status(403).json({ message: "Failed CSRF check" });
      }
      return next();
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json({ message: "Something went wrong" });
    });
};

const validateCsrfToken = async (csrfHeader) => {
  return bcrypt.compare(config.csrf.plainToken, csrfHeader);
};
