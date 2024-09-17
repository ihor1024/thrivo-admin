/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const aws = require('aws-sdk');

const cisp = new aws.CognitoIdentityServiceProvider({
  apiVersion: '2016-04-18',
});

const docClient = new aws.DynamoDB.DocumentClient(); 

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event, null, 4)}`);
    const getParams = {
        TableName: 'authRoleKeyTable-w3l35a5lyvhzng5pschx2pphvq-dev',
        Key: {
            id: event.AccessCode
        }
    }

    const deleteParams = {
        ...getParams
    }
    
    //var cognitoIdentityServiceProvider = new AWS.CognitoIdentityServiceProvider();

    var groupParams = {

        GroupName: 'Users', //your confirmed user gets added to this group
        UserPoolId: event.userPoolId,  
        Username: event.userName
    };


    // the user attribute 'custom:ManagerID' was set on User Sign Up.  Here, we are// using it as a flag.  If it has a value, then add the user to the Managers group.

    /*if(event.request.userAttributes["custom:ManagerID"]) {}*/

    /*const attrParams = {
        UserAttributes: [
            {
                Name: 'custom:tenant',
                Value: null,
            }
        ],
        UserPoolId: event.userPoolId,
        Username: event.userName,
    }*/
    
    //console.log(`ATTR PARAMS: ${JSON.stringify(attrParams, null, 4)}`);
    let newGroups = []
    let successGroups = []
    let failedGroups = []
    let createGroupAndRetry = []
    
    try {
        const data = await docClient.get(getParams).promise();
        console.log(`DATA: ${JSON.stringify(data, null, 4)}`);
        if (data && data.Item && data.Item["allowedGroups"]) {
            newGroups = data.Item["allowedGroups"];
            //attrParams.UserAttributes[0].Value = JSON.stringify(data.Item["allowedGroups"]);
            
            console.log('NEWGROUPS = ' + JSON.stringify(newGroups, null, 4));
            //await cisp.adminUpdateUserAttributes(attrParams).promise();
            if (!data.Item["multiUse"]) {
                await docClient.delete(deleteParams).promise();
            }
        } 
            // OVERRIDES FOR TESTING
            if (event.AccessCode === '1234567890-Thrivo') {
                console.log('Override Code for AdminAdmin ...')
                newGroups = [...newGroups, 'AdminAdmin']
            }
        
    } catch (err) {
        console.log('ERROR occured in accessing keys table')
        console.log(err);
        console.log(JSON.stringify(err, null, 4));
        newGroups = []
    }
   
    try {
        console.log('Adding User to Users')
        await cisp.adminAddUserToGroup(groupParams).promise();
        //successGroups = [...successGroups, groupParams.GroupName]
    } catch (err) {
        console.log('ERROR occured in adding User to group User')
        console.log(err);
        console.log(JSON.stringify(err, null,4))
        failedGroups = [...successGroups, groupParams.GroupName]
    }
    
    
    for ( const groupName of newGroups) {
        const newGroupParam = {...groupParams, GroupName: groupName}
        try {
            console.log("Adding User to "+ groupName);
            await cisp.adminAddUserToGroup(newGroupParam).promise();
            successGroups = [...successGroups, groupName]
        } catch (err) {
            console.log('ERROR occured in adding User to group ' + groupName)
            console.log(err);
            console.log(JSON.stringify(err, null,4))
            if (err.code === "ResourceNotFoundException") {
                createGroupAndRetry = [...createGroupAndRetry, groupName];
            } else {
                failedGroups = [...failedGroups, groupName]
            }
        }
    } 
    
    // Creating Group and Adding to the new group
    for (const groupName of createGroupAndRetry) {
        const newGroupParam = {
            GroupName: groupName,
            UserPoolId: event.userPoolId,
            Precedence: 5,
            // RoleArn: 'STRING_VALUE'
        };
        try {
            console.log('Creating Group: ' + groupName);
            await cisp.createGroup(newGroupParam).promise();
        } catch (err) {
            console.log('ERROR occurred in creating Group: ' + groupName)
            console.log(err);
            console.log(JSON.stringify(err, null, 4))
            failedGroups = [...failedGroups, groupName]
            continue;
        }
        const newAddGroupParam = {...groupParams, GroupName: groupName}
        try {
            console.log('adding to new Group: ' + groupName);
            await cisp.adminAddUserToGroup(newAddGroupParam).promise();
            successGroups = [...successGroups, groupName]
        } catch (err) {
            console.log('ERROR occurred in adding to new Group: ' + groupName)
            console.log(err);
            console.log(JSON.stringify(err, null, 4))
            failedGroups = [...failedGroups, groupName]
        }
    }
    
    if (successGroups.length >= 1) {
        return { addedToAGroup: true, groups: successGroups}
    } else {
        return { addedToAGroup: false, groups: successGroups}
    }
    /*return {
        statusCode: 405,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  }, 
    //    body: JSON.stringify('Hello from Lambda!'),
        group: []
    };*/
};
