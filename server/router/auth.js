import express from "express";
import "express-async-error";
import { body } from "express-validator";
import { validate } from "../middleware/validator.js";
import * as authController from "../controller/auth.js";

const router = express.Router();

router.post("/signup", [
  body("username").trim().notEmpty().withMessage("required username"),
  body("password").trim().notEmpty().withMessage("required password"),
  body("name").trim().notEmpty().withMessage("required name"),
  body("email").notEmpty().withMessage("required email").normalizeEmail(),
  validate,
  authController.signup,
]);
router.post("/login", [
  body("username").trim().notEmpty().withMessage("required username"),
  body("password").trim().notEmpty().withMessage("required password"),
  validate,
  authController.login,
]);
router.get("/me");

export default router;
