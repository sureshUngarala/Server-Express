import * as dotenv from 'dotenv';
import * as express from 'express';
import cors = require('cors');
import * as data from './test-data.json';

console.log('----------------------------');

const app = express();
app.use(cors());    //using default config to avoid CORB (content origin read blocking)
dotenv.config();

//app.options('*', cors());   //mandate OPTIONS request before every API

console.log(process.env.PORT);

app.get('/', (req: express.Request, res: express.Response) => {
    res.send(data);
});

app.listen(process.env.PORT, () => {
    console.log(`listening on ${process.env.PORT}`);
});