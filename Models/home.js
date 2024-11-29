const path=require("path")
const fs=require("fs")
const rootDirectory=require("../utils/pathutils");
const Favourite = require("./favourite");
// let registeredHomes=[];
module.exports=class Home{
    constructor(Name,Price,Rating,Photourl,Location){
        this.Name=Name;
        this.Price=Price;
        this.Rating=Rating;
        this.Photourl=Photourl;
        this.Location=Location
    }
    save(){
         
        Home.fetchall((registeredHomes)=>{
            if(this.ID){//for edit home
                registeredHomes=registeredHomes.map(home=>
                    home.ID === this.ID? this:home)
            }
            else{//addhome
                this.ID=Math.random().toString();
                registeredHomes.push(this)

            }
           
        const pathfilename=path.join(rootDirectory,"Data","data.json")
        fs.writeFile(pathfilename,JSON.stringify(registeredHomes),(err)=>{
            if(err){
                console.log(err);
                
            }else{
                console.log("data submiited succesffully");
                
            }
        })
        })
        
    }
    static fetchall(callback){
        const pathfilename=path.join(rootDirectory,"Data","data.json");
        fs.readFile(pathfilename,(err,data)=>{
           
            if(!err){
                callback(JSON.parse(data))
            }else{
             return callback([]);
            }
        })}
       
    
    
    static findbyid(homeID,callback){
        this.fetchall(homes=>{
            const homefound= homes.find(home=> home.ID===homeID);
            callback(homefound);
        });
    }
    static deletebyid(homeID,callback){
        this.fetchall(homes=>{
            const homefound= homes.filter(home=> home.ID!==homeID);
            const pathfilename=path.join(rootDirectory,"Data","data.json");
            fs.writeFile(pathfilename,JSON.stringify(homefound),err=>{
                Favourite.deletefavbyid(homeID,callback);
            })
        });
    }
   
    

    // static findbyid(homeID, callback) {
    //     this.fetchall((homes) => {
    //         if (!homes || homes.length === 0) {
    //             console.error("No homes found.");
    //             return callback(null); // Explicitly return null if no data is available
    //         }
    
    //         const homefound = homes.find(home => String(home.ID) === String(homeID));
            
    //         if (!homefound) {
    //             console.warn(`Home with ID ${homeID} not found.`);
    //         }
    
    //         callback(homefound);
    //     });
    // }
    
    
    

}