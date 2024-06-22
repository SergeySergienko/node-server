import { app } from './app';
import { runDb_1 } from './repositories/db_1';
import 'dotenv/config';

const PORT = process.env.PORT || 5000;

const startApp = async () => {
  await runDb_1();
  app.listen(PORT, () =>
    console.log('\x1b[36m%s\x1b[0m', `App is running on ${PORT} port...`)
  );
};

startApp();
