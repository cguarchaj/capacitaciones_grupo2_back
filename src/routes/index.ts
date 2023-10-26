import express from 'express';
import LoginRoutes from './login.routes';

function routerApi(app: express.Application): void {
    const router = express.Router();

    // ROUTING
    app.use('/api', router);

    // ADMIN
    router.use('/auth', LoginRoutes);
}

export default routerApi;