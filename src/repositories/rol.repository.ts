import { Response, Request } from "express";
import oracleDB from "oracledb";
import getConnection from "../app-setting/appsettings";
import authenticate from "../middlewares/authenticate";
import { mapRowsToObjects } from "../mappers/map.rows.objects.mappers";

const _storedProcedure = "BELA.crudRol";

export const create = async (opcion: number, nombre: string, usuario: string, req: Request, res: Response) => {
    const isAuthenticate = authenticate(req, res, () => {});

    if (!isAuthenticate) {
        return res.status(401).json({
            value: 0,
            message: 'No se ha proporcionado token o ya vencio.',
            response: 0
        })
    }

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

        const result = await connection.execute<any>(
            `BEGIN ${_storedProcedure}(:id, :nombre, :codigo, :estado, :usuario, :opcion, :resultado); END;`,
            {
                id: { dir: oracleDB.BIND_IN, val: null, type: oracleDB.NUMBER },
                nombre: { dir: oracleDB.BIND_IN, val: nombre, type: oracleDB.STRING },
                codigo: { dir: oracleDB.BIND_IN, val: null, type: oracleDB.STRING },
                estado: { dir: oracleDB.BIND_IN, val: 1, type: oracleDB.NUMBER },
                usuario: { dir: oracleDB.BIND_IN, val: usuario, type: oracleDB.STRING },
                opcion: { dir: oracleDB.BIND_IN, val: opcion, type: oracleDB.NUMBER },
                resultado: { dir: oracleDB.BIND_OUT, type: oracleDB.CURSOR }
            },
            { outFormat: oracleDB.OUT_FORMAT_OBJECT }
        );

        const resultSet: oracleDB.ResultSet<any> = result.outBinds.resultado;
        let row;
        let rows = [];

        while ((row = await resultSet.getRow())) {
            rows.push(row);
        }

        await resultSet.close();
        console.log("rows", rows);

        if (rows.length <= 0) {
            return res.status(400).json({
                value: 0,
                message: 'No se pudo ejecutar la accion en la fuenta de datos.',
                response: 1001
            });
        }

        return res.status(201).json({
            value: rows,
            message: 'Registro creado con exito.',
            response: 1
        });
    } catch (error) {
        
    }
}

export const update = async (opcion: number, id: number, nombre: string, usuario: string, req: Request, res: Response) => {
    const isAuthenticate = authenticate(req, res, () => {});

    if (!isAuthenticate) {
        return res.status(401).json({
            value: 0,
            message: 'No se ha proporcionado token o ya vencio.',
            response: 0
        })
    }

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

        const result = await connection.execute<any>(
            `BEGIN ${_storedProcedure}(:id, :nombre, :codigo, :estado, :usuario, :opcion, :resultado); END;`,
            {
                id: { dir: oracleDB.BIND_IN, val: id, type: oracleDB.NUMBER },
                nombre: { dir: oracleDB.BIND_IN, val: nombre, type: oracleDB.STRING },
                codigo: { dir: oracleDB.BIND_IN, val: null, type: oracleDB.STRING },
                estado: { dir: oracleDB.BIND_IN, val: 1, type: oracleDB.NUMBER },
                usuario: { dir: oracleDB.BIND_IN, val: usuario, type: oracleDB.STRING },
                opcion: { dir: oracleDB.BIND_IN, val: opcion, type: oracleDB.NUMBER },
                resultado: { dir: oracleDB.BIND_OUT, type: oracleDB.CURSOR }
            },
            { outFormat: oracleDB.OUT_FORMAT_OBJECT }
        );

        const resultSet: oracleDB.ResultSet<any> = result.outBinds.resultado;
        let row;
        let rows = [];

        while ((row = await resultSet.getRow())) {
            rows.push(row);
        }

        await resultSet.close();
        console.log("rows", rows);

        if (rows.length <= 0) {
            return res.status(400).json({
                value: 0,
                message: 'No se pudo ejecutar la accion en la fuenta de datos.',
                response: 1001
            });
        }

        return res.status(200).json({
            value: rows,
            message: 'Registro actualizado con exito.',
            response: 1
        });
    } catch (error) {
        
    }
}

export const action = async (opcion: number, id: number, estado: number, usuario: string, req: Request, res: Response) => {
    const isAuthenticate = authenticate(req, res, () => {});

    if (!isAuthenticate) {
        return res.status(401).json({
            value: 0,
            message: 'No se ha proporcionado token o ya vencio.',
            response: 0
        })
    }

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

        const result = await connection.execute<any>(
            `BEGIN ${_storedProcedure}(:id, :nombre, :codigo, :estado, :usuario, :opcion, :resultado); END;`,
            {
                id: { dir: oracleDB.BIND_IN, val: id, type: oracleDB.NUMBER },
                nombre: { dir: oracleDB.BIND_IN, val: null, type: oracleDB.STRING },
                codigo: { dir: oracleDB.BIND_IN, val: null, type: oracleDB.STRING },
                estado: { dir: oracleDB.BIND_IN, val: estado, type: oracleDB.NUMBER },
                usuario: { dir: oracleDB.BIND_IN, val: usuario, type: oracleDB.STRING },
                opcion: { dir: oracleDB.BIND_IN, val: opcion, type: oracleDB.NUMBER },
                resultado: { dir: oracleDB.BIND_OUT, type: oracleDB.CURSOR }
            },
            { outFormat: oracleDB.OUT_FORMAT_OBJECT }
        );

        const resultSet: oracleDB.ResultSet<any> = result.outBinds.resultado;
        let row;
        let rows = [];

        while ((row = await resultSet.getRow())) {
            rows.push(row);
        }

        await resultSet.close();
        console.log("rows", rows);

        if (rows.length <= 0) {
            return res.status(400).json({
                value: 0,
                message: 'No se pudo ejecutar la accion en la fuenta de datos.',
                response: 1001
            });
        }

        return res.status(200).json({
            value: rows,
            message: 'Proceso realizado con exito.',
            response: 1
        });
    } catch (error) {
        
    }
}

export const getAll = async (req: Request, res: Response) => {
    const isAuthenticate = authenticate(req, res, () => {});

    if (!isAuthenticate) {
        return res.status(401).json({
            value: 0,
            message: 'No se ha proporcionado token o ya vencio.',
            response: 0
        })
    }

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

        const result = await connection.execute<any>(
            `BEGIN ${_storedProcedure}(:id, :nombre, :codigo, :estado, :usuario, :opcion, :resultado); END;`,
            {
                id: { dir: oracleDB.BIND_IN, val: null, type: oracleDB.NUMBER },
                nombre: { dir: oracleDB.BIND_IN, val: null, type: oracleDB.STRING },
                codigo: { dir: oracleDB.BIND_IN, val: null, type: oracleDB.STRING },
                estado: { dir: oracleDB.BIND_IN, val: null, type: oracleDB.NUMBER },
                usuario: { dir: oracleDB.BIND_IN, val: null, type: oracleDB.STRING },
                opcion: { dir: oracleDB.BIND_IN, val: 4, type: oracleDB.NUMBER },
                resultado: { dir: oracleDB.BIND_OUT, type: oracleDB.CURSOR }
            },
            { outFormat: oracleDB.OUT_FORMAT_OBJECT }
        );

        const resultSet: oracleDB.ResultSet<any> = result.outBinds.resultado;
        let row;
        let rows = [];

        while ((row = await resultSet.getRow())) {
            rows.push(row);
        }

        await resultSet.close();
        console.log("rows", rows);

        if (rows.length <= 0) {
            return res.status(400).json({
                value: 0,
                message: 'No se pudo ejecutar la accion en la fuenta de datos.',
                response: 1001
            });
        }

        return res.status(200).json({
            value: rows,
            message: 'Proceso realizado con exito.',
            response: 1
        });
    } catch (error) {
        
    }
}

export const getOne = async (id: number, req: Request, res: Response) => {
    const isAuthenticate = authenticate(req, res, () => {});

    if (!isAuthenticate) {
        return res.status(401).json({
            value: 0,
            message: 'No se ha proporcionado token o ya vencio.',
            response: 0
        })
    }

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

        const result = await connection.execute<any>(
            `BEGIN ${_storedProcedure}(:id, :nombre, :codigo, :estado, :usuario, :opcion, :resultado); END;`,
            {
                id: { dir: oracleDB.BIND_IN, val: id, type: oracleDB.NUMBER },
                nombre: { dir: oracleDB.BIND_IN, val: null, type: oracleDB.STRING },
                codigo: { dir: oracleDB.BIND_IN, val: null, type: oracleDB.STRING },
                estado: { dir: oracleDB.BIND_IN, val: null, type: oracleDB.NUMBER },
                usuario: { dir: oracleDB.BIND_IN, val: null, type: oracleDB.STRING },
                opcion: { dir: oracleDB.BIND_IN, val: 5, type: oracleDB.NUMBER },
                resultado: { dir: oracleDB.BIND_OUT, type: oracleDB.CURSOR }
            },
            { outFormat: oracleDB.OUT_FORMAT_OBJECT }
        );

        const resultSet: oracleDB.ResultSet<any> = result.outBinds.resultado;
        let row;
        let rows = [];

        while ((row = await resultSet.getRow())) {
            rows.push(row);
        }

        await resultSet.close();
        console.log("rows", rows);

        if (rows.length <= 0) {
            return res.status(400).json({
                value: 0,
                message: 'No se pudo ejecutar la accion en la fuenta de datos.',
                response: 1001
            });
        }

        return res.status(200).json({
            value: rows,
            message: 'Proceso realizado con exito.',
            response: 1
        });
    } catch (error) {
        
    }
}

export const getLabel = async (req: Request, res: Response) => {
    const isAuthenticate = authenticate(req, res, () => {});

    if (!isAuthenticate) {
        return res.status(401).json({
            value: 0,
            message: 'No se ha proporcionado token o ya vencio.',
            response: 0
        })
    }

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
        //     `BEGIN ${_storedProcedure}(:id, :nombre, :codigo, :estado, :usuario, :opcion, :resultado); END;`,
        //     {
        //         id: { dir: oracleDB.BIND_IN, val: null, type: oracleDB.NUMBER },
        //         nombre: { dir: oracleDB.BIND_IN, val: null, type: oracleDB.STRING },
        //         codigo: { dir: oracleDB.BIND_IN, val: null, type: oracleDB.STRING },
        //         estado: { dir: oracleDB.BIND_IN, val: null, type: oracleDB.NUMBER },
        //         usuario: { dir: oracleDB.BIND_IN, val: null, type: oracleDB.STRING },
        //         opcion: { dir: oracleDB.BIND_IN, val: 6, type: oracleDB.NUMBER },
        //         resultado: { dir: oracleDB.BIND_OUT, type: oracleDB.CURSOR }
        //     },
        //     { outFormat: oracleDB.OUT_FORMAT_OBJECT }
        // );

        // const resultSet: oracleDB.ResultSet<any> = result.outBinds.resultado;
        // let row;
        // let rows = [];

        // while ((row = await resultSet.getRow())) {
        //     rows.push(row);
        // }

        // await resultSet.close();
        // console.log("rows", rows);

        // if (rows.length <= 0) {
        //     return res.status(400).json({
        //         value: 0,
        //         message: 'No se pudo ejecutar la accion en la fuenta de datos.',
        //         response: 1001
        //     });
        // }

        // return res.status(200).json({
        //     value: rows,
        //     message: 'Proceso realizado con exito.',
        //     response: 1
        // });

        const result = await connection.execute<any>(
            `BEGIN ${_storedProcedure}(:id, :nombre, :codigo, :estado, :usuario, :opcion, :resultado); END;`,
            {
                id: { dir: oracleDB.BIND_IN, val: null, type: oracleDB.NUMBER },
                nombre: { dir: oracleDB.BIND_IN, val: null, type: oracleDB.STRING },
                codigo: { dir: oracleDB.BIND_IN, val: null, type: oracleDB.STRING },
                estado: { dir: oracleDB.BIND_IN, val: null, type: oracleDB.NUMBER },
                usuario: { dir: oracleDB.BIND_IN, val: null, type: oracleDB.STRING },
                opcion: { dir: oracleDB.BIND_IN, val: 6, type: oracleDB.NUMBER },
                resultado: { dir: oracleDB.BIND_OUT, type: oracleDB.CURSOR }
            },
        );

        const resultSet: oracleDB.ResultSet<any> = result.outBinds.resultado;
        let row;
        let rows = [];

        while ((row = await resultSet.getRow())) {
            rows.push(row);
        }

        await resultSet.close();

        if (rows.length <= 0) {
            return res.status(400).json({
                value: 0,
                message: 'No existe tal usuario en la fuente de datos.',
                response: 0
            })
        }

        const mappedRows = mapRowsToObjects(rows, ["value", "label"]);

        console.log("Mapped Rows", mappedRows);

        
        return res.status(200).json({
            value: mappedRows,
            message: 'Proceso realizado con exito.',
            response: 1
        });
    } catch (error) {
        
    }
}