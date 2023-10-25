import { Request, Response, NextFunction } from "express";
import Joi, { Schema } from 'joi';
import boom from '@hapi/boom'

function validateHandler(schema: Schema, property: string) {
    return (req: Request, res: Response, next: NextFunction) => {
        const data = req[property as keyof Request];
        const { error } = schema.validate(data, { abortEarly: false });
        if (error) {
            next(boom.badRequest(error.details[0].message));
        }

        next();
    }
}

export default validateHandler;