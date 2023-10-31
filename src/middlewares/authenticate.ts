import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

const SECRET_KEY = "$2a$10$pyeJIvj2jWuSGW@PROYECT2@2023+ORACLE_CAPACITACIONES_EPQ";

const authenticate = (req: Request, res: Response, next: NextFunction): boolean => {
    const token =  req.headers.authorization?.split(' ')[1];

    if (!token) {
        return false;
    }

    try {
        jwt.verify(token, SECRET_KEY) as JwtPayload
        return true;
    } catch (error) {
        return false;
    }
}

export default authenticate;