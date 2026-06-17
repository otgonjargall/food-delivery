import { Hono } from "hono";

import foodCategoryroutes from "./routes/food-category.routes.js";
import { cors } from "hono/cors";

const app = new Hono();
app.use("*", cors());
app.route("/category", foodCategoryroutes);

// app.post ("/category",async(c)=>{
//   await connectDb()
//   const input=await c.req.json()
//   await FoodCategoryModel.create({
//     categoryName: input.categoryName,
//   })
//   return c.json({
//     message:"Successfully created food category",
//   })
// })
// //hustelt yvuulah
// app.get("/category",async (c)=>{
//   await connectDb();

//   const foodCategories= await FoodCategoryModel.find();

//   return c.json({
//     message:"Categorygoo av",
//     foodCategories,
//   })
// })
// //4-16 sariin odor
// //zagdag
// app.put("/category/id", async (c)=>{
//   await connectDb();
//   const id = c.req.json();
//   const input = await c.req.json();

//   const response=await FoodCategoryModel.findByIdAndUpdate(id,{
//     categoryName:input.categoryName,
//   });

//   return c.json({
//     message:"Successfully updated",
//     response,
//   })
// })
// // uusgah
// app.delete("/category", async(c)=>{
//   await connectDb()
//   const id = c.req.param("id")

//   const response = await FoodCategoryModel.findByIdAndDelete(id)
//   return c.json({
//     messege:"Successfully deleted",
//     response,
//   })
// })
export default app;
