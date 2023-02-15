import * as AWS from 'aws-sdk'


const configuration = {
    region: 'us-east-2',
    secretAccessKey: 'BeCkYT8U3LmsHxEztBuX2VBwbNDCvvMPGxrzybNK',
    accessKeyId: 'AKIAXELGXQGM5KO4OKJZ'
}
AWS.config.update(configuration)
const docClient = new AWS.DynamoDB.DocumentClient()

export async function fetchProducts  (tableName) {
    
    var params = {
        TableName: tableName
    }

    
    docClient.scan(params, function (err, data) {
        if (!err) {
             console.log(data)
           
        } 
        
    })

    
}