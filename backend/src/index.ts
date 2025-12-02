import 'dotenv/config';
import { createServer } from 'http';
import app from './app';
import { driver } from './services/neo4j';

const port = Number(process.env.PORT || 4000);
const server = createServer(app);

server.listen(port, () => {
  console.log(`Helios API running on http://localhost:${port}`);
});

process.on('SIGINT', async () => {
  await driver.close();
  server.close(() => process.exit(0));
});
process.on('SIGTERM', async () => {
  await driver.close();
  server.close(() => process.exit(0));
});
