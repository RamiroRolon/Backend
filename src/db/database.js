import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); 

const connectionString = process.env.MONGODB_URI; 

export const initMongoDB = async () => {
  try {
    mongoose.set('strictQuery', true); 
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado a la base de datos de MongoDB');
  } catch (error) {
    console.log(`ERROR => ${error}`);
  }
};
