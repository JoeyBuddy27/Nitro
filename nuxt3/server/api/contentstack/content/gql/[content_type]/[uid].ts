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

    let apiKey = process.env.CONTENT_API_KEY || 'blt99dd26276e65134a';
    let accessToken = process.env.CONTENT_DELIVERY_TOKEN || 'csf047343642ee40a51da55656';

    if (useTestStack) {
        apiKey = 'blta9a7f7c81270e799';
        accessToken = 'cs3c9d485b4360e081ec41d015';
    }

    //   example
    // https://graphql.contentstack.com/stacks/blt95a0a7afb9613f51?
    // environment=production&query=
    // {all_product(where: {title: Galaxy Note}) { items { title description } } }
    const baseURL = `${
        process.env.CS_GRAPHQL_URL || 'https://graphql.contentstack.com/stacks/'
    }${apiKey}`;

    // TODO: Need to pass environment?

    //   TODO: Needs to be a POST requst?
    const body = await readBody(event);
    //   const body = event.body;
    console.log('body:', body);

    const url = `${baseURL}?environment=${environment}&query={all_${contentType}(where: {uid: "${uid}"}) { items ${body} } }`;
    //   const url = `${baseURL}?environment=${environment}&query=${body}`;
    const method = event.method;
    console.log('method:', method);

    try {
        const res: any = await $fetch(url, {
            headers: {
                api_key: apiKey,
                access_token: accessToken,
                'Content-Type': 'application/graphql',
            },
        });

        console.log('res:', res);

        return res?.data?.[`all_${contentType}`]?.items?.[0] || {};
    } catch (error: any) {
        return {
            error: error.message,
        };
    }
});
