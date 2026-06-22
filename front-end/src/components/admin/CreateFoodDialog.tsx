import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
export const CreateFoodDialog = () => {
  return (
    <Dialog>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Food</DialogTitle>
        </DialogHeader>
        <div>
          <p>foodname</p>
          <input type="text" />
        </div>
        <div>
          <p>price</p>
          <input type="text" />
        </div>
        <div>
          <p>ingredients</p>
          <input type="text" />
        </div>
      </DialogContent>
      <button>add food</button>
    </Dialog>
  );
};
