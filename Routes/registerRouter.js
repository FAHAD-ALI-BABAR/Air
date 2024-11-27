const path=require("path")
const express=require("express")
const registerRouter=express.Router();
const rootDirectory=require("../utils/pathutils")
const registrationRouter=require("../Controllers/host")
registerRouter.get("/host/register",registrationRouter.registrationRouter)
module.exports=registerRouter