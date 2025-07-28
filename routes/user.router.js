import e, { Router } from "express";
import { login, signUp } from "../controller/user.controller.js";

const router = Router()
router.post('/signup',signUp ).post('/login',login)
export default router;