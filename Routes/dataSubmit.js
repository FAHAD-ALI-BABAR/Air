const path=require("path")
const express=require("express")
const dataSubmit=express.Router();
const rootDirectory=require("../utils/pathutils")
const submit=require("../Controllers/host")
dataSubmit.post("/host/submit",submit.submit)
dataSubmit.get("/host/host-home-list",submit.getHostHomes)
dataSubmit.get("/host/edit-homes/:homeID",submit.getEditHome);
dataSubmit.post("/host/edit-homes",submit.postEditHome)
dataSubmit.post("/host/delete-homes/:homeID",submit.postDeleteHome)



 exports.dataSubmit=dataSubmit
 exports.registeredHomes=submit.registeredHomes
