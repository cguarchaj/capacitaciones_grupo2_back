import express, { Request, Response, NextFunction } from 'express';
import ip from 'ip';
import Singleton from './singleton';
import ProductFactory from './factory';
import { ConcreteComponent, ConcreteDecoratorA } from './decorator';
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware';
import cors from 'cors';
import Estudiantes from '../src/routes/estudiante.routes';
import { LogErrors, errorHandler, boomHandler } from './middlewares/error.handler';
import routerApi from './routes';

const app = express();
const PORT = 44377;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const whiteList = [
    'http://localhost:3000',
    'midominio.com.gt'
]

const corsOPtions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        if (whiteList.includes(origin || '') || !origin) {
            callback(null, true);
        } else {
           callback(new Error('ACCESO DENEGADO! Origen no autorizado.')) 
        }
    }
}

app.use(cors(corsOPtions));
app.use('/api/v1/estudiantes', Estudiantes);
routerApi(app);

app.use(LogErrors);
app.use(errorHandler);
app.use(boomHandler);

app.post('/data-urlencoded', (req: Request, res: Response) => {
    res.json({
        message: "Datos Recibidos",
        data: req.body
    })
});

app.post('/data-json', (req: Request, res: Response) => {
    res.json({
        message: "Datos recibidos",
        data: req.body
    })
})

app.get('/api/data', (req: Request, res: Response, next: NextFunction) => {
    try {
        if (Math.random() > 0.5) {
            throw new Error('Error al obtener los datos');
        }
        
        res.json({
            data: 'Aqui estan tus datos'
        });
    } catch (error) {
        next(error);
    }
})
app.use(errorHandlerMiddleware);

app.get('/', (req: Request, res: Response) => {
    res.send('Hola!');
});

app.get('/api/ip', (req: Request, res: Response) => {
    const clientIP: string = req.connection.remoteAddress!;
    res.send(`Direccion IP del cliente: ${clientIP}`);
});

app.get('/api/v1/singleton', (req: Request, res: Response) => {
    const instance = Singleton.getInstance();
    res.send(`Instance ID: ${instance.id}`);
});

app.get('/api/v1/factory/:type', (req: Request, res: Response) => {
    
    try {
        const factory = new ProductFactory();
        const product = factory.createProduct(req.params.type);
        res.send(product.getDescripcion());        
    } catch (error) {
        res.status(400).send('Producto enviado no es soportado.');
    }
});

app.get('/api/v1/decorator', (req: Request, res: Response) => {
    const component = new ConcreteComponent();
    const decorator = new ConcreteDecoratorA(component);
    res.send(decorator.operation());
});

app.listen(PORT, () => {
    console.log(`Server is running on http://${ip.address()}:${PORT}`);
});