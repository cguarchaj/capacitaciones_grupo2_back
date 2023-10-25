import { Request, Response, NextFunction } from "express";
import * as repository from '../repositories/login.repository'

export const login = async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;
    return await repository.login(username, password, res) 
}