import express from 'express';
import * as dotenv from 'dotenv';
// cors stands for Cross-origin resource sharing
import cors from 'cors';

//dotenv.config() allows us to pull the environment variable from .env file
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));