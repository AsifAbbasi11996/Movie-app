import multer from 'multer'
import path from 'path'

// Define storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/') // specify directory to save uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)) // append timestamp to avoid overwriting files
  }
})

// Initialize multer
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const allowedTypes = /jpeg|jpg|png|gif|webp/
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    )
    const mimetype = allowedTypes.test(file.mimetype)

    if (extname && mimetype) {
      return cb(null, true)
    } else {
      cb(
        new Error(
          'Invalid file type, only JPEG, JPG, PNG, and GIF are allowed.'
        )
      )
    }
  }
}).array('image', 5) // `image` is the field name for the uploaded files, and you can upload up to 5 images.

export default upload
