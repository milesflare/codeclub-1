addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
  // Define an array of possible responses
  const responses = [
    'Gryffindor',
    'Slytherin',
    'Ravenclaw',
    'Hufflepuff',
  ]

  // Generate a random index using Math.random()
  const randomIndex = Math.floor(Math.random() * responses.length)

  // Return a response using the random index
  return new Response(responses[randomIndex])
}
