import { Hono } from "hono";
import {
  createFood,
  deletfood,
  getfoods,
} from "../controllers/food-controllers.js";

const foodRoute = new Hono();
foodRoute.post("/", createFood);
foodRoute.get("/", getfoods);
foodRoute.delete("/:id", deletfood);
export default foodRoute;
