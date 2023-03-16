import express from 'express';
import * as dotenv from 'dotenv';
// cors stands for Cross-origin resource sharing
import cors from 'cors';

import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';

//dotenv.config() allows us to pull the environment variable from .env file
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));

//this is middleware for posting the request
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);

//For showing the response Hello From DAll-E when server is loaded
app.get('/', async (req, res) => {
    res.send('Hello From DALL-E!');
})

//for running the server on port 8080
const startServer = async ()=>{
    try {
        connectDB(process.env.MONGODB_URL);
        app.listen(8080, ()=>console.log('Server has started on port http://localhost:8080'))
    } catch (error) {
        console.log(error);
    }
};

startServer();