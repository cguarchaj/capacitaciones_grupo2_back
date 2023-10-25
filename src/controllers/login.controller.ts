import * as express from 'express';
import validateHandler from '../middlewares/validate.handler';
import * as service from '../service/login.service';
import { authenticateSchema } from '../schemas/login.schema';

export const login: express.RequestHandler[] = [validateHandler(authenticateSchema, 'body'), service.login];
