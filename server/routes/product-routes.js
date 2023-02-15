const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');

const configuration = {
    region: 'us-east-2',
    secretAccessKey: '/XY7Q3Gm9j0qbR4ZZzedQN0Z8xa/lHEGnQrKwwnR',
    accessKeyId: 'AKIAXELGXQGMU25KJ7FA'
}
AWS.config.update(configuration)
const docClient = new AWS.DynamoDB.DocumentClient()
const table = "VivProducts";



// Route to retrieve all products
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
router.post('/upload', (req, res) => {
    const params = {
        TableName: table,
        Key: {
            "productName":
                req.body.productName,
            "createdAt":
                req.body.createdAt
        },
        ReturnValues: 'ALL_OLD'
    };
    docClient.delete(params, function (err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            res.json({ message: `Successfully deleted ${data.productName}` })
            console.log("Success", data);
        }
    });
})
router.delete('/deleteProduct', (req, res) => {
    console.log(req.body.productName)
    const params = {
        TableName: table,
        Key: {
            "productName":
                req.body.productName,
            "createdAt":
                req.body.createdAt
        },
        ReturnValues: 'ALL_OLD'
    };
    docClient.delete(params, function (err, data) {
        if (err) {
            console.log("Error", err);
        } else {
            res.json({ message: `Successfully deleted ${data.productName}` })
            console.log("Success", data);
        }
    });
})

module.exports = router;