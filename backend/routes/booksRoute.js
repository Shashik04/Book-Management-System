import express from "express";
import {Book} from "../models/bookModel.js"

const router=express.Router();



//Route To Add books
router.post("/", async (request,response)=>{
    try{
        if(
            !request.body.title||
            !request.body.author ||
            !request.body.publishYear 
        ){
            return response.status(400).send("Please fill all the fields");
        }
        const newBook={
            title:request.body.title,
            author: request.body.author,
            publishYear:request.body.publishYear
        }

        const book = await Book.create(newBook);
        return response.status(201).send(book)

    }catch(error){
        console.log(error);
        return response.status(500).send({message:error.message})

    }
 })


 //Route to get all books from database
 router.get("/",async(request,reponse)=>{
    try{
        const books =await Book.find({})
        return reponse.status(200).json({
            count:books.length,
            data:books
        })
    }catch(error){
        console.log(error);
        return response.status(500).send({message:error.message})
    }
 })
//Route to get single book by id 
 router.get("/:id",async(request,reponse)=>{
    try{

        const{id}=request.params;
        const book =await Book.findById(id)
        return reponse.status(200).json({book})
    }catch(error){
        console.log(error);
        return response.status(500).send({message:error.message})
    }
 })
// Route to update book by id
 router.put("/:id",async(request,response)=>{
    try{
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ){
            return response.status(400).send({
                message:"Please provide all fields"
            })
        }

        const {id}=request.params;
        const result = await Book.findByIdAndUpdate(id,request.body)
        if(!result){
            return response.status(404).json({message:"Book not found"})
        }
        return response.status(200).send({message:"Book Updated Successfully"})
    }catch(error){
        console.log(error).status(500).send({message:error.message})
    }
 })


 //Route to delete a book by id
 router.delete("/:id",async(request,response)=>{
    try{
        const {id}=request.params
        const result = await Book.findByIdAndDelete(id)
        if(!result){
            return response.status(404).json({message:"Book not found"})
        }
        return response.status(200).send({message:"Book deleted successfully"})
    }catch(error){
        console.log(error.message)
        return response.status(500).send({message:error.message})
    }
 })

 export default router;