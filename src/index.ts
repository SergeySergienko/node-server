import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello NodeJS!');
});

app.get('/users', (req: Request, res: Response) => {
  res.send('<h1>Users Page</h1>');
});

app.listen(PORT, () => console.log(`App is running on ${PORT} port...`));
