import { Hono } from "hono";
import {
  createFoodCategory,
  deteleFoodCategories,
  getFoodCategories,
  updateFoodCategories,
} from "../controllers/food-category.controllers.js";

const foodCategoryroutes = new Hono();

foodCategoryroutes.post("/", createFoodCategory);
foodCategoryroutes.get("/", getFoodCategories);
foodCategoryroutes.put("/:id", updateFoodCategories);
foodCategoryroutes.delete("/:id", deteleFoodCategories);

export default foodCategoryroutes;
