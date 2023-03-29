const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, 'src/Views/static/image/')
    },
    filename: function(req, file, callback){
        callback(null, `${Date.now()}_${file.originalname}`)
    }
})

module.exports = storage