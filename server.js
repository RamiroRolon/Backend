import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import userRouter from './src/routes/user.router.js';
import productRouter from './src/routes/product.router.js';
import cartRouter from './src/routes/cart.router.js';
import { errorHandler } from './src/middlewares/errorHandler.js';
import { initMongoDB } from './src/db/database.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/users', userRouter);
app.use('/products', productRouter);
app.use('/carts', cartRouter);

app.use(errorHandler);

initMongoDB();

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`SERVER UP ON PORT ${PORT}`));
