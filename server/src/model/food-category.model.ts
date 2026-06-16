import { model, Schema } from "mongoose";

const FoodCategorySchema = new Schema({
  categoryName:{
    type:String,
    required:true
  }
});

const FoodCategoryModel= model("foodCategory",FoodCategorySchema);