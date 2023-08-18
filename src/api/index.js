class API {
	constructor(url) {
		this._url = url;
	}

	static create() {
		return new API(process.env.REACT_APP_BACKEND_URL);
	}

	async getLatest() {
		const latest = await this._getFromURL('latest');
		return latest?.data?.phones || [];
	}

	async getLatestByBrand(brand) {
		const latest = await this._getFromURL(`brands/${brand}`);
		return latest?.data?.phones || [];
	}

	async getDevice(slug) {
		return await this._getFromURL(slug);
	}

	async getBrands() {
		return await this._getFromURL('brands');
	}

	async _getFromURL(pathname) {
		const url = [
			this._url.replace(/\/+$/, ''),
			pathname.replace(/^\/+/, ''),
		].join('/');
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		});
		return await response.json();
	}
}

export default API;
