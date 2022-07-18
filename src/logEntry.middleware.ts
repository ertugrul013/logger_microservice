import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const Logs = new PrismaClient().logs;

async function logEntryMiddleware(req: Request, res: Response, next: any) {
  const { process } = req.body;
  const serverity = req.body.serverity || "info";
  const data = req.body.payload || "payload data not defined";
  await Logs.create({
    data: {
      serverity: serverity,
      log: data,
      process: process,
    },
  });
  next();
}
export default logEntryMiddleware;
