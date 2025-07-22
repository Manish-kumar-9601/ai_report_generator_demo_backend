import multer from "multer";

// cb is callback
//image file disk storage
const storage = multer.diskStorage({
  destination:  (req, file, cb)=> {
    cb(null, "uploads"); // Ensure this directory exists
  },
  filename:  (req, file, cb)=> {
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 19);
    cb(null, `${Date.now()+Math.round(Math.random()*20)}-${file.originalname}`);
  },
});

export const upload = multer({  storage:storage });
