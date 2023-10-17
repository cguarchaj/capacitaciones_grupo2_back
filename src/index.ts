import express, { Request, Response } from 'express';
import ip from 'ip';
import Singleton from './singleton';
import ProductFactory from './factory';
import { ConcreteComponent, ConcreteDecoratorA } from './decorator';

const app = express();
const PORT = 44377;

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