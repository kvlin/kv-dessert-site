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


router.get('/cart', (req, res) => {
    // check if the user is not logged in
    if (!req.isAuthenticated()) {
        return
    }
    // get the cart items for the logged in user 
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
            console.log(results.Items)
            res.json(results.Items)
        }
    })
})
router.put('/cart', async (req, res) => {
    // check if the user is not logged in
    if (!req.isAuthenticated()) {
        return
    }
    // check if item is already in the cart
    try {
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
                let exists = false;
                let newQuantity = 0;
                //check if item name is in the cart
                results.Items[0].cart.forEach(item => {
                    if (item.name === req.body.toCart.name) {
                        console.log("Item already in cart")
                        exists = true;
                        newQuantity = item.quantity + req.body.toCart.quantity;
                        return
                    }
                })
                if (exists) {
                    handleUpdate(results.Items[0].cart, newQuantity)
                } else {
                    handleAddAndUpdate()
                }

            }
        })
    } catch (err) {
        console.log("Failure", err.message)
    }

    const handleUpdate = async (fetchedCart, newQuantity) => {
        // remove the item object from the cart array
        const extractedCart = fetchedCart.filter(item => item.name !== req.body.toCart.name)
        console.log(extractedCart)
        const updatedCart = [...extractedCart, { ...req.body.toCart, quantity: newQuantity }]
        const params = {
            TableName: table,
            Key: { "user": req.user.email },
            ReturnValues: 'ALL_NEW',
            UpdateExpression: 'set #cart = :items',
            ExpressionAttributeNames: {
                '#cart': 'cart'
            },
            ExpressionAttributeValues: {
                ':items': updatedCart,
                // ':empty_list': []
            }

        };
        try {
            const data = await docClient.update(params).promise()
            console.log("Success")
            console.log(data)
            res.json({ created: true })
        } catch (err) {
            console.log("Failure", err.message)
        }
    }
    const handleAddAndUpdate = async () => {
        const params = {
            TableName: table,
            Key: { "user": req.user.email },
            ReturnValues: 'ALL_NEW',
            UpdateExpression: 'set #cart = list_append(if_not_exists(#cart, :empty_list), :items)',
            ExpressionAttributeNames: {
                '#cart': 'cart'
            },
            ExpressionAttributeValues: {
                ':items': [req.body.toCart],
                ':empty_list': []
            }

        };
        try {
            const data = await docClient.update(params).promise()
            console.log("Success")
            console.log(data)
            res.json({ created: true })
        } catch (err) {
            console.log("Failure", err.message)
        }
    }
})



module.exports = router;