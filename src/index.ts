import { app } from './app';
import { runDb } from './repositories';

const PORT = process.env.PORT || 3000;

const startApp = async () => {
  await runDb();
  app.listen(PORT, () => console.log(`App is running on ${PORT} port...`));
};

startApp();
