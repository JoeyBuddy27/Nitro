import {waitFor} from '../../../helpers/utility';
import dayjs from 'dayjs';
import { defineEventHandler, getQuery, readBody } from 'h3';

let enAuthToken = {};
let usAuthToken = {};


const environment = process.env.CONTENT_ENV || 'development';
let gettingToken = false;

function getLangAuthToken(lang: string) {
	if (lang === 'en-gb') {
		return enAuthToken;
	} else {
		return usAuthToken;
	}
}

const enterpriseBaseURL = process.env.ENTERPRISE_URL || 'https://beta-api-sarazen.golfbreaks.com/enterprise';

async function apiGet(url: string, res: any, lang: string, forceReAuth = false) {
	if (!lang) {
		return res.status(406);
	}

	await setAuthToken(lang, forceReAuth);
    // TODO: Set type?
	const tokenResponse: any = getLangAuthToken(lang);

	try {
		const startTime = performance.now();

		// const getRes = await enterpriseClient.get(url, {
		// 	headers: {
		// 		Accept: 'application/json',
		// 		Authorization: `${tokenResponse.type} ${tokenResponse.token}`
		// 	}
		// });
        const getRes: any = await $fetch(`${enterpriseBaseURL}${url}`, {
            headers: {
                Accept: 'application/json',
                Authorization: `${tokenResponse.type} ${tokenResponse.token}`
            }
        });

		const endTime = performance.now();

        // TODO: Add Sentry
		// if (endTime - startTime > SLOW_API_TIME_IN_MILLISECONDS) {
		// 	if (environment !== 'production')
		// 		console.error(`${url} took ${endTime - startTime} milliseconds`);
		// }

		const data = getRes.data;

		return res.json(data);
	} catch (err: any) {
		if (!url.includes('CanBookOnline') && !url.includes('SearchByEmail')) {
            console.error(err);
			// throwErrors(err);
		}

		let errorCode = 500;
		if ((err.response || {}).status) {
			errorCode = err.response.status;
		}

		// if a 401 error code is returned then reauthenticate the API once only
		if (errorCode === 401 && !forceReAuth) {
			return await apiGet(url, res, lang, true);
		}

		return res.status(errorCode).json((err.response || {}).data || err);
	}
}

async function setAuthToken(lang: string, forceReAuth = false) {
	const tokenResponse: any = getLangAuthToken(lang);
	let updateToken: any = {};

	let time = 0;
	// 100 = 10 seconds
	while (gettingToken && 100 > time) {
		await waitFor(100);
		time++;
	}

	// if now -300 seconds is greater then authToken expires at (created date + expiresIn time)
	if (
		forceReAuth ||
		tokenResponse.lang !== lang ||
		!tokenResponse.expiresAt ||
		!tokenResponse.token ||
		!tokenResponse.type ||
		!dayjs().add(300, 'seconds').isBefore(tokenResponse.expiresAt)
	) {
		gettingToken = true;

		const data: any = {
			clientId: 'sOTToqphcGpEkAiwteK8AWWo',
			clientSecret: 'RKAsuhQadcxDCYPYX3NY5yVG8hZXFUVxRrtD3wPrqRwSRqHCtc',
			scope: 'enterprise-api'
		};

		if (lang === 'en-us') {
			data.userName = 'phoenix-usa';
			data.password = '4Tht8tGTJZ5AbsRu';
		} else if (lang === 'en-gb') {
			data.userName = 'saxon-uk';
			data.password = 'QF6G8S8976XBfukc';
		} else if (lang === 'sv-se' || lang === 'no-no' || lang === 'da-dk') {
			data.userName = 'viking-scandi';
			data.password = 'MYXwqM4ex6Nhaw8A';
		}

		// const url = `/api/System/Login?clientId=${data.clientId}&clientSecret=${data.clientSecret}&userName=${data.userName}&password=${data.password}&scope=${data.scope}`;
		const url = `/api/System/Token`;

		try {
			const startTime = performance.now();

			const sendRes: any = await $fetch(`${enterpriseBaseURL}${url}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

			const endTime = performance.now();

			// if (endTime - startTime > SLOW_API_TIME_IN_MILLISECONDS) {
			// 	if (environment !== 'production')
			// 		console.error(`${url} took ${endTime - startTime} milliseconds`);
			// }
			updateToken = sendRes.data;
			updateToken.expiresAt = dayjs().add(updateToken.expiresIn, 'seconds');
			updateToken.lang = lang;
		} catch (err) {
			updateToken = { type: false, token: false, expiresAt: false };
			gettingToken = false;

			// throwErrors(err);
            console.error(err);
			return err;
		}

		if (lang === 'en-gb') {
			enAuthToken = updateToken;
		} else {
			usAuthToken = updateToken;
		}

		gettingToken = false;
	}

	return;
}

// export async function searchByEmail(req: Request, res: Response) {
//     const url = `/api/Experience/Client/SearchByEmail?emailAddress=${req.query.emailAddress}`;
//     return await apiGet(url, res, req.headers.lang || req.query.lang);
// }

export default defineEventHandler(async (req, res) => {
    const { lang} = getQuery(req);
    const { url } = req;
    if (url.includes('SearchByEmail')) {
        const { emailAddress } = getQuery(req);
        const url = `/api/Experience/Client/SearchByEmail?emailAddress=${emailAddress}`;
        return await apiGet(url, res, lang);
    }
    return res.status(404).json({ message: 'Not Found' });
});