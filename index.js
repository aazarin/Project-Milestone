
const express = require('express');
const app = express();
const nodemailer = require('nodemailer');
const path = require('path');

const PORT = process.env.PORT || 5000;

//Middleware
app.use(express.static(__dirname + 'public'));
app.use(express.json())
app.use("/img", express.static(path.join(__dirname,"images")))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})


app.post('/', (req, res)=>{
    console.log(req.body)

    const transporter = nodemailer.createTransport({
        service: 'gmail' ,
        auth: {
            user: 'azarinaryan@gmail.com',
            pass: 'Tyson022!'
        }
    })

    const mailOptions = {
        from: req.body.email,
        to: 'azarinaryan@gmail.com',
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (error, info) =>{
        if(error){
            console.log(error);
            res.send('error');
        }else{
            console.log('Email sent: ' + info.response);
            res.send('success')
        }
    })
})
app.listen(PORT, () => {
    console.log('Server running on port ${PORT}')
})