import { Context } from "hono";
import { connectDb } from "../util/connectDb.js";
import { FoodModel } from "../model/food.model.js";

export const createFood = async (c: Context) => {
  await connectDb();

  const input = await c.req.json();
  console.log("INPUT", input);
  const response = await FoodModel.create({
    foodname: input.foodname,
    price: input.price,
    ingredients: input.ingredients,
    image: input.image,
    category: input.category,
  });

  return c.json({
    message: "Amjilttai hool nemlee",
    foot: response,
  });
};
export const getfoods = async (c: Context) => {
  await connectDb();

  const response = await FoodModel.find();

  return c.json({
    message: "amjilttai",
    foods: response,
  });
};
export const deletfood = async (c: Context) => {
  await connectDb();
  const id = c.req.param("id");
  const fooddelete = await FoodModel.findByIdAndDelete(id);
  return c.json({
    message: "amjilttai ustdlaa",
    fooddelete,
  });
};
