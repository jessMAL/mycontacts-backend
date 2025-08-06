import { Router } from "express";
import * as userController from "../controllers/user-controller.js";
import { validateToken } from "../middleware/validate-token-handler.js";

const router = Router();

router.route("/register").post(userController.registerUser);

router.route("/login").post(userController.loginUser);

router.route("/current").get(validateToken, userController.currentUser);

export default router;
