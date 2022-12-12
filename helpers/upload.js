import multer from "multer";
import * as path from 'path'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public");
    },
      filename: function (req, file, cb) {
        cb(null, file.originalname);
        // let temp = file.originalname.split('.');
        // cb(null, Date.now() + "-" + file.originalname);
        // cb(null, file.fieldname + '-' + Date.now()+'.'+ temp[temp.length-1])
      },
  });
  
 export const upload = multer({ storage });