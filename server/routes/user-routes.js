const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');

const configuration = {
    region: 'us-east-2',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID
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

// Remove one item from the cart list
router.delete('/cart', async (req, res) => {
    // check if the user is not logged in
    if (!req.isAuthenticated()) {
        return
    }
    // query cart from the backend rather passing from the front end, for quicker processing
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
                let fetchedCart = results.Items[0].cart;
                handleUpdate(fetchedCart)
            }
        })
    } catch (err) {
        console.log("Failure", err.message)
    }
    const handleUpdate = async (fetchedCart) => {
        // remove the item object from the cart array
        console.log(fetchedCart)
        console.log(req.body, "to delete")

        const extractedCart = fetchedCart.filter(item => item.name !== req.body.toDelete)
        const updatedCart = [...extractedCart]
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
            }

        };
        try {
            const data = await docClient.update(params).promise()
            console.log("Success")
            console.log(data)
            res.json({ deleted: true, item: req.body.toDelete })
        } catch (err) {
            console.log("Failure", err.message)
        }
    }
})


// Empty the cart for the user
router.delete('/cartAll', async (req, res) => {
    // check if the user is not logged in
    if (!req.isAuthenticated()) {
        return
    }
    const params = {
        TableName: table,
        Key: { "user": req.user.email },
        ReturnValues: 'ALL_NEW',
        UpdateExpression: 'set #cart = :empty_list',
        ExpressionAttributeNames: {
            '#cart': 'cart'
        },
        ExpressionAttributeValues: {
            ':empty_list': []
        }

    };
    try {
        const data = await docClient.update(params).promise()
        console.log("Success")
        console.log(data)
        res.json({ cleared: true })
    } catch (err) {
        console.log("Failure", err.message)
    }
})


module.exports = router;