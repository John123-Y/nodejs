const express = required('express');
const helmet = required('helmet');
const cors = required ('cors');
const cookieParse = required('cookie-parser');
const mongoose = required('mongoose');

const authRouter = require('./routers/auth-router');

const app = express();
app.use(cors());
app.use(helmet)
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({extended: true}));

mongoose.connect(process.env.MONGO_URI).then(() =>{
    console.log('Database connected successfully')
}).catch(err =>{
    console.log(err);
});

app.use('/api/auth',authRouter);

app.get('/', (req,res) =>{
    res.json({message:"hello from the server"});
});

app.listen(Process.env.PORT,() =>{
    console.log>('listening....')
});