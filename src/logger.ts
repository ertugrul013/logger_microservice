import Pino from "pino";
import rTracer from "cls-rtracer";

export const logger = Pino({
  level: "info",
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: true,
    },
  },
  mixin() {
    return { requestID: rTracer.id() };
  },
  base: undefined, //remove pid and hostname
  timestamp: Pino.stdTimeFunctions.isoTime,
});
