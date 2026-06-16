import { Hono } from 'hono'
import { connectDb } from './util/connectDb.js'
import { Schema, model  } from 'mongoose'
import { read } from 'fs';

const FoodCategorySchema = new Schema({
  categoryName:{
    type:String,
    required:true
  }
});

const FoodCategoryModel= model("foodCategory",FoodCategorySchema);

const app = new Hono()

app.post ("/category",async(c)=>{
  await connectDb()
  const input=await c.req.json()
  await FoodCategoryModel.create({
    categoryName: input.categoryName,
  })
  return c.json({
    message:"Successfully created food category",
  })
})
//hustelt yvuulah
app.get("/category",async (c)=>{
  await connectDb();

  const foodCategories= await FoodCategoryModel.find();

  return c.json({
    message:"Categorygoo av",
    foodCategories,
  })
})
//4-16 sariin odor
//zagdag
app.put("/category/id", async (c)=>{
  await connectDb();
  const id = c.req.json();
  const input = await c.req.json();

  const response=await FoodCategoryModel.findByIdAndUpdate(id,{
    categoryName:input.categoryName,
  });

  return c.json({
    message:"Successfully updated",
    response,
  })
})
// uusgah
app.delete("/category", async(c)=>{
  await connectDb()
  const id = c.req.param("id")

  const response = await FoodCategoryModel.findByIdAndDelete(id)
  return c.json({
    messege:"Successfully deleted",
    response,
  })
})
export default app;
