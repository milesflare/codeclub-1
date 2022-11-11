export default {
	fetch(request) {
			if(request.method === 'POST') {
					return new Response('Hello worker!', {
							headers: {
									'content-type': 'application/json',
							},
					});
			}
			else{
					return new Response('Error Worker!', {
							headers: {
									'content-type': 'text/plain',
							},
					});
			}
	},
};

