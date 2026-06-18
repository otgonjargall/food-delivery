import { Hono } from "hono";
import foodCategoryroutes from "./routes/food-category.routes.js";
import { cors } from "hono/cors";
import foodRoute from "./routes/foodroutes.js";

const app = new Hono();

app.use("*", cors());

app.route("/category", foodCategoryroutes);
app.route("/food", foodRoute);

export default app;
