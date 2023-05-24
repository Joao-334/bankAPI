import multer from 'multer';
import path from 'node:path';

// Storage

const imageStore = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

export const imageUpload = multer({
    storage: imageStore,
    fileFilter(req, file, cb) {
        if(!file.originalname.match(/\.(png|jpg)$/)) {
            return cb(new Error('Please send only png or jpg'));
        }

        cb(null, true);
    }
});
