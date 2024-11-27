const path=require("path")
const fs=require("fs")
const rootDirectory=require("../utils/pathutils");
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
         this.ID=Math.random().toString();
        Home.fetchall((registeredHomes)=>{
            registeredHomes.push(this)
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
            console.log("file read",err,data);
            if(!err){
                callback(JSON.parse(data))
            }else{
            callback([]);
            }
        })
    }
    static findbyid(homeID,callback){
        this.fetchall(homes=>{
            const homefound= homes.find(home=> home.ID===homeID);
            callback(homefound);
        });
    }

}