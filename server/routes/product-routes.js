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
const configTable = "VivConfig"



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
            console.log("Products loaded")
            res.json(results.Items)
        }
    })
})

// Route to retrieve a product
router.get('/product/:name', (req, res) => {
    const params = {
        TableName: table,
        ExpressionAttributeNames: {
            "#prod": "productName"
        },
        // values use aliases with : prefix 
        ExpressionAttributeValues: {
            ":name": req.params.name
        },
        // specifies the search criteria
        KeyConditionExpression: "#prod = :name",
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

// Route to retrieve all categories
router.get('/settings', (req, res) => {
    const params = {
        TableName: configTable
    };
    // Scan return all items in the table
    docClient.scan(params, (err, results) => {
        if (err) {
            res.status(500).json(err)
        } else {
            console.log("Settings loaded")
            res.json(results.Items)
        }
    })
})




// Add new category in to array
router.post('/addCategory', async (req, res) => {
    const params = {
        TableName: configTable,
        Item: {
            "configs": "categories",
            "values": req.body.values
        },
        ReturnValues: 'ALL_OLD'
    };
    try {
        const data = await docClient.put(params).promise()
        console.log("Success")
        console.log(data)
        res.json({ created: true })
    } catch (err) {
        console.log("Failure", err.message)
        // there is no data here, you can return undefined or similar
    }
    // docClient.put(params)
    //     .promise()
    //     .then((data) => {
    //         res.json(data)
    //         console.log(data)
    //         console.log("Addeda product:", JSON.stringify(data, null, 2));
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
});

// Create new product
router.post('/addProduct', async (req, res) => {
    const params = {
        TableName: table,
        Item: {
            "productName": req.body.productName,
            "createdAt": Date.now(),
            "category": req.body.category,
            "image": req.body.image // image URL
        },
        ReturnValues: 'ALL_OLD'
    };
    try {
        const data = await docClient.put(params).promise()
        console.log("Success")
        console.log(data)
        res.json({ created: true })
    } catch (err) {
        console.log("Failure", err.message)
        // there is no data here, you can return undefined or similar
    }
    // docClient.put(params)
    //     .promise()
    //     .then((data) => {
    //         res.json(data)
    //         console.log(data)
    //         console.log("Addeda product:", JSON.stringify(data, null, 2));
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
});

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

// delete category by updating the category array, so post
router.post('/deleteCategory', async (req, res) => {
    console.log("Deleted", req.body.values)
    const params = {
        TableName: configTable,
        Item: {
            "configs": "categories",
            "values": req.body.values
        },
        ReturnValues: 'ALL_OLD'
    };
    try {
        const data = await docClient.put(params).promise()
        console.log("Success")
        console.log(data)
        res.json({ created: true })
    } catch (err) {
        console.log("Failure", err.message)
        // there is no data here, you can return undefined or similar
    }
    // docClient.put(params)
    //     .promise()
    //     .then((data) => {
    //         res.json(data)
    //         console.log(data)
    //         console.log("Addeda product:", JSON.stringify(data, null, 2));
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
});



module.exports = router;