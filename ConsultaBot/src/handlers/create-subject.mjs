import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

// connect to DynamoDB table
const tableName = process.env.SUBJECT_TABLE

export const createSubjectHandler = async (event) => {
    // CORS headers
    const headers = {
        "Access-Control-Allow-Origin": "*", // Adjust this to be more restrictive in production
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "OPTIONS,POST"
    };

    // Handle OPTIONS request for CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ message: "CORS preflight" }),
        };
    }

    // Check if the HTTP method is POST
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405, // Method Not Allowed
            headers,
            body: JSON.stringify({ message: `createSurvey only accepts POST Method, you tried ${event.httpMethod}` }),
        };
    }

    let context, aims, subjectKey;

    try {
    //     // Parse the request body
        const body = JSON.parse(event.body);
        context = body.context;
        aims = body.aims;
    //     // surveyKey = body.id
        subjectKey = Math.random().toString(36).substring(2, 9);
    } catch (error) {
        // Handle JSON parsing error
        return {
            statusCode: 400, // Bad Request
            headers,
            body: JSON.stringify({ message: "Invalid request body" }),
        };
    }
    var params = {
        TableName: tableName,
        Item: {id : subjectKey, context: context}
    }

    // // Send data to database
    console.log("Flag 1")
    try {
        console.log(tableName)
        const data = await ddbDocClient.send(new PutCommand(params));
        console.log('SUCCESS ===>>>', data);
    } catch (error) {
        // console.log("FLag 2")
        console.log('ERROR ===>>>', error);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify("Error in connecting to Database")
        }
    }
    console.log("Flag 4")
    // Return the response with CORS headers
    return {
        statusCode: 200,
        body: JSON.stringify({ surveyUrl: `http://localhost:3000/survey/${subjectKey}` }),
    };
};