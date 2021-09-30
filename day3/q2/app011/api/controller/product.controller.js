module.exports.product =function(req, res){

    const number1=  req.params.number1;  
    // console.log(number1);   
    if(req.query && req.query.number){
        number= parseInt(req.query.number);   
        //console.log(number);   
    }
    let product = number1 * number;
    
    res.status(200).send("Product of " +number1+ " & "+number+" is "+product+".")
    
} 
