const path=require("path")
const fs=require("fs")
const rootDirectory=require("../utils/pathutils");
module.exports=class Favourite{


    static AddToFavourites(homeID,callback){
       
       Favourite.getFavourites((favourites)=>{
        if(favourites.includes(homeID)){
            callback("already in fav list");
            console.log("already in fav list", homeID);
            
        }else {
            console.log("your home id is:", homeID);
            favourites.push(homeID);
           
            
            const Favfilename=path.join(rootDirectory,"Data","fav.json")
            fs.writeFile(Favfilename,JSON.stringify(favourites),(callback))
            
        } }) }

    static getFavourites(callback){
        const Favfilename=path.join(rootDirectory,"Data","fav.json");
        fs.readFile(Favfilename,(err,data)=>{
            console.log("file read",err,data);
            if(!err){
                callback(JSON.parse(data))
            }else{
            callback([]);
            }
        })
    }
    static deletefavbyid(delfavhomeID,callback){
        Favourite.getFavourites(favdelhomefound=>{
            const Favdelhomefound= favdelhomefound.filter(homeID=> delfavhomeID!==homeID);
            
            const Favfilename=path.join(rootDirectory,"Data","fav.json")
            fs.writeFile(Favfilename,JSON.stringify(Favdelhomefound),(callback))
        });
    }
    

}