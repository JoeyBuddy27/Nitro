export const waitFor = (ms: any) => new Promise(r => setTimeout(r, ms));

export function buildLocationTag(data: any[]) {
	const locationArray = [];

	if (data.find(x => x.type === 'Destination')) {
		locationArray.unshift(data.find(x => x.type === 'Destination'));
	} else if (data.find(x => x.type === 'County / State')) {
		locationArray.unshift(data.find(x => x.type === 'County / State'));
	} else if (data.find(x => x.type === 'Region')) {
		locationArray.unshift(data.find(x => x.type === 'Region'));
	}

	if (data.find(x => x.type === 'Country')) {
		locationArray.push(data.find(x => x.type === 'Country'));
	}

	return locationArray.map(x => x.text).join(', ');
}