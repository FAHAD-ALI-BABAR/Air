const path=require("path")
const rootDirectory=require("../utils/pathutils")
const Home=require("../Models/home");
const { registeredHomes } = require("./host");
const Favourite = require("../Models/favourite");
const { error404 } = require("../../MVC-pratice/Controllers/host");


 exports.getHomes=(req,res,next)=>{
    Home.fetchall((registeredHomes)=>{
        res.render("store/home-list",{
            registeredHomes:registeredHomes
        })
    })
 };


 exports.getindex=(req,res,next)=>{
    Home.fetchall((registeredHomes)=>{
        res.render("store/home",{
            registeredHomes:registeredHomes
        })
    })
 };
 exports.getbookings=(req,res,next)=>{
    Home.fetchall((registeredHomes)=>{
        res.render("store/bookings",{
            registeredHomes:registeredHomes
        })
    })
 };
 exports.getfavourites = (req, res, next) => {
    Favourite.getFavourites(favourites => {
        Home.fetchall(registeredHomes => {
            const favouritesHomes = registeredHomes.filter(home => favourites.includes(home.ID));
            console.log(favouritesHomes); 
            res.render("store/fav-list", {
                favouritesHomes: favouritesHomes
            });
        });
    });
};
 exports.getReserves=(req,res,next)=>{
    Home.fetchall((registeredHomes)=>{
        res.render("store/reserve",{
            registeredHomes:registeredHomes
        })
    })
 };
 exports.getHomedetail=(req,res,next)=>{
    const ID=req.params.homeID;
    console.log(ID);
    Home.findbyid(ID,home=>{
        if(!home){
            console.log("homes not found of this ID:");
            
            res.redirect("/")
        }else{
            res.render("store/home-detail",{
                home:home
            
        })
        }
       })};
  
       exports.addToFavourites=(req,res,next)=>{
        console.log("Currently on fav list path",req.body);
        
        Favourite.AddToFavourites(req.body.id,(err)=>{
            if(err){
                console.log("error is shown",err);  
            }
            res.redirect("/fav-list")
        })
       
        
       }
       
       exports.postDeleteFromFav=(req,res,next)=>{
        const homeid=req.params.homeID;
        console.log("your fav list items id is:",homeid);
        Favourite.deletefavbyid(homeid,(err)=>{
            if(err){
                console.log("error while deleting favourite item :", err);
                
            }
            res.redirect("/fav-list")

        })
        
          
      
       
        
       }
     
       

 exports.error404=(req,res,next)=>{
    // res.status(404).sendFile(path.join(__dirname,"views","404.html"));
    // res.status(404).sendFile(path.join(rootDirectory,"views","404.html"));
    res.status(404).render("404",{
        pagetitle:"Page not found"
       })
    
}