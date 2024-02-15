import express, { Request, Response } from "express";

const app = express();

app.use(express.json());

app.use("*", (request: Request, response: Response) => {
  response.status(404).json({ message: "Invalid route" });
});

export default app;
