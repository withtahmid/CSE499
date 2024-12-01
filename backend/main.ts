import express from "express";
import cors from "cors";
import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./routes";
import { createContext } from "./trpc";
import Message from "./models/Message"
import Conversation from "./models/Conversation";

const clearDB = async () => {
    await Message.deleteMany({});
    await Conversation.deleteMany({});
    console.log("\n-----------------------------");
    console.log("Database Cleared");
    console.log("-----------------------------\n");
}
(async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1);
    }
})();

const app = express();

app.use(cors());

const PORT = process.env.PORT || 3000;

app.use("/", createExpressMiddleware({ router: appRouter, createContext: createContext }))

app.listen(PORT, () => console.log(`Listenig on port: ${PORT}`));