import { Request, Response } from "express";
import { logger } from "./logger";
import rTracer from "cls-rtracer";

async function loggerMiddelware(req: Request, res: Response, next: any) {
  const { serverity, process } = req.body;

  // get req id and assign it to the request object
  req.requestID = rTracer.id() || "id unkown";
  const requestID = req.requestID;

  switch (serverity) {
    case "info":
      logger.info(
        {
          requestID: requestID,
          data: req.body,
        },
        `Info log ${process}`
      );
      break;
    case "warning":
      logger.warn(
        {
          requestID: requestID,
          data: req.body,
        },
        `Warning log ${process}`
      );
      break;
    case "error":
      logger.error(
        {
          requestID: requestID,
          data: req.body,
        },
        `Erro log ${process}`
      );
      break;
    default:
      logger.info(
        {
          requestID: requestID,
          data: req.body,
        },
        `Info log ${process}`
      );
      break;
  }
  next();
}

export default loggerMiddelware;
