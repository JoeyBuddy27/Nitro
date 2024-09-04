// server/api/contentstack/[uid].ts

import { defineEventHandler, getQuery } from 'h3';

// Define the API endpoint
export default defineEventHandler(async (event: any) => {
  // Get the dynamic parameter (uid) from the URL
  const contentType = event.context.params.content_type;
  const uid = event.context.params.uid;

  // Extract query parameters if needed
  const query = getQuery(event);

  console.log('contentType:', contentType);
  console.log('uid:', uid);
  
  // Environment variables
  const baseURL = process.env.CS_URL || 'https://cdn.contentstack.io/v3/content_types/';
  const apiKey = process.env.SETTINGS_API_KEY || 'blt1b4cc4528c37036e';
  const accessToken = process.env.SETTINGS_DELIVERY_TOKEN || 'cs9f0ab0109acaa3121097b3e7';

  // Construct the URL to fetch data
  // const queryString = JSON.stringify({
  //   query: {
  //     uid: uid // Match uid field to the value of `uid` from the URL
  //   }
  // });

  const url = `${baseURL}${contentType}/entries?query={"uid":"${uid}"}`;


  console.log('url:', url);

  // example settings/product_descriptions/entries/bltb62a676d46d581ad


  try {
    // Fetch data from Contentstack using $fetch
    const data = await $fetch(url, {
      headers: {
        'api_key': apiKey,
        'access_token': accessToken,
        'Content-Type': 'application/json'
      }
    });

    console.log('fetched data:', data);

    // Return the fetched data
    return data;
  } catch (error: any) {
    // Return error message if something goes wrong
    return {
      error: error.message
    };
  }
});
