import { Request, Response, NextFunction } from "express";
import * as repository from '../repositories/rol.repository'

export const create = async (req: Request, res: Response, next: NextFunction) => {
    const nombre: string = req.body.nombre;
    const usuario: string = req.body.usuario;

    return await repository.create(1, nombre, usuario, req, res)
}

export const update = async (req: Request, res: Response, next: NextFunction) => {
    const id: number = req.body.id;
    const nombre: string = req.body.nombre;
    const usuario: string = req.body.usuario;

    return await repository.update(2, id, nombre, usuario, req, res)
}

export const action = async (req: Request, res: Response, next: NextFunction) => {
    const id: number = req.body.id;
    const estado: number = req.body.estado;
    const usuario: string = req.body.usuario;

    return await repository.action(3, id, estado, usuario, req, res)
}

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    return await repository.getAll(req, res)
}

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
    const id: number = req.body.id;

    return await repository.getOne(id, req, res)
}

export const getLabel = async (req: Request, res: Response, next: NextFunction) => {
    return await repository.getLabel(req, res)
}