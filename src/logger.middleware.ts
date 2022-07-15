import { Request, Response } from "express";
import { logger } from "./logger";

function loggerMiddelware(req: Request, res: Response, next: any) {
  const process = req.body.process;

  switch (req.body.serverity) {
    case "info":
      logger.info(req.body, `Info log ${process}`);
      break;
    case "warning":
      logger.warn(req.body, `Warning log ${process}`);
      break;
    case "error":
      logger.error(req.body, `Erro log ${process}`);
      break;
    default:
      logger.info(req.body, `Info log ${process}`);
      break;
  }
  next();
}

export default loggerMiddelware;
