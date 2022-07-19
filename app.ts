import express, { Request, Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import rTracer from "cls-rtracer";
import loggerMiddelware from "./src/logger.middleware";
import logEntryMiddleware from "./src/logEntry.middleware";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(rTracer.expressMiddleware());
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "service running",
    endpoints: {
      log: {
        type: "POST",
        body: {
          serverity: "info || warning || error",
          process: "at what stage of the application was this log created",
          payload: "data of the logs",
        },
      },
    },
  });
});

app.post(
  "/log",
  [loggerMiddelware, logEntryMiddleware],
  (req: Request, res: Response) => {
    console.log(req.requestID);
    res.status(200).json({
      message: "log recieved",
    });
  }
);

app.listen(port, () => {
  console.log(`⚡️ [server]: Server is running on port ${port}`);
});
