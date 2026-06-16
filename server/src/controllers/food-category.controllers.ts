import { connectDb } from "../util/connectDb.js"

export const createFoodCategory =async()=>{
    await connectDb()
      const input=await c.req.json()
      await FoodCategoryModel.create({
        categoryName: input.categoryName,
      })
      return c.json({
        message:"Successfully created food category",
      })
}