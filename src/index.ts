import express, { Request, Response } from 'express';

const app = express();
const PORT = 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello NodeJS!');
});

app.listen(PORT, () => console.log(`App is running on ${PORT} port...`));
