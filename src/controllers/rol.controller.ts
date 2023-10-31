import * as express from 'express';
import validateHandler from '../middlewares/validate.handler';
import * as service from '../service/rol.service';
import {
    createSchema,
    updateSchema,
    actionSchema,
    oneSchema
 } from '../schemas/rol.schema';

 export const create: express.RequestHandler[] = [validateHandler(createSchema, 'body'), service.create];
 export const update: express.RequestHandler[] = [validateHandler(updateSchema, 'body'), service.update];
 export const action: express.RequestHandler[] = [validateHandler(actionSchema, 'body'), service.action];
 export const getAll: express.RequestHandler = service.getAll;
 export const getOne: express.RequestHandler[] = [validateHandler(oneSchema, 'body'), service.getOne];
 export const getLabel: express.RequestHandler = service.getLabel;