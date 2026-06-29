"use client";
import axios from "axios";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import AddCategoryDialog from "@/components/admin/AddCategoryDialog";
import { FoodsSection } from "@/components/admin/FoodsSection";
type FoodType = {
  foodname: string;
  price: number;
  ingredients: string;
  image: string;
  _id: string;
};
type CategoryType = {
  categoryName: string;
  _id: string;
};
const Page = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(false);
  const [foods, setFoods] = useState<FoodType[]>([]);

  const getCategories = async () => {
    setLoading(true);
    const response = await axios.get("http://localhost:3001/category");

    console.log("irj baiga hariu", response);
    setCategories(response.data.foodCategories);
    setLoading(false);
  };

  const getFoods = async () => {
    const response = await axios.get("http://localhost:3001/food");
    console.log("data irjinuu", response);
    setFoods(response.data.foods);
  };
  useEffect(() => {
    getCategories();
    getFoods();
  }, []);
  return (
    <div className="h-screen w-full bg-secondary p-6">
      <div className="w-full rounded-xl p-6 space-y-4 bg-white">
        <h3 className="text-xl font-semibold">Dishes Category</h3>

        <div className="flex items-center gap-4 flex-wrap">
          {loading ? <Skeleton className="h-6 w-20" /> : ""}
          {categories.map((category) => {
            return (
              <div
                key={category._id}
                className="rounded-full  py-2 px-4 border"
              >
                {category.categoryName}
                <Badge className="gap-4">5</Badge>
              </div>
            );
          })}
          <AddCategoryDialog getCategories={getCategories} />
        </div>
        <div>
          {categories?.map((category) => {
            return (
              <FoodsSection
                getFoods={getFoods}
                foods={foods}
                categoryId={category._id}
                categoryName={category.categoryName}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Page;
