import app from './app';
// eslint-disable-next-line import/no-unresolved, import/extensions, import/no-useless-path-segments
import './database';

const port = process.env.APP_PORT;

app.listen(port);

console.log(`Acesso na porta http://localhost:${port}`);
