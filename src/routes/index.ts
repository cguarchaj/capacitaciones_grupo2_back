import express from 'express';
import LoginRoutes from './login.routes';
import RolRoutes from './rol.routes'

function routerApi(app: express.Application): void {
    const router = express.Router();

    // ROUTING
    app.use('/api', router);

    // ADMIN
    router.use('/auth', LoginRoutes);
    router.use('/rol', RolRoutes);
}

export default routerApi;