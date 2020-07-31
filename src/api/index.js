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
		const latest = await this._getFromURL('getlatest', options);
		for (const phone of latest) {
			if (phone.cpu) {
				const cpu = phone.cpu.match(/^(\S+)\s(.*)/) || [];
				phone.cpu = cpu[1] || phone.cpu;
				phone.cpuInfo = cpu[2] || null;
			}

			if (phone.os) {
				const os = phone.os.match(/^(\S+)\s(.*)/) || [];
				phone.os = os[1] || phone.os;
				phone.osInfo = os[2] || null;
			}
		}

		return latest;
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
