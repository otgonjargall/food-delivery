
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { useState, ChangeEvent } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea"; // Хэрэв textarea компонент байхгүй бол энгийн <textarea> ашиглаж болно
import { uploadFile } from "@/lib/uploadFile";
import { Image as ImageIcon } from "lucide-react";

export const CreateFoodDialog = ({
  categoryid,
  getFoods,
  categoryName = "Appetizers", // Шаардлагатай бол ангилалын нэрийг динамикаар дамжуулж болно
}: {
  categoryid: string;
  getFoods: () => void;
  categoryName?: string;
}) => {
  const [foodName, setFoodName] = useState("");
  const [price, setPrice] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFoodName = (e: ChangeEvent<HTMLInputElement>) => {
    setFoodName(e.target.value);
  };

  const handlePrice = (e: ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };

  const handleIngredients = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setIngredients(e.target.value);
  };

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const createFood = async () => {
    if (!file) {
      console.log("zuragaa oruulna uu");
      return;
    }

    try {
      const imageUrl = await uploadFile(file);
      await axios.post("http://localhost:3001/food", {
        foodName: foodName,
        price: Number(price),
        ingredients: ingredients,
        category: categoryid,
        image: imageUrl,
      });
      getFoods();
    } catch (error) {
      console.error("Error creating food:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Open</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[480px] p-6 rounded-2xl gap-6">
        <DialogHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Add new Dish to {categoryName}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5">
          {/* Food name & Price row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">
                Food name
              </label>
              <Input
                onChange={handleFoodName}
                value={foodName}
                type="text"
                placeholder="Type food name"
                className="bg-white border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-400"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-900">
                Food price
              </label>
              <Input
                onChange={handlePrice}
                value={price}
                type="number"
                placeholder="Enter price..."
                className="bg-white border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-400"
              />
            </div>
          </div>

          {/* Ingredients */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">
              Ingredients
            </label>
            <Textarea
              onChange={handleIngredients}
              value={ingredients}
              placeholder="List ingredients..."
              className="min-h-[100px] resize-none border-gray-200 focus-visible:ring-1 focus-visible:ring-gray-400"
            />
          </div>

          {/* Image Upload Area */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900">
              Food image
            </label>
            <div className="relative flex flex-col items-center justify-center rounded-xl border border-dashed border-blue-200 bg-blue-50/30 p-8 text-center transition hover:bg-blue-50/50">
              <input
                type="file"
                accept="image/*"
                onChange={handleFile}
                className="absolute inset-0 z-10 opacity-0 cursor-pointer"
              />
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-sm">
                <ImageIcon className="h-5 w-5 text-gray-600" />
              </div>
              <p className="text-sm font-medium text-gray-700">
                {file ? file.name : "Choose a file or drag & drop it here"}
              </p>
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-end pt-2">
            <DialogClose asChild>
              <Button
                onClick={createFood}
                className="bg-[#18181B] text-white hover:bg-black px-6 py-2.5 rounded-lg text-sm font-medium"
              >
                Add Dish
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};