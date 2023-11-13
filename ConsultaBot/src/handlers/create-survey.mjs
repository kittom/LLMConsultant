export const createSurveyHandler = async (event) => {
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

    // console.info('Received:', event);
    let context, aims, surveyKey;

    try {
        // Parse the request body
        const body = JSON.parse(event.body);
        context = body.context;
        aims = body.aims;
        surveyKey = Math.random().toString(36).substring(2, 9);
    } catch (error) {
        // Handle JSON parsing error
        return {
            statusCode: 400, // Bad Request
            headers,
            body: JSON.stringify({ message: "Invalid request body" }),
        };
    }

    // Your business logic here...

    // Return the response with CORS headers
    return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ surveyUrl: `http://localhost:3000/survey/${surveyKey}` }),
    };
};
