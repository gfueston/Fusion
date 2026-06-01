const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Max-Age": "86400",
}

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      ...corsHeaders,
    },
  })
}

export default {
  async fetch(request) {
    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: 204,
        headers: corsHeaders,
      })
    }

    const url = new URL(request.url)

    try {
      if (request.method === "GET" && url.pathname === "/health") {
        return json({ ok: true, service: "fusion-api" })
      }

      if (request.method === "POST" && url.pathname === "/auth/register") {
        const payload = await request.json()
        return json({
          success: true,
          message: "User registered",
          user: { email: payload.email ?? null }
        })
      }

      if (request.method === "POST" && url.pathname === "/auth/login") {
        const payload = await request.json()
        return json({
          success: true,
          token: "demo-token",
          user: { email: payload.email ?? null }
        })
      }

      if (request.method === "POST" && url.pathname === "/ingest") {
        const payload = await request.json()
        return json({
          success: true,
          received: payload
        })
      }

      if (request.method === "GET" && url.pathname === "/leads") {
        return json([
          { id: "L-1024", title: "Cross-border transfer cluster", priority: "high" },
          { id: "L-1025", title: "Port facility anomaly", priority: "medium" }
        ])
      }

      return json({ error: "Not found", path: url.pathname }, 404)
    } catch (error) {
      return json({ error: "Worker exception", detail: String(error) }, 500)
    }
  },
}
