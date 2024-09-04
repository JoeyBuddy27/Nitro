

// // import gql from 'graphql-tag';
// // import { print } from 'graphql/language/printer';
// // import contentClient from '../axios/contentStackAxios.js';
// // import contentGraphqlClient from '../axios/contentGraphqlAxios';
// // import longCache from '../cache/longCache';
// // import shortCache from '../cache';
// // import settingsClient from '../axios/settingsStackAxios';
// // import settingsStackAxiosGQL from '../axios/settingsStackAxiosGQL';
// // import { ApiGetResponse } from '~/interfaces/commonInterfaces';
// // import { SLOW_API_TIME_IN_MILLISECONDS, throwErrors } from '../sentry';
// // import { restructureObject } from '../functions/graphQlFunctions';


// const environment = process.env.SETTINGS_ENV || 'development';

// async function apiGetCS(
// 	url: string,
// 	res: Response,
// 	settingsStack = false,
// 	longCacheEnabled = false
// ) {
// 	// const cache = longCacheEnabled ? longCache : shortCache;
// 	// const cachedData = cache.get(url);

// 	if (
// 		// !cachedData ||
// 		process.env.NODE_ENV === 'development' ||
// 		['Beta', 'Alpha', 'Development'].includes(process.env.NUXT_ENV_GB_ENV || '')
// 	) {
// 		try {
// 			// const client = settingsStack ? settingsClient : contentClient;
//             // TODO: Import api keys and endpoints etc from settingsStackConfig.ts

// 			const startTime = performance.now();
// 			const pages = await client.get(url, {
// 				headers: {
// 					'Content-Type': 'application/json'
// 				}
// 			});
// 			const endTime = performance.now();

// 			if (endTime - startTime > SLOW_API_TIME_IN_MILLISECONDS) {
// 				if (environment !== 'production')
// 					console.error(`${url} took ${endTime - startTime} milliseconds`);
// 			}
// 			const { data, status }: ApiGetResponse = pages;

// 			cache.set(url, data);

// 			return res.status(status).json(data);
// 		} catch (err: any) {
//             console.error(err);
// 			let errorCode = 500;

// 			if (err?.response?.status) {
// 				errorCode = err.response.status;
// 			}

// 			return res.status(errorCode).json(err.response.data || {});
// 		}
// 	} else {
// 		return res.json(cachedData);
// 	}
// }

// async function apiPostCSSettings(AST: any, fullUrl: string, res: Response) {
// 	// const cachedData = shortCache.get(fullUrl);

// 	if (!cachedData) {
// 		try {
// 			// const qlQuery = print(AST);
// 			// const jsonQuery = JSON.stringify({ query: qlQuery });
// 			// const reducedQuery = jsonQuery.replace(/\s\s+/g, ' ');
// 			// const startTime = performance.now();
// 			// const sendRes = await settingsStackAxiosGQL.post(
// 			// 	`?environment=${process.env.SETTINGS_ENV || 'development'}`,
// 			// 	reducedQuery,
// 			// 	{
// 			// 		headers: {
// 			// 			'Content-Type': 'application/json'
// 			// 		}
// 			// 	}
// 			// );
// 			const endTime = performance.now();

// 			if (endTime - startTime > SLOW_API_TIME_IN_MILLISECONDS) {
// 				if (environment !== 'production')
// 					console.error(`${fullUrl} took ${endTime - startTime} milliseconds`);
// 			}

// 			const retData = restructureObject(sendRes.data)?.data?.[fullUrl]?.items;
// 			shortCache.set(fullUrl, retData);
// 			return res.json(retData);
// 		} catch (err: any) {
// 			let errorCode = 500;

// 			if (err?.response?.status) {
// 				errorCode = err.response.status;
// 			}

// 			return res.status(errorCode).json((err.response || {}).data || err);
// 		}
// 	} else {
// 		return res.json(cachedData);
// 	}
// }

// async function apiPost(AST: any, fullUrl: string, res: Response) {
// 	try {
// 		const qlQuery = print(AST);
// 		const jsonQuery = JSON.stringify({ query: qlQuery });
// 		const reducedQuery = jsonQuery.replace(/\s\s+/g, ' ');
// 		const startTime = performance.now();
// 		const sendRes = await contentGraphqlClient.post(
// 			`?environment=${process.env.CONTENT_ENV || 'development'}`,
// 			reducedQuery,
// 			{
// 				headers: {
// 					'Content-Type': 'application/json'
// 				}
// 			}
// 		);
// 		const endTime = performance.now();

// 		if (endTime - startTime > SLOW_API_TIME_IN_MILLISECONDS) {
// 			if (environment !== 'production')
// 				console.error(`${fullUrl} took ${endTime - startTime} milliseconds`);
// 		}

// 		if (20 - sendRes.headers['x-resolver-cost'] * 1 < 2) {
// 			console.log(
// 				`RESOLVER COST (${sendRes.headers['x-resolver-cost'] * 1}) IS CLOSE`,
// 				(((sendRes || {}).config || {}).data || '').slice(0, 70)
// 			);
// 		}

// 		if (7500 - sendRes.headers['x-query-complexity'] * 1 < 500) {
// 			console.log(
// 				`RATE LIMIT (${sendRes.headers['x-query-complexity'] * 1}) IS CLOSE`,
// 				(((sendRes || {}).config || {}).data || '').slice(0, 70)
// 			);
// 		}
// 		const retData = restructureObject(sendRes.data);

// 		return res.json(retData);
// 	} catch (err: any) {
// 		let errorCode = 500;

// 		if (err?.response?.status) {
// 			errorCode = err.response.status;
// 		}

// 		console.log((err.response || {}).data || err);
// 		return res.status(errorCode).json((err.response || {}).data || err);
// 	}
// }

// // e.g. /api/contentstack/content/tournament/entries?query={"url":"the-players-championship"}&include[]=media
// router.all('/contentstack/*', async (req: Request, res: Response) => {
// 	let lang = req.headers.lang || req.query.locale || req.query.lang;

// 	if (!lang) {
// 		console.error('NO LOCALE SET:', req.url);
// 		lang = 'en-gb';
// 	}

// 	let paramsIncluded = req.url?.includes('?');

// 	let url = req.url?.replace('/contentstack/', '') || '';

// 	let isSettingsStack = false;

// 	if (url.startsWith('settings/')) {
// 		isSettingsStack = true;
// 		url = url?.replace('settings/', '') || '';
// 	} else if (url.startsWith('content/')) {
// 		url = url?.replace('content/', '') || '';
// 	}

// 	// if (url.startsWith('GQL/') && req.body?.gql) {
// 	// 	const body = req.body.gql || '';
// 	// 	url = url?.replace('GQL/', '') || '';

// 	// 	const apiCall = isSettingsStack ? apiPostCSSettings : apiPost;

// 	// 	return await apiCall(
// 	// 		gql`
// 	// 			${body.replace('[LOCALE]', lang)}
// 	// 		`,
// 	// 		url,
// 	// 		res
// 	// 	);
// 	// }

// 	if (!req.query.locale) {
// 		url += `${paramsIncluded ? '&' : '?'}locale=${lang || 'en-gb'}`;
// 		paramsIncluded = true;
// 	}

// 	if (!req.query.environment) {
// 		url += `${paramsIncluded ? '&' : '?'}environment=${
// 			(isSettingsStack ? process.env.SETTINGS_ENV : process.env.CONTENT_ENV) ||
// 			'development'
// 		}`;
// 	}

// 	return await apiGetCS(url, res, isSettingsStack, isSettingsStack);
// });

// module.exports = router;
