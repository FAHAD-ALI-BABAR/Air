const path=require("path")
const rootDirectory=require("../utils/pathutils")
const Home=require("../Models/home");
const { log } = require("console");
exports.registrationRouter=(req,res,next)=>{
    
    // res.sendFile(path.join(__dirname,"../","views","Register.html"))
    // res.sendFile(path.join(rootDirectory,"views","host","Register.html"));
    res.render("host/edit-homes",{
        pageTitle:"Add home to airbnb",
        editing:false
    })

};


exports.getEditHome=(req,res,next)=>{
    
    // res.sendFile(path.join(__dirname,"../","views","Register.html"))
    // res.sendFile(path.join(rootDirectory,"views","host","Register.html"));
    const homeID=req.params.homeID;
    const editing=req.query.editing ==="true";
    console.log(homeID,editing);
    Home.findbyid(homeID,(home)=>{
        if(!home){
            console.log("Home doesnot exist for editing");
            return res.redirect("/host/host-home-list")
            
        }
          console.log(homeID,editing,home);
          
            res.render("host/edit-homes",{
                home:home,
                pageTitle:"Edit your Home",
                editing:editing
            })

        
    })
    
   

};




const registeredHomes=[];
exports.submit=(req,res,next)=>{
    
    const home=new Home(req.body.Name,req.body.Price,req.body.Rating,req.body.Photourl,req.body.Location)
    home.save();
    // res.sendFile(path.join(__dirname,"../","views","submit.html"))
    // res.sendFile(path.join(rootDirectory,"views","host","submit.html"))
    res.redirect("/host/host-home-list");
 }
 exports.postEditHome=(req,res,next)=>{
    
    const home=new Home(req.body.Name,req.body.Price,req.body.Rating,req.body.Photourl,req.body.Location)
    home.ID=req.body.ID;
    home.save();
    // res.sendFile(path.join(__dirname,"../","views","submit.html"))
    // res.sendFile(path.join(rootDirectory,"views","host","submit.html"))
    res.redirect("/host/host-home-list");
 }

 exports.postDeleteHome=(req,res,next)=>{
    
    const homeid=req.params.homeID;
    console.log("id is: ",homeid);
    Home.deletebyid(homeid,(err)=>{
        if(err){
            console.log("error while deleting",err);
            
        }
        res.redirect("/host/host-home-list");
    })
    
    // res.sendFile(path.join(__dirname,"../","views","submit.html"))
    // res.sendFile(path.join(rootDirectory,"views","host","submit.html"))
    
 }
 
 


 

 exports.registeredHomes=registeredHomes

 exports.error404=(req,res,next)=>{
    // res.status(404).sendFile(path.join(__dirname,"views","404.html"));
    // res.status(404).sendFile(path.join(rootDirectory,"views","404.html"));
       res.status(404).render("404",{
        pagetitle:"Page not found"
       })
    
}
exports.getHostHomes=(req,res,next)=>{
    Home.fetchall((registeredHomes)=>{
        res.render("host/host-home-list",{
            registeredHomes:registeredHomes
        })
    })
 };