const router = require("express").Router();
const picture = require("../data/Picture.json");
const multer = require("multer");
const Stopwatch = require('statman-stopwatch');
const sw = new Stopwatch();
var nocr = require("nocr");


const storage = multer.diskStorage({
    destination: "./uploadedPicture/",
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
  });

  const fileFilter = (req, file, cb) =>{
    if(file.mimetype==='image/png'||file.mimetype==='image/jpeg'){
      cb(null,true);
    }
    else{
      cb(new Error('wrong file'),false)
    }
}

  const uploadPic = multer({ storage: storage, limits:{
    fieldSize: 1024 * 1024 * 2
  },fileFilter:fileFilter }); 

  router.get("/", (req, res) => {
    res.json(picture);
  });


router.post("/", uploadPic.single("file"), (req, res) => { 
    sw.start();     
    nocr.decodeFile("./uploadedPicture/"+ req.file.originalname, function(error, data){
        console.log(data); 
    sw.stop();
    const time = parseFloat(sw.read()/1000).toFixed(2);
    console.log(time);
        const newPic = {
            image: "http://localhost:8080/" + req.file.originalname,
            response: data,
            second:time +'s'
        };
        
        picture.unshift(newPic)
        res.json(newPic)
    });
  });
  

   

  module.exports = router;