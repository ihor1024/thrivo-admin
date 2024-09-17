import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand, PutCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({ region: 'us-east-2'});
const docClient = DynamoDBDocumentClient.from(client, {
    marshallOptions: {
        removeUndefinedValues: true,
    }
});

const COLOR_TABLE = 'Color-w3l35a5lyvhzng5pschx2pphvq-dev';
const COLORLINE_TABLE = 'ColorLine-w3l35a5lyvhzng5pschx2pphvq-dev';

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
export const handler = async (event) => {
    const {
        colorSelections: selects = {},
        all: a = true,
    } = event;
    const all = true;
    const colorSelections = (!selects || selects === null) ? {} : selects;
    let colorLines = [];
    let colors = [];

    console.log(`EVENT: ${JSON.stringify(event)}`);

    const constructedColorLineFilterExpr = Object.keys(colorSelections).reduce((acc, companyKey, index) => {
        if (index === 0) {
            return `company = :company${index}`;
        }
        return `${acc} OR company = :company${index}`;
    }, '');

    const constructedColorLineExprAttrVals = Object.keys(colorSelections).reduce((acc, companyKey, index) => {
        acc[`:company${index}`] = companyKey;
        return acc;
    }, {});

    const scanColorLinesCommand = {
        TableName: COLORLINE_TABLE,
        FilterExpression: !all ? constructedColorLineFilterExpr : undefined,
        ExpressionAttributeValues: !all ? constructedColorLineExprAttrVals : undefined,
    };

    try {
        let data;
        const results = [];
        do {
            data = await docClient.send(new ScanCommand(scanColorLinesCommand));
            scanColorLinesCommand.ExclusiveStartKey = data.LastEvaluatedKey;
            if (data?.Items ?? false) {
                data.Items.forEach((item) => results.push(item));
            } else {
                throw new Error('No colorlines found or error in Fetching colorlines');
            }
        } while (typeof data.LastEvaluatedKey !== 'undefined');
        colorLines = results;
    } catch (err) {
        console.error(err);
        return {
            statusCode: 400,
            body: JSON.stringify(err)
        };
    }

    const setOfIds = colorLines.reduce((acc, curr) => {
        acc[curr.id] = true;
        if ((curr?.chilrenIds?.length ?? 0) > 0) {
            curr.chilrenIds.forEach((childId) => {
                acc[childId] = true;
            });
        }
        return acc;
    }, {});

    const constructedColorFilterExpr = Object.keys(setOfIds).reduce((acc, id, index) => {
        if (index === 0) {
            return `colorLineColorsId = :id${index}`;
        }
        return `${acc} OR colorLineColorsId = :id${index}`;
    }, '');
    const constructedColorExprAttrVals = Object.keys(setOfIds).reduce((acc, id, index) => {
        acc[`:id${index}`] = id;
        return acc;
    }, {});

    const scanColorsCommand = {
        TableName: COLOR_TABLE,
        FilterExpression: all ? undefined : constructedColorFilterExpr,
        ExpressionAttributeValues: all ? undefined : constructedColorExprAttrVals,
    };

    try {
        let data;
        const results = [];
        do {
            data = await docClient.send(new ScanCommand(scanColorsCommand));
            scanColorsCommand.ExclusiveStartKey = data.LastEvaluatedKey;
            if (data?.Items ?? false) {
                data.Items.forEach((item) => results.push(item));
            } else {
                throw new Error('No colors found or error in Fetching colors');
            }
        } while (typeof data.LastEvaluatedKey !== 'undefined');
        colors = results;
    } catch (err) {
        console.error(err);
        return {
            statusCode: 400,
            body: JSON.stringify(err)
        };
    }

    return {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      'Access-Control-Allow-Origin': '*',
    //      'Access-Control-Allow-Headers': '*'
    //  },
        body: JSON.stringify({ colors, colorLines }),
    };
};
