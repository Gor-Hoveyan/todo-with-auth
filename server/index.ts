import express, { Request, Response } from "express";
import next from "next";
import mongoose from "mongoose";
import { router as authRouter } from "./routers/authRouter";
import { router as todoRouter } from './routers/todosRouter'
import cookieParser from 'cookie-parser';

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

mongoose.connect('mongodb+srv://gor:333@cluster0.59djijr.mongodb.net/?retryWrites=true&w=majority').then(() => {
  console.log('DB connected on port 3000');
}).catch(err => {
  console.log(err);
});

(async () => {
  try {
    await app.prepare();
    const server = express();
    server.use(cookieParser())
    server.use(express.json());
    server.use('/api/auth/', authRouter);
    server.use('/api/todos/', todoRouter);
    server.all("*", (req: Request, res: Response) => {
      return handle(req, res);
    });

    server.listen(3000, (err?: any) => {
      if (err) throw err;
      console.log(`> Ready on localhost:${3000} - env ${process.env.NODE_ENV}`);
    });

  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();