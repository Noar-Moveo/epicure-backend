import express from "express";
import chefRouter from "./routes/chefRouter";
import dishRouter from "./routes/dishRouter";
import restaurantRouter from "./routes/restaurantRouter";
import searchRouter from "./routes/searchRoute";

const v1Routes = express.Router();

v1Routes.use("/chefs", chefRouter);
v1Routes.use("/dishes", dishRouter);
v1Routes.use("/restaurants", restaurantRouter);
v1Routes.use("/search", searchRouter);

export default v1Routes;
