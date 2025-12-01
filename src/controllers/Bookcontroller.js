const { response, request } = require("express")
const book = require("./models/Book");

const books = []



getAllbooks =async (request , response)=>{
    try{
        const books=await book.find();
        response.status(200).json(books);
    }
    catch(error){
        response.status(500).json({message:error.message}) ;
    }
} ;


getBookById=async(request, response)=>{
    try{
        // const book=books.find((book)=>book.id===parseInt(request.params.id));
        const book=await book.findById(request.params.id);
        if (!book) {{
            return response.status(404).json({message:"Book Not Found"});

        }}
        response.status(200).json(book);
    }
    catch(error){
        response.status(500).json({message:error.message});

    }
};

createBook=(request, response)=>{
    try{
        const {title , author , publishedYear , price , quantity } = request.body;

        if (!title || !author || !publishedYear || !price || !quantity) {
            return response.status(400).json({message:"Please Provide all the Required Feilds"});

            
        }

        const newbook = {
            id:books.length+1 , 
            title ,
            author,
            publishedYear ,
            price ,
            quantity ,
            status:"Available"
        };

        books.push(newbook);
        response.status(201).json({message: "Book Created Successfully", data : newbook});
    }
    catch(error){
        response.status(500).json({message:error.message});
    }
};


updateBook=(request, response)=>{
    try{
        
        const book=books.find((book)=>book.id===parseInt(request.params.id));
        if (!book) {{
            return response.status(404).json({message:"Book Not Found"});

        }}

        const {title , author , publishedYear , price , quantity } = request.body;

        if(!title || !author || !publishedYear || !price || !quantity){
            return response.status(400).json({message:"Please Provide all  field to update"});
        }
 
        book.title=title;
        book.author=author;
        book.publishedYear=publishedYear;
        book.price=price;
        book.quantity=quantity;
        response.status(200).json({message:"Book Updated Successfully", data :book});
    }
    catch (error){
        response.status(500).json({message:error.message});
    }

} ; 

deleteBook=(request, response)=>{
    try{
        const bookIndex=books.findIndex((book)=>book.id===parseInt(request.params.id));

        if (bookIndex===-1) {{
            return response.status(404).json({message:"Book Not Found"});

        }}
        books.splice(bookIndex,1);
        response.status(200).json({message:"Book Deleted Successfully"});
    }
    catch(error){
        response.status(500).json({message:error.message});
    }

} ;

module.exports={getAllbooks , getBookById , createBook , updateBook , deleteBook} ;