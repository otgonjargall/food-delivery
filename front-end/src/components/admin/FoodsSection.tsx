
import { CreateFoodDialog } from "./CreateFoodDialog";
import { Pencil } from "lucide-react";

interface Food {
  _id?: string;
  foodName: string;
  price: number;
  ingredients: string;
  image: string;
  category: string;
}

export const FoodsSection = ({
  categoryName,
  foods,
  categoryId,
  getFoods,
}: {
  categoryName: string;
  foods: Food[];
  categoryId: string;
  getFoods: () => void;
}) => {
  const filterfoods = foods.filter((food) => food.category === categoryId);

  return (
    <div className="bg-white rounded-2xl w-full mt-4 p-6 border border-gray-100 shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900">{categoryName}</h3>
        <CreateFoodDialog categoryid={categoryId} getFoods={getFoods} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filterfoods.map((food) => (
          <div
            key={food._id || food.foodName}
            className="p-4 rounded-3xl border border-gray-200 bg-white flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow"
          >
            {/* Зургийн хэсэг ба Edit товч */}
            <div className="relative w-full h-44 mb-3">
              <img
                className="w-full h-full object-cover rounded-2xl"
                src={food.image}
                alt={food.foodName}
              />
              <button
                type="button"
                className="absolute bottom-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-gray-50 transition-transform active:scale-95"
              >
                <Pencil className="w-4 h-4 text-red-500 fill-red-500" />
              </button>
            </div>

            {/* Нэр болон Үнэ */}
            <div className="flex justify-between items-start gap-2 mb-2">
              <h4 className="text-lg font-bold text-red-500 leading-tight">
                {food.foodName}
              </h4>
              <span className="text-base font-semibold text-gray-900 whitespace-nowrap">
                ${food.price}
              </span>
            </div>

            {/* Орц найрлага */}
            <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
              {food.ingredients}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};



