import { Request, Response, NextFunction } from "express";

const errorHandlerMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(`Error capturado: ${err.message}`);

    res.status(400).json({
        status: 'error',
        message: 'Ocurrio un error inesperado. Por favor, intente mas tarde.'
    });
};

export default errorHandlerMiddleware;