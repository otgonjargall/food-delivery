

"use client";
import axios from "axios";
import { Badge } from "@/components/ui/badge";
import { useContext, useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import AddCategoryDialog from "@/components/admin/AddCategoryDialog";
import { FoodsSection } from "@/components/admin/FoodsSection";
import { UserContext } from "@/context/UserContext";

type FoodType = {
  foodName: string; // backend-ийн форматаас хамаарч foodName эсвэл foodname хэрэглэнэ
  price: number;
  ingredients: string;
  image: string;
  category: string;
  _id: string;
};

type CategoryType = {
  categoryName: string;
  _id: string;
};

const Page = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [loading, setLoading] = useState(true);
  const [foods, setFoods] = useState<FoodType[]>([]);
  const context = useContext(UserContext);
  console.log("CONTEXT",context)
  const getCategories = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3001/category");
      setCategories(response.data.foodCategories || []);
    } catch (error) {
      console.error("Categories татахад алдаа гарлаа:", error);
    } finally {
      setLoading(false);
    }
  };

  const getFoods = async () => {
    try {
      const response = await axios.get("http://localhost:3001/food");
      setFoods(response.data.foods || []);
    } catch (error) {
      console.error("Foods татахад алдаа гарлаа:", error);
    }
  };

  useEffect(() => {
    getCategories();
    getFoods();
  }, []);

  return (
    <div className="min-h-screen w-full bg-secondary p-6">
      <div className="w-full rounded-2xl p-6 space-y-6 bg-white shadow-xs">
        <h3 className="text-xl font-bold text-gray-900">Dishes Category</h3>
         
        {/* Категорийн тагууд */}
        <div className="flex items-center gap-3 flex-wrap">
          {loading ? (
            <>
              <Skeleton className="h-10 w-28 rounded-full" />
              <Skeleton className="h-10 w-28 rounded-full" />
              <Skeleton className="h-10 w-28 rounded-full" />
            </>
          ) : (

            categories.map((category) => {
              // Тухайн категорид хамаарах хоолны тоог динамикаар тооцоолох
              const foodCount = foods.filter(
                (food) => food.category === category._id
              ).length;

              return (
                <div
                  key={category._id}
                  className="rounded-full py-2 px-4 border border-gray-200 bg-white flex items-center gap-2 font-medium text-sm text-gray-800"
                >
                  {category.categoryName}
                  <Badge
                    variant="secondary"
                    className="bg-gray-100 text-gray-900 rounded-full px-2 py-0.5 text-xs font-semibold"
                  >
                    {foodCount}
                  </Badge>
                </div>
              );
            })
          )}

          <AddCategoryDialog getCategories={getCategories} />
        </div>

        {/* Категори тус бүрийн хоолнуудын хэсэг */}
        <div className="space-y-8 pt-4">
          {categories.map((category) => (
            <div key={category._id}>
              <FoodsSection
                getFoods={getFoods}
                foods={foods}
                categoryId={category._id}
                categoryName={category.categoryName}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;



