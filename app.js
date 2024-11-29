//core modules
const path=require("path")
const helmet = require("helmet");
const cors = require("cors");
const morgan = require("morgan");
//External modules
const express=require("express")
//local modules
const registerRouter=require("./Routes/registerRouter")
const {dataSubmit}=require("./Routes/dataSubmit")
const {registeredHomes}=require("./Routes/dataSubmit")
const rootDirectory=require("./utils/pathutils")
const controller=require("./Controllers/host")
const storeRouter = require("./Routes/storeRouter")
const { Module } = require("module")
//apppp
const app=express();
app.use(helmet());
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.set("view engine","ejs")//to set ejs template engine
app.set("views ","views")
app.use(storeRouter)
// app.get("/",(req,res,next)=>{
    
//     res.send(`<h1>Welcome to My home page</h1>
//         <a href="/register">Go to Register Page</a>
//         `)
// })
app.use(registerRouter)
// app.get("/register",(req,res,next)=>{
    
//     res.send(`<form action="/submit-detail" method="POST">
//         <input type="text" name="text" placeholder="Enter your name"/>
//         <input type="submit" value="submit"/>
//         </form>
//         `)
// })
app.use(dataSubmit)
// app.post("/submit-detail",(req,res,next)=>{
//    console.log(req.body);
   
//     res.send(`<h1>Data has been submitted successfully</h1>
//         <a href="/">Go to home page</a>
//         </form>
//         `)
// })
app.use(express.static(path.join(rootDirectory,"public")))//to access the public folder
app.use(controller.error404)
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// app.listen(3002,()=>{
//     console.log("Dynamic paths running");
    
// })
