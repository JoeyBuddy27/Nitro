import { defineEventHandler, getQuery } from 'h3';

export default defineEventHandler(async (event: any) => {

const environment = process.env.CONTENT_ENV || 'development';

console.log('environment:', environment);

let useTestStack = false;
if (environment !== 'staging' && environment !== 'production') {
	useTestStack = true;
}

  // Get the dynamic parameter (uid) from the URL
  const contentType = event.context.params.content_type;
  const uid = event.context.params.uid;

  // TODO: If GraphQL query - use different details?
  const baseURL = process.env.CS_URL || 'https://cdn.contentstack.io/v3/content_types/';
  let apiKey = process.env.CONTENT_API_KEY || 'blt99dd26276e65134a';
    let accessToken =  process.env.CONTENT_DELIVERY_TOKEN || 'csf047343642ee40a51da55656';

if (useTestStack) {
	apiKey = 'blta9a7f7c81270e799';
	accessToken = 'cs3c9d485b4360e081ec41d015';
}

  const url = `${baseURL}${contentType}/entries?query={"uid":"${uid}"}`;


  try {
    const data = await $fetch(url, {
      headers: {
        'api_key': apiKey,
        'access_token': accessToken,
        'Content-Type': 'application/json'
      }
    });


    return data;
  } catch (error: any) {
    return {
      error: error.message
    };
  }
});
