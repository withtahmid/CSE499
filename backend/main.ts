import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./routes";
import { createContext } from "./trpc";

const optionalFn = async () => {
    // await User.deleteMany({});
    // console.log("Deleted User collection")
}

(async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI ?? "null");
        console.log('Connected to MongoDB');
        // optionalFn()
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
})()

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;
app.use("/", createExpressMiddleware({ router: appRouter, createContext: createContext }))
app.listen(PORT, () => console.log(`Listenig on port: ${PORT}`));