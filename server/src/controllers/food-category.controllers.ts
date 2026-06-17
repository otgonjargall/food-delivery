import { Context } from "hono";
import { FoodCategoryModel } from "../model/food-category.model.js";
import { connectDb } from "../util/connectDb.js";

export const createFoodCategory = async (c: Context) => {
  await connectDb();
  const input = await c.req.json();

  await FoodCategoryModel.create({
    categoryName: input.categoryName,
  });

  return c.json({
    message: "Successfully created food category",
  });
};

export const getFoodCategories = async (c: Context) => {
  await connectDb();

  const foodCategories = await FoodCategoryModel.find();

  return c.json({
    message: "Categorygoo av",
    foodCategories,
  });
};
