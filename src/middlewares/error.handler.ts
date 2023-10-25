import { Request, Response, NextFunction } from "express";
import { Boom } from '@hapi/boom'

function LogErrors(err: Error, req: Request, res: Response, next: NextFunction): void {    
    console.log('Log Errors');
    console.log(err);
    next(err);
}

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {    
    console.log('Error Handler');
    
    res.status(500).json({
        message: err.message,
        stack: err.stack
    })
}

function boomHandler(err: Boom, req: Request, res: Response, next: NextFunction) {    
    if (err.isBoom) {
        const { output } = err;

        res.status(output.statusCode).json(output.payload);
    }

    next(err);
}

export { LogErrors, errorHandler, boomHandler }