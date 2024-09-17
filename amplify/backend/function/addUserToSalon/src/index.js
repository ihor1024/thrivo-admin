import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, GetCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({ region: 'us-east-2'});
const docClient = DynamoDBDocumentClient.from(client, {
    marshallOptions: {
        removeUndefinedValues: true,
    }
});

const SALON_TABLE = 'Salon-w3l35a5lyvhzng5pschx2pphvq-dev';
const USER_TABLE = 'User-w3l35a5lyvhzng5pschx2pphvq-dev';

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
export const handler = async (event) => {
    console.log(`EVENT: ${JSON.stringify(event)}`);

    const {
        salonId,
        userId,
        preferences,
    } = event;

    let salonObj = {};
    let userObj = {};
    let isSalon = false;
    let isUser = false;

    const getSalonCommand = new GetCommand({
        TableName: SALON_TABLE,
        Key: {
            id: salonId,
        },
    });

    const getUserCommand = new GetCommand({
        TableName: USER_TABLE,
        Key: {
            id: userId,
        },
    });

    try {
        const salonData = await docClient.send(getSalonCommand);
        const userData = await docClient.send(getUserCommand);
        console.log(`Salon DATA: ${JSON.stringify(salonData)}`);
        console.log(`User DATA: ${JSON.stringify(userData)}`);
        if (salonData && salonData.Item) {
            salonObj = salonData.Item;
            isSalon = true;
        }
        if (userData && userData.Item) {
            userObj = userData.Item;
            isUser = true;
        }
    } catch (err) {
        console.log(`FETCH ERROR: ${err}`);
    }

    if (!isSalon || !isUser) {
        return {
            statusCode: 400,
            body: JSON.stringify('Invalid Salon or User Id'),
        };
    }
    const nd = new Date();

    const updateCommand = new UpdateCommand({
        TableName: USER_TABLE,
        Key: {
            id: userId,
        },
        UpdateExpression: 'SET tenantClaims = :tenantClaims, preferences = :preferences, #version = :v, #lastChangedAt = :t, salonUsersId = :sid, updatedAt = :updatedAt, #s = :status',
        ExpressionAttributeNames: {
            '#version': '_version',
            '#lastChangedAt': '_lastChangedAt',
            '#s': 'status',
        },
        ExpressionAttributeValues: {
            ':tenantClaims': [...(salonObj?.defaultSalonGroups ?? [])],
            ':preferences': { ...(userObj?.preferences ?? {}), ...preferences },
            ':v': (userObj?._version ?? 0) + 1,
            ':t': nd.getTime(),
            ':sid': salonId,
            ':updatedAt': nd.toISOString(),
            ':status': 'ACCESS',
        }
    });

    let didUpdate = false;
    const updateUser = {
        ...userObj,
        tenantClaims: [...(salonObj?.defaultSalonGroups ?? [])],
        preferences: { ...(userObj?.preferences ?? {}), ...preferences },
        _version: (userObj?._version ?? 0) + 1,
        _lastChangedAt: nd.getTime(),
        salonUsersId: salonId,
        updatedAt: nd.toISOString(),
        status: 'ACCESS',
    };

    try {
        const data = await docClient.send(updateCommand);
        console.log(`UPDATE DATA: ${JSON.stringify(data)}`);
        if ((data?.$metadata?.httpStatusCode ?? 0) === 200) {
            didUpdate = true;
        }
    } catch (err) {
        console.log(`UPDATE ERROR: ${err}`);
    }

    if (!didUpdate) {
        return {
            statusCode: 400,
            body: JSON.stringify('Failed to update user'),
        };
    }

    return {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      'Access-Control-Allow-Origin': '*',
    //      'Access-Control-Allow-Headers': '*'
    //  },
        body: JSON.stringify(updateUser),
    };
};
