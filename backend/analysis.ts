import dotenv from 'dotenv';
dotenv.config();
import mongoose from "mongoose";

import Message  from "./models/Message"
import Conversation from "./models/Conversation";
import ScoreDistribution from './models/ScoreDistribution';

const run_analysis = async () => {
    const mongooseDocs = await Conversation.find();
    const allConversations = mongooseDocs.map(doc => doc.toObject());
    
    const scores = allConversations.filter(con => con.isFinished === true).map(con => con.obtainedScore);

    console.log(scores.length, "\n");

    console.log(scores);
   

} 

// const init  = async() => {
//     // const initial = [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]
//     // const dist = new ScoreDistribution({
//     //     distribution: initial
//     // });

//     // await dist.save();
//     console.log(dist._id); //674a245cf0ed5ec5c609268b

// }

(async()=>{
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log('Connected to MongoDB');
        await run_analysis();
        // init();
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1);
    }
})();



