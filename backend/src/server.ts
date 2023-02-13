import express from 'express';
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import userRouter from './routes/korisnik.routes';
import firmaRouter from './routes/firma.routes';
import planinarRouter from './routes/planinari.routes';
import adminRouter from './routes/admin.routes';

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/planinski_odmor');
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('db connection ok');
})

const router = express.Router();
router.use('/home', userRouter);
router.use('/firma', firmaRouter);
router.use('/planinari', planinarRouter);
router.use('/admin', adminRouter);

app.use('/', router);//prvi svi dodju na bilo koju rutu pa se onda navode po rutama za odredjenje logicke skupove
app.listen(4000, () => console.log(`Express server running on port 4000`));
