import jwt, { Secret } from 'jsonwebtoken'

const PRIVATE_KEY: Secret | string = "$2a$10$pyeJIvj2jWuSGW@PROYECT2@2023+ORACLE_CAPACITACIONES_EPQ";
const CADUCIDAD_TOKEN: string = "23h";

const GenerarJsonWebToken = (data: any): string => {
    let token = jwt.sign(
        {
            data: data
        },
        PRIVATE_KEY,
        { expiresIn: CADUCIDAD_TOKEN }
    );

    return token;
}

export default GenerarJsonWebToken;