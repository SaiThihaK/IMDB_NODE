import express from "express"
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import http from 'http'
import  mongoose from 'mongoose'


const mongo_url = `mongodb+srv://dotdev:sai2002dec24@cluster0.qum8y.mongodb.net/?retryWrites=true&w=majority`;
const app = express();
app.use(cors({
  credentials:true
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());


const server = http.createServer(app);


server.listen(8000,()=>{
  console.log("Server is running on http://localhost:8000")
})

mongoose.Promise = Promise;
mongoose.connect(mongo_url).then(()=>console.log("db connected"));
mongoose.connection.on('error',(error:Error)=>console.log(error))



