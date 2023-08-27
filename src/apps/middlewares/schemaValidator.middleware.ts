import { NextFunction, Request, Response } from "express";
import Joi from "joi";

export interface SchemaValidator {
  query?: Joi.ObjectSchema;
  body?: Joi.ObjectSchema;
}

export const schemaValidator =
  (schemaValidators: SchemaValidator) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (schemaValidators.query) {
        req.query = await schemaValidators.query.validateAsync(req.query);
      }
      if (schemaValidators.body) {
        req.body = await schemaValidators.body.validateAsync(req.body);
      }
      next();
    } catch (error) {
      return res.status(400).send({
        error: {
          message: error.details.map((detail) => detail.message).join(", "),
          code: 400,
        },
      });
    }
  };
