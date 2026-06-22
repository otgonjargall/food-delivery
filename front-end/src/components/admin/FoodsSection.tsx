export const FoodsSection = ({
  categoryName,
  foods,
  categoryId,
}: {
  categoryName: string;
  foods: any;
  categoryId: string;
}) => {
  const filterfoods = foods?.filter(
    (food: any) => food.category === categoryId,
  );

  return (
    <div className="bg-white rounded-xl w-full mt-4 p-4">
      <h3 className="text-2xl font-semibold">{categoryName}</h3>
      <div>
        {filterfoods?.map((food: any) => {
          return <div key={food._id}>{food.foodname}</div>;
        })}
      </div>
    </div>
  );
};
//  <p>{food.foods}</p>
//             <p>{food.price}</p>
//             <p>{food.ingredients}</p>
