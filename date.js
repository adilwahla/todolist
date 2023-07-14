exports.getDate=function () {
     let today=new Date();
     let options = { weekday: 'long', day: 'numeric', month: 'long' };
    
    return today.toLocaleDateString("en-US", options);// Saturday, September 17, 2023
    };


exports.getDay=function () { 
    let today=new Date();
    let options = { weekday: 'long' }; 

    return today.toLocaleDateString("en-US", options);// Saturday, September 17, 2023
    };

  //  console.log(module);