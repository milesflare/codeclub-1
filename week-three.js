addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // Make a subrequest to https://httpbin.org/get to get the headers
  const subrequest = await fetch("https://httpbin.org/get", {
    headers: request.headers
  });
  const headers = await subrequest.json();

  // Check if 'cf.client.bot' header is present
  if (headers['cf-client-bot']) {
    // Send request to https://electricjellyfish.org and return a 200 response
    const response = await fetch("https://electricjellyfish.org", {
      headers: request.headers
    });

    return new Response(response.body, {
      status: 200,
      headers: { 'content-type': 'application/json' }
    });
  } else {
    // Check if 'cf.bot_management.score' header is present
    if (headers['cf-bot-management-score']) {
      const score = parseFloat(headers['cf-bot-management-score']);

      // Check the value of 'cf.bot_management.score'
      if (score > 30) {
        // Send request to https://electricjellyfish.org and return a 200 response
        const response = await fetch("https://electricjellyfish.org", {
          headers: request.headers
        });

        return new Response(response.body, {
          status: 200,
          headers: { 'content-type': 'text/plain' }
        });
      } else {
        // Return a 401 response in application/json format
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: { 'content-type': 'application/json' }
        });
      }
    }
    else {
    return new Response(JSON.stringify({ error: 'Headers not present' }), {
        status: 401,
        headers: { 'content-type': 'application/json' }
      });
    }
  }
}

