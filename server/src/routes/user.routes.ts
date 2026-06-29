import { Hono } from "hono";
import { signUp } from "../controllers/user.controllers.js";

const userRoutes = new Hono();

userRoutes.post("/signup", signUp);

export default userRoutes;
