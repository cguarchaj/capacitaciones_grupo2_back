import express, { Request, Response } from 'express';
import ip from 'ip';

const app = express();
const PORT = 44377;

app.get('/', (req: Request, res: Response) => {
    res.send('Hola!');
});

app.get('/api/ip', (req: Request, res: Response) => {
    const clientIP: string = req.connection.remoteAddress!;
    res.send(`Direccion IP del cliente: ${clientIP}`);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://${ip.address()}:${PORT}`);
});