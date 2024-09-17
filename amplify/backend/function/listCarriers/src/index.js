const aws = require('aws-sdk');
const awsssm = require('aws-sdk/clients/ssm')
const axios = require('axios')

const cisp = new aws.CognitoIdentityServiceProvider({
  apiVersion: '2016-04-18',
});

const docClient = new aws.DynamoDB.DocumentClient(); 
const ssm = new awsssm();



const clientTableName = 'Client-w3l35a5lyvhzng5pschx2pphvq-dev';
const salonTableName  = 'Salon-w3l35a5lyvhzng5pschx2pphvq-dev';
const userTableName   = 'User-w3l35a5lyvhzng5pschx2pphvq-dev';

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    /* event = {
        userId: '',
        salonId: '' [optional],
        overrideOptions: {...} [optional]
    }
    */

    const keys = await ssm.getParameters({
        Names: ['/amplify/dc7guxjvcw1wg/dev/SHIPSTATION_KEY','/amplify/dc7guxjvcw1wg/dev/SHIPSTATION_SECRET']
    }).promise();
    const key = keys.Parameters[0].Value
    const secret = keys.Parameters[1].Value 
    const authBuff = new Buffer(key+':'+secret)
    const authStr  = authBuff.toString('base64')

    const userId = event.userId;
    let salonId = event.salonId;
    const override = event.overrideOptions || {};

    if (userId === undefined) {
        throw new Error('Invalid UserId')
    }

    const getUserParams = {
        TableName: userTableName,
        Key: {id: userId},
    }

    let userObj = {};
    let salonObj = {};

    try {
        const data = await docClient.get(getUserParams).promise();
        if (data && data.Item) {
            userObj = data.Item;
          } else {
            throw new Error('Unknown ClientId');
          }
    } catch (err) {
        throw err;
    }

    if (salonId === undefined) {
        salonId = userObj.salonUsersId;
        if (salonId === undefined) {
            throw new Error('Invalid User SalonId')
        }
    }

    if (salonId === undefined) {
        throw new Error('Invalid SalonId ')
    }

    const getSalonParams = {
        TableName: salonTableName,
        Key: {id: salonId},
    }

    try {
        const data = await docClient.get(getSalonParams).promise();
        if (data && data.Item) {
            salonObj = data.Item;
          } else {
            throw new Error('Unknown SalonId');
          }
    } catch (err) {
        throw err;
    }

    const options = {
        headers: {
            'Host': 'ssapi.shipstation.com',
            'Authorization': 'Basic ' + authStr
        },
    }

    let replyObj = {}

    try {
        const response = await axios.get("https://ssapi.shipstation.com/carriers",options)
        replyObj = response.data
    } catch (err) {
        throw err
    }

    console.log(replyObj);

    return {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  }, 
        body: JSON.stringify(replyObj),
    };
};
