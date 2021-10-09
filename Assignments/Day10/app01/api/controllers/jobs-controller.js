const mongoose = require("mongoose");
const Job = mongoose.model("Job"); 

// const runGeoQuery = function(req, res){
//     const lng = parseFloat(req.query.lng);
//     const lat = parseFloat(req.query.lat);
//     //const maxDist = parseFloat(req.query.maxDist)||1000;

//     const query = {
//         "publisher.location": {
//             $near: {
//                 $geometry:{
//                     type: "Point",
//                     coordinates: [lng, lat]
//                 },           
//             $maxDistance: 1000,
//             // $minDistance: 10
//             }
            
//         }
//     }
    
//     Job.find(query).exec(function(err, Jobs){
//         console.log("Geo Search");
//         if(err){
//             console.log("Error", err);
//                 return;
//         }
//         console.log("found Jobs");
//          res.status(200).json(Jobs);

//     });    
// }

// const getAllNotWithoutLimit= function(req, res){
    

//     if(isNaN(offset)||isNaN(count)){
//         res.status(400).json({"messagae": "QueryString offset and count should be numbers."});
//         return;
//     }

//     Job.find().exec(function(err, Jobs){
//         if(err)
//         {
//                 console.log("error finding Jobs");
//                 res.status(500).json(err);
//                 return;
//         }
//         else{
//                     console.log("Found Jobs");
//                     res.status(200).json(Jobs);
//             }
//     });     
// }



const getAll = function(req, res){

    console.log("Json Request Received!");

   

    // if(req.query && req.query.lat && req.query.lng){
    //     runGeoQuery(req, res);
    //     return;
    // }


    let offset = 0;
    let count = 10;
    const  maxCount = 9;

    if(req.query && req.query.offset){
        offset=parseInt(req.query.offset, 10);
    }
    if(req.query && req.query.count)
    {
        count=parseInt(req.query.count, 10);
        if(count > maxCount){
            count = maxCount;
        }
    }

    if(isNaN(offset)||isNaN(count)){
        res.status(400).json({"messagae": "QueryString offset and count should be numbers."});
        return;
    }

    Job.find().skip(offset).limit(count).exec(function(err, Jobs){
        if(err)
        {
                console.log("error finding Jobs");
                res.status(500).json(err);
                return;
        }
        else{
                    console.log("Found Jobs");
                    res.status(200).json(Jobs);
            }
    });     
}

const getOne=function(req, res){

    console.log("Get one Job req received")

    if(!mongoose.isValidObjectId(req.params.jobId)){
        console.log("Invalid id!");
        res.status(400).json({"message":"invalid Job id passed."});
        return;
    }

    const jobId = req.params.jobId;
    
    Job.findById(jobId).exec(function(err, job){
        if(err){
            console.log("error finding Job");
            res.status(500).json(err);
            return;
        }
        else{
            if(!job){
                console.log("Job is not found!");
                res.status(404).json({"message":"Job id is not found"});
                return;
            }
            else{
                console.log("found Job");
                res.status(200).json(job);
            }

        }
        
    });  
};

 
const addOneJob= function(req, res){    
    
    //if(!(req.body && req.body.title && req.body.salary&&req.body.description)){
    if(!(req.body && req.body.title && req.body.experience)){
    
        console.log("Data missing from Post body");
        res.status(400).json({error:"Required data missing from POST"});  
        return; 

    }

    else
    {   
        const locationNew ={
            address:req.body.address,
            zipCode:req.body.zipCode,
            phoneNumber: req.body.phoneNumber
        };
            const newJob = {
            title: req.body.title,
            salary: req.body.salary,
            description: req.body.description,
            experience: req.body.experience,
            postDate: req.body.postDate,
            skill: req.body.skill,
            location: locationNew
        };

        Job.create(newJob, function(err, response){
            if(err){
                console.log("Not creating a new job");
                res.status(500).json(err);
                return;
            }
            else{
                console.log("new job created!");
                res.status(201).json(response);
            }
        });
    }
};


// const updateJob = function(req, res){
//     if(!mongoose.isValidObjectId(req.params.jobId)){
//         console.log("Invalid id!");
//         res.status(400).json({"message":"invalid Job id passed."});
//         return;
//     }
//     const jobId = req.params.jobId;
//     Job.findById(JobId).select("-reviews -publisher").exec(function(err, job){
//         if(err){
//             console.log();
//             res.status(500).json(err)
//         }
//         else{
//             if(!job){
//                 res.status(404).json({"message":"job Id is not found"});
//                 return;
//             }
//             else{
//                 job.titele = req.body.title;
//                 job.price = parseFloat(req.body.price);
//                 job.minAge = parseInt(req.body.minAge);
//                 job.save(function(err, updatedJob){
//                     if(err){
//                        res.status(500).json(err);
//                        return;
//                     }
//                     else{
//                         res.status(200).json(updatedJob);
//                     }
//                 });

//             }
//         }
//     });
// };
 
const deleteOne = function(req, res){
    if(!mongoose.Types.ObjectId.isValid(req.params.jobId)){
        console.log("Invalid id!");
        res.status(400).json({"message":"invalid Job id passed."});
        return;
    }

    const jobId = req.params.jobId;
    Job.findByIdAndRemove(jobId).select("-reviews -publisher").exec(function(err, deletedJob){
        if(err){
            res.status(500).json(err)
        }
        else{
            if(!deletedJob){
                res.status(404).json({"message":"Job Id is not found"});
                return;
            }
            else{
                
                res.status(200).json(deletedJob);
             }
                

        }
    });
};

module.exports ={
   
    addOneJob:addOneJob,
    getAllJobs: getAll,
    getOneJob:getOne,
    deleteOne:deleteOne
    
}



// module.exports ={
//     JobsGetAll:getAll,
//     JobsGetOne:getOne,
//     addOneJob:addOne,
//     updatedJob:updateJob,
//     deletedJob:deleteOne
// }
