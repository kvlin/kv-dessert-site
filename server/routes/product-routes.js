const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');

const configuration = {
    region: 'us-east-2',
    secretAccessKey: 'BeCkYT8U3LmsHxEztBuX2VBwbNDCvvMPGxrzybNK',
    accessKeyId: 'AKIAXELGXQGM5KO4OKJZ'
}
AWS.config.update(configuration)
const docClient = new AWS.DynamoDB.DocumentClient()
const table = "VivProducts";



// Route to retrieve all user thougths
router.get('/allProducts', (req, res) => {
    const params = {
        TableName: table
    };
    // Scan return all items in the table
    docClient.scan(params, (err, results) => {
        if (err) {
            res.status(500).json(err)
        } else {
            console.log(results.Items)
            res.json(results.Items)
        }
    })
})

module.exports = router;