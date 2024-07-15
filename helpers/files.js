const multer = require('multer')
const upload = multer({ dest: process.env.UPLOAD_DIR })

const fs = require('fs')
const csv = require('fast-csv')

const processCsvFile = async (filePath) => {
    const results = [];
    return new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
            .pipe(csv.parse({ headers: true }))
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', (err) => reject(err))
    })
}

const removeFile = (filePath) => {
    return fs.promises.unlink(filePath)
}

module.exports = {
    upload,
    processCsvFile,
    removeFile,
}