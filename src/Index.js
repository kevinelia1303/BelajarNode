require('dotenv').config()
const PORT = process.env.PORT || 5000;
const express = require("express");

const usersRoutes = require('./routes/users');
// const UserController = require('./controller/users')
const middlewarelogRequest = require('./middleware/logs')
const upload = require('./middleware/multer');


const app = express();

// app.method(path, handler);

// app.use("/", (req,res,next) => {
//     res.send('Hello World');
// })

app.use(middlewarelogRequest);
app.use(express.json());
app.use('/assets',express.static('public/images'));

app.use('/users', usersRoutes);
app.post('/upload',upload.single('photo'), (req,res) => {
    res.json({
        message: 'Upload berhasil',
    })
})

app.use((err,req,res,next)=>{
    res.json({
        message: err.message
    })
})

// app.get("/", (req,res) => {
//     res.json({
//         nama: "Kevin",
//         email:"kevin.elia@gmail.com"
//     });
// })

// app.post("/", (req,res) => {
//     res.send('Hello POST Method');
// })

// app.get("/", UserController.getAllUsers);

// app.post("/", UserController.createNewUser);

app.use("/", (req,res) => {

})

app.listen(PORT, () => {
    console.log(`Server berhasil running di port ${PORT}`);
})