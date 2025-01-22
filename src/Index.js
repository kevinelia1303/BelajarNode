require('dotenv').config()
const PORT = process.env.PORT || 5000;
const express = require("express");
const cors = require('cors');
const corsOptions = require('./config/corsOptions');


const usersRoutes = require('./routes/users');

// const UserController = require('./controller/users')
const middlewarelogRequest = require('./middleware/logs')
const upload = require('./middleware/multer');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');

const app = express();

// app.method(path, handler);



app.use(middlewarelogRequest);

app.use(credentials);

app.use(cors(corsOptions));

app.use(express.json());

// app.use('/LoginMakanGratis', require('./routes/auth_makangratis'));
app.use('/sekolah', require('./routes/sekolah'));

app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));

app.use(verifyJWT);
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