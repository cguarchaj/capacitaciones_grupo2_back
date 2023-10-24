import express, {Request, Response} from 'express';
import { IEstudiante } from '../models/estudiante.model';

let estudiantes: IEstudiante[] = [];
let currentId: number = 1;

export const getEstudiantes = (req: Request, res: Response) => {
    if (estudiantes.length <= 0) {
        return res.status(400).send('No existen datos.');
    }
    res.json(estudiantes);
}

export const getEstudiante = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const estudiante = estudiantes.find(item => item.id === id);
    if (!estudiante) {
        //return res.status(400).send('Estudiante no encontrado.');
        return res.status(400).json({
            success: false,
            message: "Usuario no encontrado."
        });
    }
    res.json(estudiante);
}

export const createEstudiante = (req: Request, res: Response) => {
    try {
        const estudiante: IEstudiante = {
            id: currentId++,        
            ...req.body
        };
    
        estudiantes.push(estudiante);
        res.status(201).json(estudiante);
    } catch (error) {
        return res.json({
            success: false,
            message: error
        });
    }
}

export const updateEstudiante = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const index = estudiantes.findIndex(e => e.id === id);
    if (index === -1) {
        return res.status(400).send('Estudiante no encontrado');
    }

    estudiantes[index] = { id, ...req.body };
    res.json(estudiantes[index]);
}

export const deleteEstudiante = (req: Request, res: Response) => {
    const id = Number(req.params.id);
    estudiantes = estudiantes.filter(e => e.id !== id);
    res.status(204).send();
}