import express from "express";
import { PORT , mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js"
import cors from "cors";

const app = express();

app.use(express.json());


//Middleware for handling cors policy
//Method 1 which allows everything
app.use(cors());

//Method 2:Custom origin

// app.use(cors({
//     origin:'http://localhost:3000',
//     methods:['GET','POST','PUT','DELETE'],
//     allowedHeaders:['Content-Type']
// }))

 app.get("/",(request,response)=>{
    console.log(request);
    return response.status(234).send("Welcome to book store");

 })

 app.use('/books',booksRoute);




mongoose.connect(mongoDBURL)
.then(()=>{
    console.log("App is Connected to Database")
    app.listen(PORT,()=>{
        console.log(`App is listening to :${PORT}`)
    })

}).catch((error)=>{
    console.log(error);
});