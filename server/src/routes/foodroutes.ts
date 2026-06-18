import { Hono } from "hono";
import {
  createFood,
  deletfood,
  getfood,
} from "../controllers/food-controllers.js";

const foodRoute = new Hono();
foodRoute.post("/", createFood);
foodRoute.get("/", getfood);
foodRoute.delete("/:id", deletfood);
export default foodRoute;
