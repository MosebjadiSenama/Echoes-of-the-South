
/* ============================================================
   SOUTH AFRICAN HISTORY ONLINE TIMELINE API PROXY
============================================================ */

exports.handler = async function (event) {

    const headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Content-Type": "application/json"
    };

    /* Handle browser preflight requests */

    if (event.httpMethod === "OPTIONS") {
        return {
            statusCode: 200,
            headers,
            body: ""
        };
    }

    /* Only allow GET requests */

    if (event.httpMethod !== "GET") {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({
                error: "Method not allowed"
            })
        };
    }

    try {

        /* Get the requested timeline decade */

        const decade = event.queryStringParameters?.decade || "1960";

        if (!/^\d{4}$/.test(decade) || Number(decade) % 10 !== 0) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({
                    error: "Invalid decade"
                })
            };
        }

        /* Request events from SAHO */

        const apiURL =
            `https://sahistory.org.za/api/timeline/v2/events/${decade}`;

        const response = await fetch(apiURL, {
            headers: {
                "Accept": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`SAHO returned status ${response.status}`);
        }

        const data = await response.json();

        /* Return the timeline events */

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(data)
        };

    } catch (error) {

        console.error("SAHO timeline proxy error:", error);

        return {
            statusCode: 502,
            headers,
            body: JSON.stringify({
    error: "Unable to retrieve historical events from South African History Online.",
    details: error.message
})
        };

    }

};
