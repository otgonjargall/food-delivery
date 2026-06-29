import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { uploadFile } from "@/lib/uploadFile";
export const CreateFoodDialog = ({
  categoryid,
  getFoods,
}: {
  categoryid: string;
  getFoods: () => void;
}) => {
  const [foodName, setFoodName] = useState("");
  const [price, setPrice] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [file, setFile] = useState<File>();

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

  const handleFile = (e: any) => {
    const uploadedFile = e.target.files;
    [0];

    setFile(uploadedFile);
  };

  const createFood = async () => {
    if (!file) {
      console.log("zuragaa oruulna uu");
      return;
    }

    const imageUrl = await uploadFile(file);
    const response = await axios.post("http://localhost:3001/food", {
      foodName: foodName,
      price: price,
      ingredients: ingredients,
      category: categoryid,
      image: imageUrl,
    });
    getFoods;
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
          <Input onChange={handleFoodName} type="text" />
        </div>
        <div>
          <p>price</p>
          <Input onChange={handlePrice} type="number" />
        </div>
        <div>
          <p>ingredients</p>
          <Input onChange={handleIngredients} type="text" />
        </div>

        <div>
          <p>Image</p>
          <Input onChange={handleFile} type="file" />
        </div>
        <DialogClose asChild>
          <Button onClick={createFood}>add food</Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
};
