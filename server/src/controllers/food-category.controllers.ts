import { Context } from "hono";
import { FoodCategoryModel } from "../model/food-category.model.js";
import { connectDb } from "../util/connectDb.js";
//post huselt
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
//get huselt
export const getFoodCategories = async (c: Context) => {
  await connectDb();

  const foodCategories = await FoodCategoryModel.find();

  return c.json({
    message: "Categorygoo av",
    foodCategories,
  });
};

//localhost:3001/category/90-12390
//put huselt
export const updateFoodCategories = async (c: Context) => {
  await connectDb();

  const id = c.req.param("id");
  const input = await c.req.json();

  const res = await FoodCategoryModel.findByIdAndUpdate(id, {
    categoryName: input.categoryName,
  });

  return c.json({
    message: "Amjilttai zaslaa",
  });
};
//delete uustgah
export const deteleFoodCategories = async (c: Context) => {
  await connectDb();
  const id = c.req.param("id");

  const res = await FoodCategoryModel.findByIdAndDelete(id);
  return c.json({
    message: "amjilttai ustlal",
  });
};
