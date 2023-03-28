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
const table = "VivUsers";
const configTable = "VivConfig"


router.get('/shoppingCart', (req, res) => {
    // check if the user is not logged in
    if (!req.isAuthenticated()) {
        return
    }
    // get the cart items for the logged in user 
    console.log("___________________________", req.user)
    const params = {
        TableName: table,
        ExpressionAttributeNames: {
            "#user": "user"
        },
        // values use aliases with : prefix 
        ExpressionAttributeValues: {
            ":email": req.user.email
        },
        // specifies the search criteria
        KeyConditionExpression: "#user = :email",

    };
    // Scan return all items in the table
    docClient.query(params, (err, results) => {
        if (err) {
            res.status(500).json(err)
        } else {
            console.log("*********************************************", results.Items)
            res.json(results.Items)
        }
    })
})



module.exports = router;