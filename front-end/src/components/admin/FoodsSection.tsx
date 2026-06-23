import { CreateFoodDialog } from "./CreateFoodDialog";

export const FoodsSection = ({
  categoryName,
  foods,
  categoryId,
}: {
  categoryName: string;
  foods: any;
  categoryId: string;
}) => {
  const filterfoods = foods.filter((food: any) => food.category === categoryId);
  return (
    <div className="bg-white rounded-xl w-full mt-4 p-4">
      <h3 className="text-2xl font-semibold">{categoryName}</h3>
      <CreateFoodDialog categoryid={categoryId} />
      {filterfoods.map((food) => (
        <div className="p-3 rounded-xl border w-fit">
          <img className="w-[260px] rounded-xl" src={food.image} alt="" />
          <div className="flex justify-between">
            <p>{food.foodname}</p>
            <p>{food.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
