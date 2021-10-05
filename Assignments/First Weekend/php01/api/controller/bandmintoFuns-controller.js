const mongoose = require("mongoose");
const BadmintonFun = mongoose.model("BadmintonFun"); 

const ObjectId = require("mongodb").ObjectId;


const getAll = function(req, res){

    console.log("Json Request Received!");

    let offset = 0;
    let count = 3; //default
    const maxCount = 3;
    if(req.query && req.query.offset){
        offset=parseInt(req.query.offset, 10);
    }
    if(req.query && req.query.count)
    {
        count=parseInt(req.query.count, 10);
       
    }
    if(count > maxCount){
        res.status(400).json({"message":"Can't exceed count of "+maxCount});
        retun;
    }


    if(isNaN(offset)||isNaN(count)){
        res.status(400).json({"messagae": "QueryString offset and count should be numbers."});
        return;
    }

    BadmintonFun.find().skip(offset).limit(count).exec(function(err, funs){
        if(err)
        {
                console.log("error finding funs");
                res.status(500).json(err);
                return;
        }
        else{
            if(!funs){
                res.status(404).json({"message":"funs not found"})
            }
            else{
             console.log("Found funs");
             res.status(200).json(funs);
            }
        }
    });     
}

const getOne=function(req, res){
     
    if(!mongoose.isValidObjectId(req.params.funId)){
        
        res.status(400).json({"message":"invalid fun id is passed."});
        return;
    }

    const funId = req.params.funId;
    
    BadmintonFun.findById(funId).exec(function(err, fun){
        if(err){
            console.log("error finding student");
            res.status(500).json(err);
            return;
        }
        else{
            if(!fun){
                console.log("Fun by the ID is not found!");
                res.status(404).json(fun);
                return;
            }
            else{                           
                res.status(200).json(fun);
            }

        }        
    });  
};

const addOne= function(req, res){   
        
    if(!(req.body && req.body.country && req.body.startYear && req.body.playerName)){
    
        console.log("Data missing from Post body");
        res.status(400).json({error:"Required data missing from POST"});  
        return; 

    }
        
    const newFun = {
        country: req.body.country,
        startYear: req.body.startYear,
        playerName: req.body.playerName
    };

    BadmintonFun.create(newFun, function(err, funData){
        if(err){
            console.log("Not adding a new fun");
            res.status(500).json(err);
             return;
        }
        else{
        console.log("new fun created!");
            res.status(201).json(funData);
        }
    });
    
};

const updateFun = function(req, res){
    if(!mongoose.isValidObjectId(req.params.funId)){        
        res.status(400).json({"message":"invalid fun id passed."});
        return;
    }
    const funId = req.params.funId;
    BadmintonFun.findById(funId).exec(function(err, fun){
        if(err){
              res.status(500).json(err)
        }
        else{
            if(!fun){
                res.status(404).json({"message":"Fun Id is not found"});
                return;
            }
            else{
                fun.country = req.body.country;
                fun.startYear = req.body.startYear;
                fun.playerName = req.body.playerName;
               
                fun.save(function(err, updateFun){
                    if(err){
                        
                       res.status(500).json(err);
                       return;
                    }
                    else{                        
                        res.status(200).json(updateFun);
                    }
                });

            }
        }
    });
};

const deleteOne = function(req, res){
    if(!mongoose.isValidObjectId(req.params.funId)){
        console.log("Invalid id!");
        res.status(400).json({"message":"invalid fun id passed."});
        return;
    }
    const funId = req.params.funId;
    BadmintonFun.findByIdAndRemove(funId).exec(function(err, deletedFun){
        if(err){
            res.status(500).json(err)
        }
        else{
            if(!deletedFun){
                res.status(404).json({"message":"Fun Id is not found"});
                return;
            }
            else{
                
                res.status(204).json(deletedFun);
             }
                

        }
    });
};


module.exports ={
    funsGetAll:getAll,
    funsGetOne:getOne,
    funAdd:addOne,
    updateFun: updateFun,
    deletedFun:deleteOne
}
