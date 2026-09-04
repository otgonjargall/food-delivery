import { Hono } from "hono";
import foodCategoryroutes from "./routes/food-category.routes.js";
import { cors } from "hono/cors";
import foodRoute from "./routes/food.routes.js";
import userRoutes from "./routes/user.routes.js";
import { connectDb } from "./util/connectDb.js";

const app = new Hono();

app.use("*", cors());
connectDb();
app.route("/category", foodCategoryroutes);
app.route("/food", foodRoute);
app.route("/user", userRoutes);

export default app;
    