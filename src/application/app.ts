import express, { Request, Response } from "express";
import { companyRoutes, jobRoutes } from "./routes";

const app = express();

app.use(express.json());

companyRoutes(app);
jobRoutes(app)

app.use("*", (request: Request, response: Response) => {
  response.status(404).json({ message: "Invalid route" });
});

export default app;
