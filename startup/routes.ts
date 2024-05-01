import express from 'express';
import restaurantRouter from '../routes/Restaurants';
import chefRouter from '../routes/Chefs';
import dishRouter from '../routes/Dishes';
import { Application } from 'express-serve-static-core';
import error from '../middleware/error';

export default function initializeRoutes(app: Application) {
  app.use(express.json());
  
  app.use('/api/restaurants', restaurantRouter);
  app.use('/api/chefs', chefRouter);
  app.use('/api/dishes', dishRouter);
  app.use(error);
}
