import { Request, Response } from "express";
import oracleDB from "oracledb";
import getConnection from "../app-setting/appsettings";
import { mapRowsToObjects } from "../mappers/map.rows.objects.mappers";
import bcrypt from 'bcryptjs'
import GenerarJsonWebToken from "../helpers/generate.token";

const _storedProcedure = "BELA.login";

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

        // const result = await connection.execute<any>(
        //     `BEGIN ${_storedProcedure}(1, :username, :resultado); END;`, 
        //     {
        //         username: { dir: oracleDB.BIND_IN, val: username, type: oracleDB.STRING },
        //         resultado: { dir: oracleDB.BIND_OUT, type: oracleDB.CURSOR }
        //     }
        // );

        // const resultSet: oracleDB.ResultSet<any> = result.outBinds.resultado;
        // let row;
        // let rows = [];

        // while ((row = await resultSet.getRow())) {
        //     rows.push(row);
        // }

        // await resultSet.close();

        // if (rows.length <= 0) {
        //     return res.status(400).json({
        //         value: 0,
        //         message: 'No existe tal usuario en la fuente de datos.',
        //         response: 0
        //     })
        // }

        // const mappedRows = mapRowsToObjects(rows, ["idUsuario", "codUsuario", "username", "password", "estado", "idRol", "codRol", "roles", "idPersona", "nombreCompleto"]);

        // console.log("Mapped Rows", mappedRows);

        // const user = mappedRows[0];
        // const encryptPassword = String(user.password);

        // console.log("Encrypt password from DB", encryptPassword);
        // console.log("Password to validate", password);

        // if (!bcrypt.compareSync(password, encryptPassword)) {
        //     return res.status(400).json({
        //         value: 0,
        //         message: 'Contraseña incorrecta.',
        //         response: 0
        //     })
        // }

        // let data: any = {
        //     codigo: user.codigo,
        //     username: user.username,
        //     nombreCompleto: user.nombreCompleto,
        //     roles: user.roles,
        //     estado: user.estado,            
        // }

        // data.token = GenerarJsonWebToken(data)

        // return res.status(200).json({
        //     value: [data],
        //     message: 'Usuario autenticado con exito',
        //     response: 1
        // })

        const result = await connection.execute<any>(
            `BEGIN ${_storedProcedure}(1, :username, :resultado); END;`,
            {
                username: { dir: oracleDB.BIND_IN, val: username, type: oracleDB.STRING },
                resultado: { dir: oracleDB.BIND_OUT, type: oracleDB.CURSOR }
            },
            {outFormat: oracleDB.OUT_FORMAT_OBJECT}
        );

        const resultSet = result.outBinds.resultado;
        let row;
        let rows = [];
        
        while ((row = await resultSet.getRow())) {
            rows.push(row);
        }
        
        await resultSet.close();

        if (rows.length <= 0) {
            return res.status(400).json({
                value: 0,
                message: 'Usuario no existe.',
                response: 1001
            });
        }

        const user = rows[0];
        console.log("user", user)
        const encryptPassword = String(user.PASSWORD);

        if (!bcrypt.compareSync(password, encryptPassword)) {
            return res.status(400).json({
                value: 0,
                message: 'Contraseña incorrecta.',
                response: 0
            });
        }

        let data: any = {
            CODUSUARIO: user.CODUSUARIO,
            USERNAME: user.USERNAME,
            NOMBRECOMPLETO: user.NOMBRECOMPLETO,
            ROLES: user.ROLES,
            ESTADO: user.ESTADO
        };

        data.token = GenerarJsonWebToken(data);
        
        return res.status(200).json({
            value: [data],
            message: 'Usuario autenticado con exito.',
            response: 1
        });

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