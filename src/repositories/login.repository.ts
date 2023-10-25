import { Request, Response } from "express";
import oracleDB from "oracledb";
import getConnection from "../app-setting/appsettings";

export const login = async (username: string, password: string, res: Response) => {
    let connection: oracleDB.Connection | undefined;

    try {
        connection = await getConnection();

        if (!connection) {
            return res.status(400).json({
                value: 0,
                message: 'No se ha podido conectar con la fuente de datos',
                response: 1001
            })
        }

        const result = await connection.execute('SELECT 1 FROM DUAL');

        return res.status(400).json({
            value: result,
            message: 'Codigo SQL ejecutado con exito',
            response: 1
        })
    } catch (error) {
        if (error instanceof Error) {
            console.log({
                value: error.message,
                message: 'Proceso no realizado' + " " + error.name + " " + error.stack,
                response: 0
            });
        }
    }
}