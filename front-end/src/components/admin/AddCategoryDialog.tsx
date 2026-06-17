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
    console.log("Event", e);
    setValue(e.target.value);
  };

  const addNewCategory = async () => {
    await axios.post("http://localhost:3001/category", {
      categoryName: value,
    });
    getCategories();
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="rounded-full bg-red-600 p-4 h-10 w-10">
            <Plus size={24} />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
          </DialogHeader>
          <p>Category Name</p>
          <input onChange={handleChange} placeholder="Type category name..." />
          <DialogClose asChild>
            <Button onClick={addNewCategory}>Add</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddCategoryDialog;
