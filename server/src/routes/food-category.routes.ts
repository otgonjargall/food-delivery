import { Hono } from "hono";
import {
  createFoodCategory,
  getFoodCategories,
} from "../controllers/food-category.controllers.js";

const foodCategoryroutes = new Hono();

foodCategoryroutes.post("/", createFoodCategory);
foodCategoryroutes.get("/", getFoodCategories);

export default foodCategoryroutes;
