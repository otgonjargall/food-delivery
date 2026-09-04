
"use client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Plus } from "lucide-react";
import { useState } from "react";
import axios from "axios";

const AddCategoryDialog = ({
  getCategories,
}: {
  getCategories: () => void;
}) => {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const addNewCategory = async () => {
    if (!value.trim()) return;

    try {
      await axios.post("http://localhost:3001/category", {
        categoryName: value,
      });
      setValue(""); // Ажилттай болсны дараа хоосон болгоно
      getCategories();
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full bg-red-600 p-0 h-10 w-10 flex items-center justify-center">
          <Plus size={24} />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[460px] p-6 rounded-2xl gap-6">
        <DialogHeader className="p-0">
          <DialogTitle className="text-xl font-semibold text-gray-900">
            Add new category
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Input section */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-900 block">
              Category name
            </label>
            <Input
              value={value}
              onChange={handleChange}
              placeholder="Type category name..."
              className="w-full h-11 px-3.5 rounded-lg border border-gray-200 text-sm focus-visible:ring-1 focus-visible:ring-gray-400 placeholder:text-gray-400"
            />
          </div>

          {/* Action Button */}
          <div className="flex justify-end pt-2">
            <DialogClose asChild>
              <Button
                onClick={addNewCategory}
                className="bg-[#18181B] text-white hover:bg-black px-5 py-2.5 rounded-lg text-sm font-medium h-auto"
              >
                Add category
              </Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryDialog;


