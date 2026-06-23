import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { useState } from "react";
export const CreateFoodDialog = ({ categoryid }: { categoryid: string }) => {
  const [foodName, setFoodName] = useState("");
  const [price, setPrice] = useState("");
  const [ingredients, setIngredients] = useState("");

  const handleFoodName = (e: any) => {
    const { value } = e.target;

    setFoodName(value);
  };
  const handlePrice = (e: any) => {
    const { value } = e.target;

    setPrice(value);
  };
  const handleIngredients = (e: any) => {
    const { value } = e.target;

    setIngredients(value);
  };
  const createFood = async () => {
    const response = await axios.post("http://localhost:3001/food", {
      foodName: foodName,
      price: price,
      ingredients: ingredients,
      category: categoryid,
    });
  };

  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Food</DialogTitle>
        </DialogHeader>
        <div>
          <p>foodname</p>
          <input onChange={handleFoodName} type="text" />
        </div>
        <div>
          <p>price</p>
          <input onChange={handlePrice} type="number" />
        </div>
        <div>
          <p>ingredients</p>
          <input onChange={handleIngredients} type="text" />
        </div>
        <button>add food</button>
      </DialogContent>
    </Dialog>
  );
};
