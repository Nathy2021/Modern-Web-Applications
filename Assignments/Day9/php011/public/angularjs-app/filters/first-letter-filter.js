angular.module("badmintonFuns").filter("firstLetter", FirstLetterFilter)
function FirstLetterFilter(){
    return function(string){
        if(string && !(isNaN(string))){
            let c = string.charAt(0);
            console.log(c);
            if( c == c.toUpperCase()){
                console.log("1 ", string);
                return string;               
            }
            else{
                let newString = string.toUpperCase();
                console.log("2", newString);
                return newString;
            }
        }
        else {
            console.log("3 ", string);
            return string;
        }
    }
}