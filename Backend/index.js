// Package imports
import express  from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import chatRoute from './routes/chat.js';
import conversation from './routes/conversation.js'

// Default Configurations
dotenv.config();

const app = express();
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors());
app.use(bodyParser.json());

// Routes
// using default langchain
app.use('/chat', conversation);

// using custom lang chain
// app.use('/chat', chatRoute);

app.get('/', (req, res)=>{
    return res.send("HELLO WORLD");
})

// Start listening
const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})