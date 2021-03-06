const mongoose = require("mongoose");
const BadmintonFun = mongoose.model("BadmintonFun"); 

const getAllTeams = function(req, res){
    if(!mongoose.isValidObjectId(req.params.funId)){
        console.log("Invalid id!");
        res.status(400).json({"message":"invalid team id passed."});
        return;
    }

    const funId = req.params.funId;
    
    BadmintonFun.findById(funId).select("teams").exec(function(err, fun){
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
                res.status(200).json(fun.teams);
            }

        }
        
    });  

}

const getOneTeam = function(req, res){
    if(!mongoose.isValidObjectId(req.params.funId)){
        console.log("Invalid id!");
        res.status(400).json({"message":"invalid fun id passed."});
        return;
    }
    if(!mongoose.isValidObjectId(req.params.reviewId)){
        console.log("Invalid id!");
        res.status(400).json({"message":"invalid fun id passed."});
        return;
    }
    const funId = req.params.funId;
    const teamId = req.params.teamId;
    
    
    BadmintonFun.findById(funId).select("team").exec(function(err, fun){
        const team= fun.team.id(teamId);        
        if(err){
            res.status(500).json(error);
        }
        else{
            if(!fun){
                res.status(404).json({"message":"team Id not found "})
            }
            else{
                res.status(200).json(team);
            }
        }
        
    });
}

const _addTeam=function(req, res, fun){
    
    const newTeam ={
        name: req.body.name,
        country: req.body.country,
        playedYears: req.body.playedYears

    };

    //const newTeam = req.body;
    fun.team.push(newTeam);  

    fun.save(function(err, updatedFun){
     
        if(err){
            console.log("error saving team");
            res.status(500).json(err);
        }
        else{
           
            res.status(201).json(updatedFun.team);

        }      
   });
};

const teamAdd = function(req, res){
    if(!mongoose.isValidObjectId(req.params.funId)){
        console.log("Invalid id!");
        res.status(400).json({"message":"invalid fun id passed."});
        return;
    }
    const funId = req.params.funId;
    BadmintonFun.findById(funId).select("team").exec(function(err, fun){
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
                if(!(fun.team)){
                    fun.team= {name:"empty", country:"empty", playedYears: {}}
                }
                _addTeam(req, res, fun);
            }

        }
        
    });   
};

const _updateTeam = function(req, res, fun)
{

    const teamId = req.params.teamId;   
    let len = fun.team.length
    let index = -1;
    for (let i = 0; i < len; i++) {
        if (fun.team[i].id === teamId) {
            index = i
            break;
        }
    }
    var insertIdx;
    if (index != -1) {
        insertIdx = index
    } else {
        insertIdx = fun.team.length
    }
    
    fun.team[insertIdx] = { 
        name: req.body.name, country: req.body.country, playedYears : req.body.playedYears 
   
    }     
               
    fun.save(function(err, fun){
        if(err)
        {
            console.log("error finding team");
        }
        else
            {
                if(!fun)
                {
                    res.status(404).json({"message":"No team Id"});
                }
                else
                {
                    res.status(201).json(fun.team[insertIdx]);
                }
            }
    });
  
};

const teamUpdate = function(req, res){
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
                if(!(fun.team)){
                    fun.team= {name:"empty", country:"empty", playedYears: {}}
                }             
                _updateTeam(req, res, fun);
            }
        }
    });      

};

const _deleteTeam = function(req, res, fun){
    
    const teamId = req.params.teamId;   
    let len = fun.team.length
    let index = -1;

    for (let i = 0; i < len; i++) {
        if (fun.team[i].id === teamId) {
            index = i
            break;
        }
    }

    var insertIdx;
    if (index != -1) {
        insertIdx = index
    } else {
        insertIdx = fun.team.length
    }    

    fun.team.splice(index,1);
    
    fun.save(function(err, fun){
        if(err){
            res.status(500).json(err);
        }
        else{
            res.status(204).json(fun.team[insertIdx]);
        }
    });  
    
};

const teamDelete = function(req, res){
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
    getOneTeam: getOneTeam,
    getAllTeams: getAllTeams,
    teamAdded: teamAdd,
    updateTeam:teamUpdate,
    deletedTeam: teamDelete

}