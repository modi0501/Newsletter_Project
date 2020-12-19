const express= require("express")
const bodyParser= require("body-parser")
const https= require("https")

const app= express();
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:true}))

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/subscribe.html');
})

app.post('/',(req,res)=>{
    // res.send("Successfull")
    let firstName=req.body.fname;
    let lastName=req.body.lname;
    let email=req.body.email;
    let data={
        members:[
            {
                email_address: email,
                status : "subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName
                },
                // update_existing:true
            },

        ],
        update_existing:true
    }
    const jsonData= JSON.stringify(data);
    const url="https://us7.api.mailchimp.com/3.0/lists/9658c16512";
    const options={
        method: "POST",
        auth:"modi0501:34fb365f970f7ed84333e882757a1b74-us7"
    }
    const request=https.request(url,options,(response)=>{
        response.on("data",(data)=>{
            console.log(JSON.parse(data));
        })
    })
    request.write(jsonData)
    request.end()
    // console.log(firstName,lastName,email);
    // console.log("Successful");
})


app.listen(process.env.PORT || 3000,()=>{
    console.log("Server is up and running!");
})



// 34fb365f970f7ed84333e882757a1b74-us7
// 9658c16512