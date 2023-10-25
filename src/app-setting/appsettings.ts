import oracleDB from "oracledb";

const ConnectionConfig: oracleDB.ConnectionAttributes = {
    user: 'capa_epq',
    password: 'secreto2023',
    connectionString: 'rdsoracle.isbelasoft.com:1521/xe',
    externalAuth: false
}

async function getConnection() {
    try {
        const connection = await oracleDB.getConnection(ConnectionConfig);
        return connection;
    } catch (error) {
        if (error instanceof Error) {
            console.log({
                value: error.message,
                message: 'No se ha podido conectar con la fuente de datos' + " " + error.name + " " + error.stack,
                response: 1001
            });
        } else {
            console.log('ERROR DESCONOCIDO: ', error);
        }
    }
}

export = getConnection;