const express = require('express')
require('dotenv').config()

const { upload, processCsvFile, removeFile } = require('./helpers/files')
const { insertDataIntoDb, getData } = require('./helpers/database')
const { detectOutliers } = require('./helpers/statistics')

const path = require('path')
const app = express()

/**
 * Handles file upload, processes CSV data to detect outliers, and imports data into the test_table.
 * 
 * @route POST /upload
 * @param {object} req - Express request object, containing the uploaded file.
 * @param {object} res - Express response object, used to send the response.
 */
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const filePath = path.join(__dirname, req.file.path)

    // Load csv from temporary dir and parse it to object.
    const results = await processCsvFile(filePath)

    // Remove the processed csv file.
    await removeFile(filePath)

    // Check for the outliers.
    const outliers = detectOutliers(results)

    // Terminate further steps if data has outlier(s).
    if (outliers.length > 0) {
      return res.status(400).json({
        status: "error",
        message: 'Outliers detected.',
        data: outliers
      })
    }

    // Import the data to database.
    await insertDataIntoDb(results);

    res.status(200).json({
      status: "success",
      message: 'File successfully processed.'
    })
  } catch (err) {
    // console.error(err);
    res.status(500).json({
      status: "error",
      message: 'Server error.',
      data: err.message
    })
  }
})

/**
 * Handles data fetching, get all the data from test_table.
 * 
 * @route GET /data
 * @param {object} res - Express response object, used to send the response.
 */
app.get('/data', async (req, res) => {
  try {
    // Check for the outliers.
    const data = await getData()

    res.status(200).json({
      status: "success",
      message: 'Data successfully fetched.',
      data: data
    })
  } catch (err) {
    // console.error(err);
    res.status(500).json({
      status: "error",
      message: 'Server error.',
      data: err.message
    })
  }
})

app.listen(3000, () => {
  console.log('Server is running on port 3000')
})
