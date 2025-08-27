import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

export const uploadSingleImage = (fieldName: string) => multer({ storage }).single(fieldName);
export const uploadMultipleImages = (fieldName: string, maxCount: number) => multer({ storage }).array(fieldName, maxCount);
