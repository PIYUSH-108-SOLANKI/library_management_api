const express =require('express')
const IssueBook =require('./models/Issueebook');
const Book = require('./models/Book');

issueBook = async (request,response)=>{
    try{
        const {bookId,bookName,studentName,issueDate,returnData}=request.body;
        const book =await Book.findById(BookId);
        if(!book){
            return response.status(404).json({messege:"book Not found"})

        }
        const student =await User.findById(studentId);
        if(!student)
        {
            return response.status(404).json({message:"student not found"});

        }
        if(book.quantity<1){
            return response.status(400).json({message:"book is not available "})
        }
        const  newIssueBook={
            bookId,
            bookName,
            studentId,
            studentName,
            issueDate,
            returnDate,
            status:"issued"
        }
        const IssueBook =new IssueBook (newIssueBook);
        await issueBook.save();

        book.quantity=book.quantity-1;
        await book.save()
    }catch (error){

    }
};
returnBook =async (request,response)=>{
    try{
        const issuBook=await IssueBook.findById(request.params.id);
        if(!issueBook){
            return response.status(404).json({message:"issue book not found "})
        }
        if(issuBook.status=="Returned"){
            return response.status(404).json({message:"Book is alreadu returned"})
        }
        issuBook.status="Returned";
        await issuBook.save();
        const book =await Book.findById(issueBook.bookId)
        book.quantity=book.quantity+1
        await book.save()

    }
    catch(error){
        return response.status(500).json({message:error.message})
    }
}
module.exports={issueBook,returnBook}