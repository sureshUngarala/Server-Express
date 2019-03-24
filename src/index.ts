import * as dotenv from 'dotenv';
import * as express from 'express';

console.log('----------------------------');

const app = express();
dotenv.config();

console.log(process.env.PORT);

app.get('/', (req: express.Request, res: express.Response) => {
    res.send('Hey! I am Server.');
});

app.listen(process.env.PORT, () => {
    console.log(`listening on ${process.env.PORT}`);
});