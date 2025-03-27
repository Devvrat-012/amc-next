import https from "https";
process.env.NODE_TLS_REJECT_UNAUTHORIZED;
const agent = new https.Agent({
  rejectUnauthorized: false,
});

async function proxyRequest(request, paramsPromise) {
  console.log(request, paramsPromise);
  try {
    const { slug: pathSegments = [] } = await paramsPromise;

    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    const targetUrl = `${baseUrl}/${pathSegments.join("/")}${
      new URL(request.url).search
    }`;

    const headers = new Headers(request.headers);
    headers.set("host", process.env.NEXT_PUBLIC_API_BASE);

    const init = {
      method: request.method,
      headers,
      body: ["GET", "HEAD"].includes(request.method)
        ? null
        : await request.text(),
      agent,
    };

    const response = await fetch(targetUrl, init);
    if (!response.ok) {
      const contentType = response.headers.get("content-type");
      let errorMessage;

      if (contentType && contentType.includes("application/json")) {
        errorMessage = await response.json(); // Parse JSON response
      } else {
        errorMessage = { error: await response.text() }; // Treat as plain text
      }

      return new Response(
        JSON.stringify(errorMessage), // Always return a proper JSON object
        {
          status: response.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const newHeaders = new Headers(response.headers);
    newHeaders.delete("content-encoding");
    if (!newHeaders.has("Content-Type")) {
      newHeaders.set("Content-Type", "application/json");
    }

    return new Response(response.body, {
      status: response.status,
      headers: newHeaders,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function GET(request, context) {
  return proxyRequest(request, context.params);
}

export async function POST(request, context) {
  return proxyRequest(request, context.params);
}

export async function PUT(request, context) {
  return proxyRequest(request, context.params);
}

export async function DELETE(request, context) {
  return proxyRequest(request, context.params);
}

export async function PATCH(request, context) {
  return proxyRequest(request, context.params);
}
