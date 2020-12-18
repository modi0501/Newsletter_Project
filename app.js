const express= require("express")


const app= express();

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/subscribe.html');
})


app.listen(process.env.PORT || 3000,()=>{
    console.log("Server is up and running!");
})