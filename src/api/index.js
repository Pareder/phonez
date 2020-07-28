import url from 'url';

class API {
	constructor(url) {
		this._url = url;
	}

	static createFrom() {
		return new API('fonoapi.freshpixl.com/v1');
	}

	/**
	 * @param {{
	 *   brand: string,
	 *   limit: number
	 * }} 														[options]
	 * @returns {Promise<any>}
	 */
	async getLatest(options) {
		return await this._getFromURL('getlatest', options);
	}

	/**
	 * @param {{
	 *   brand: string,
	 *   device: string,
	 *   position: number
	 * }} 														[options]
	 * @returns {Promise<any>}
	 */
	async getDevice(options) {
		return await this._getFromURL('getdevice', options);
	}

	/**
	 * @param {string} 								pathname
	 * @param {object|undefined} 			body
	 * @returns {Promise<any>}
	 * @private
	 */
	async _getFromURL(pathname, body = {}) {
		const response = await fetch(url.format({
			hostname: this._url,
			protocol: 'https',
			pathname
		}), {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				...body,
				token: process.env.REACT_APP_API_TOKEN
			})
		});
		return await response.json();
	}
}

export default API;
