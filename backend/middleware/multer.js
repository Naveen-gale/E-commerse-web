import multer from "multer";

const storage = multer.memoryStorage(); // Store in memory for ImageKit upload
const upload = multer({ storage: storage });

export default upload;
