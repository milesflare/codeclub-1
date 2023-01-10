addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // Make a subrequest to httpbin.org to fetch headers
  const subRequest = new Request('https://httpbin.org/get', {
    headers: request.headers
  })
  const subResponse = await fetch(subRequest)
  const headers = await subResponse.json()

  // Get the X-Known-Bot and X-Bot-Score headers
  const knownBotHeader = headers.headers['X-Known-Bot']
  const botScoreHeader = headers.headers['X-Bot-Score']

  // Check if the X-Known-Bot header is present
  if (knownBotHeader) {
    // Send the request to electricjellyfish.org and return a 200 response with application/json content type
    const response = await fetch('https://electricjellyfish.org')
    return new Response(response.body, {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    })
  } else {
    // Check if the X-Bot-Score header is present
    if (botScoreHeader) {
      // Evaluate the bot score
      if (botScoreHeader > 30) {
        // Send the request to electricjellyfish.org and return a 200 response with plain text content type
        const response = await fetch('https://electricjellyfish.org')
        return new Response(response.body, {
          status: 200,
          headers: { 'Content-Type': 'text/plain' }
        })
      } else {
        // Return a 401 response with application/json content type
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        })
      }
    } else {
      // If neither header is present, send request directly to electricjellyfish.org
      return await fetch('https://electricjellyfish.org')
    }
  }
}

