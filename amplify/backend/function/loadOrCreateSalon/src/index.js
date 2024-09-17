/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand, PutCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { v1 } from "uuid";

const client = new DynamoDBClient({ region: 'us-east-2'});
const docClient = DynamoDBDocumentClient.from(client, {
    marshallOptions: {
        removeUndefinedValues: true,
    }
});

const SALON_TABLE = 'Salon-w3l35a5lyvhzng5pschx2pphvq-dev';

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
export const handler = async (event) => {
    const {
        placeId,
        addressObj,
        type,
        name,
        salonPreferences,
        onlyLoad = false,
    } = event;

    console.log(`EVENT: ${JSON.stringify(event)}`);

    const getCommand = new ScanCommand({
        TableName: SALON_TABLE,
        FilterExpression: 'placeId = :placeId',
        ExpressionAttributeValues: {
            ':placeId': placeId,
        },
    });

    let salonObj = {};
    let didFind = false;
    try {
        const data = await docClient.send(getCommand);
        console.log(`DATA: ${JSON.stringify(data)}`);
        if (data && data.Items && data.Items.length > 0) {
            salonObj = data.Items[0];
            didFind = true;
        } else {
            throw new Error('Unknown Salon by PlaceId');
        }
    } catch (err) {
        console.log(`ERROR: ${err}`);
        // We should try to create an entry for this new salon
    }

    if (!didFind && !onlyLoad) {
        const sobj = {
            id: v1(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            owner: 'd2459932-c0f5-47a3-8981-a3cd17fe7172::d2459932-c0f5-47a3-8981-a3cd17fe7172',
            __typename: 'Salon',
            _lastChangedAt: new Date().getTime(),
            _version: 1,

            defaultSalonAdminGroups: [name.replace(/ /g,"_")+'::Admins'],
            defaultSalonGroups: [name.replace(/ /g,"_")+'::Users'],

            placeId,
            name,
            type,
            
            location: {
                address1: addressObj.address1,
                address2: addressObj.address2,
                locality: addressObj.locality,
                region: addressObj.region,
                postalCode: addressObj.postalCode,
                country: addressObj.country,
                raw: addressObj,
            },
            phone: addressObj?.phone ?? '',
            privileges: {},
            shipping: {},
            preferences: salonPreferences,
        };

        const createSalonCommand = new PutCommand({
            TableName: SALON_TABLE,
            Item: sobj
        });
        try {
            const data = await docClient.send(createSalonCommand);
            console.log(`CREATION DATA: ${JSON.stringify(data)}`);
            if ((data?.$metadata?.httpStatusCode ?? 0) === 200) {
                salonObj = sobj;
                didFind = true;
            } else {
                throw new Error('Could not create Salon :/');
            }
        } catch (err) {
            console.log(`ERROR: ${err}`);
        }
    } else if (!onlyLoad && salonPreferences && JSON.stringify(salonPreferences) !== '{}') {
        // update salonPreferences
        if ((salonPreferences?.colorlines ?? false) && JSON.stringify(salonPreferences.colorlines) !== '{}') {
            // Derp
        } else {
            salonPreferences.colorlines = (salonObj.preferences?.colorlines ?? false) ? {...salonObj.preferences.colorlines} : undefined
        }
        const nd = new Date();
        const cmdObj = {
            TableName: SALON_TABLE,
            Key: {
                id: salonObj.id,
            },
            UpdateExpression: 'set preferences = :preferences, updatedAt = :updatedAt, #version = :v, #lastChangedAt = :t',
            ExpressionAttributeNames: {
                '#version': '_version',
                '#lastChangedAt': '_lastChangedAt',
            },
            ExpressionAttributeValues: {
                ':preferences': {...salonObj.preferences, ...salonPreferences},
                ':updatedAt': nd.toISOString(),
                ':v': salonObj._version + 1,
                ':t': nd.getTime(),
            },
            ReturnValues: 'UPDATED_NEW',
        };
        try {
            const data = await docClient.send(new UpdateCommand(cmdObj));
            console.log(`UPDATE DATA: ${JSON.stringify(data)}`);
            if ((data?.$metadata?.httpStatusCode ?? 0) === 200) {
                salonObj.preferences = salonPreferences;
                salonObj._version += 1;
                salonObj._lastChangedAt = nd.getTime();
                salonObj.updatedAt = nd.toISOString();
            } else {
                throw new Error('Could not update Salon :/');
            }
        } catch (err) {
            console.log(`ERROR: ${err}`);
        }
    }

    if (!didFind) {
        return {
            body: 'Could not find or create salon',
            statusCode: 500,
        };
    }

    return {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
        body: JSON.stringify(salonObj),
    };
};
