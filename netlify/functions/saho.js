
/* ============================================================
   SOUTH AFRICAN HISTORY ONLINE API PROXY
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

        const params = new URLSearchParams();

        params.set("page[limit]", "50");
        params.set("sort", "-created");

        const offset = Number(
            event.queryStringParameters?.offset || 0
        );

        if (!Number.isInteger(offset) || offset < 0) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({
                    error: "Invalid pagination offset"
                })
            };
        }

        params.set("page[offset]", String(offset));

        const apiURL =
            `https://sahistory.org.za/jsonapi/node/article?${params.toString()}`;

        const response = await fetch(apiURL, {
    headers: {
        "Accept": "application/vnd.api+json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36",
        "Referer": "https://sahistory.org.za/"
    }
});

        if (!response.ok) {
            throw new Error(
                `SAHO returned status ${response.status}`
            );
        }

        const data = await response.json();

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(data)
        };

    } catch (error) {

        console.error("SAHO proxy error:", error);

        return {
            statusCode: 502,
            headers,
            body: JSON.stringify({
                error: "Unable to retrieve stories from South African History Online."
            })
        };

    }

};
