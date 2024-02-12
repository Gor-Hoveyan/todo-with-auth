import { Router } from "express";
import { authController } from "../controllers/authController";
import { check } from "express-validator";

const router = Router();

router.post('/registration', [
    check('userName', 'Username must contain at least 3 letters').isLength({min: 2}),
    check('password', 'Password must contain at least 7 letters').isLength({min: 6})
] ,authController.registration);
router.post('/login', authController.login);
router.get('/authoLog', authController.authoLog);

export { router };