const mongoose = require("mongoose");
const BadmintonFun = mongoose.model("BadmintonFun"); 

const ObjectId = require("mongodb").ObjectId;


teamGet = function(req, res){
    if(!mongoose.isValidObjectId(req.params.funId)){
        console.log("Invalid id!");
        res.status(400).json({"message":"invalid team id passed."});
        return;
    }

    const funId = req.params.funId;
    
    BadmintonFun.findById(funId).select("team").exec(function(err, fun){
        if(err){
            console.log("error finding fun");
            res.status(500).json(err);
            return;
        }
        else{
            if(!fun){
                console.log("team is not found!");
                res.status(404).json({"message":"Team Id not found" +funId});
                return;
            }
            else{
                console.log("found team");
                res.status(200).json(fun.team);
            }

        }
        
    });  

}

const _addTeam=function(req, res, fun){
   fun.team.name = req.body.name;
   fun.team.country= req.body.country;
   fun.team.playedYears= req.body.playedYears;
   
   fun.save(function(err, updatedFun){
     
        if(err){
          
            res.status(500).json(err);
        }
        else{
           
            res.status(201).json(updatedFun.team);

        }      
   });
};

teamAdd = function(req, res){
    if(!mongoose.isValidObjectId(req.params.funId)){
        console.log("Invalid id!");
        res.status(400).json({"message":"invalid fun id passed."});
        return;
    }
    const funId = req.params.funId;
    BadmintonFun.findById(funId).select("publisher").exec(function(err, fun){
        if(err){
            console.log("error finding");
            res.status(500).json(err);
            return;
        }
        else{
            if(!fun){
                console.log("fun is not found!");
                res.status(404).json({"message":"Game Id not found, " +funId});
                return;
            }
            else{
                _addTeam(req, res, fun);
            }

        }
        
    });    


};

const _updateTeam = function(req, res, fun)
{
    fun.team.name=req.body.name;  
    fun.team.country = req.body.country;
    fun.team.playedYears = parseInt(req.body.playedYears);

    fun.save(function(err, updateFun){
        if(err){
            console.log("error finding fun");
            res.status(500).json(err);
        }
        else{
            if(!updateFun){
                res.status(404).json({"message":"No fun Id"});
            }
            else{
                res.status(201).json(updateFun.team);
            }
        }
    });
};

teamUpdate = function(req, res){
    if(!mongoose.isValidObjectId(req.params.funId)){
        res.status(400).json({"message":"invalid fun id passed."});
        return;
    }
    const funId = req.params.funId;
    BadmintonFun.findById(funId).select("team").exec(function(err, fun){
        if(err){
            console.log("fun by this id is not found");
            res.status(500).json(err);
        }
        else{
            if(!fun){
                console.log("Not found");
                res.status(404).json({"message":"fun ID not found"});
            }
            else{                
                _updateTeam(req, res, fun);
            }
        }
    });

};

const _deleteTeam = function(req, res, fun){
    fun.team.remove();
    fun.save(function(err, fun){
        if(err){
            res.status(500).json(err);
        }
        else{
            res.status(204).json(fun.team);
        }
    });    
};

teamDelete = function(req, res){
    if(!mongoose.isValidObjectId(req.params.funId)){
        res.status(400).json({"message":"invalid fun id passed."});
        return;
    }
    const funId = req.params.funId;
    BadmintonFun.findById(funId).exec(function(err, fun){
       if(err){
        res.status(500).json(err);
       }
       else{
           if(!fun){
                res.status(404).json({"message":"Fun Id not found"})
           }
           else{
                _deleteTeam(req, res, fun);
           }
       }
    });
};

module.exports={
    getTeam: teamGet,
    teamAdded: teamAdd,
    updateTeam:teamUpdate,
    deletedTeam: teamDelete

}