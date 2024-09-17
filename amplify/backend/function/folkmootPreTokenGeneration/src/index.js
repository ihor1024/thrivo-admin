/* Amplify Params - DO NOT EDIT
API_FOLKMOOT_GRAPHQLAPIIDOUTPUT
API_FOLKMOOT_USERTABLE_ARN
API_FOLKMOOT_USERTABLE_NAME
ENV
REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const aws = require('aws-sdk');

const cisp = new aws.CognitoIdentityServiceProvider({
apiVersion: '2016-04-18',
});

const docClient = new aws.DynamoDB.DocumentClient(); 

exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    const userTableName = 'User-w3l35a5lyvhzng5pschx2pphvq-dev';
    const userId = event.userName;
    const groups = event.request.groupConfiguration.groupsToOverride;

    if (!userId) {
        throw new Error("Function requires to receive in event the username: 'event.userName'");
    }

    const userEmail = event.request?.userAttributes?.email ?? undefined;
    if (!userEmail) {
        throw new Error("Function requires to receive in event the user Email: 'event.request.userAttributes.email'")
    }

    const scanParams = {
        TableName: userTableName,
        FilterExpression: 'email = :user_email',
        ExpressionAttributeValues: {':user_email': userEmail}
    }
    const Users = await docClient.scan(scanParams).promise()
    console.log(JSON.stringify(Users, null, 4))

    //let claimsToAddOrOverride = {};

    if (Users.Items.length >= 1) {
        const User = Users.Items[0];
        if (User.tenantClaims) {
            //console.log(JSON.stringify(User.tenantClaims, null, 4))
            //const stringifiedClaims = JSON.stringify(User.tenantClaims);
            //claimsToAddOrOverride['tenantGroupClaims'] = stringifiedClaims;
            Object.assign(event.response, {
                claimsOverrideDetails: {
                groupOverrideDetails: {
                    groupsToOverride: [...User.tenantClaims,...groups],
                },
                },
            });
        }
    }
    
    
    console.log(`RETURN EVENT: ${JSON.stringify(event)}`)

    return {
        ...event,
        statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  }, 
        body: JSON.stringify('Hello from Lambda!'),
    };
};
