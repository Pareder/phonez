import API from '../../api';

const url = 'url.com';

describe('API', () => {
	beforeAll(() => {
		global.fetch = jest.fn(() =>
			Promise.resolve({
				json: () => Promise.resolve([{
					DeviceName: 'device',
					cpu: 'Octa-core (some info about cpu)',
					os: 'OS (some info about OS)'
				}])
			})
		);
	});

	describe('createFrom static method', () => {
		it('Should return an instance of API', () => {
			expect(API.createFrom()).toBeInstanceOf(API);
		});
	});

	describe('getLatest method', () => {
		it('Should call fetch with correct parameters', async () => {
			await new API(url).getLatest();

			expect(fetch).toBeCalledWith(`https://${url}/getlatest`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: expect.any(String)
			});
		});

		it('Should return correct result', async () => {
			const result = await new API(url).getLatest();

			expect(result).toEqual([{
				DeviceName: 'device',
				cpu: 'Octa-core',
				cpuInfo: '(some info about cpu)',
				os: 'OS',
				osInfo: '(some info about OS)'
			}]);
		});
	});

	describe('getDevice method', () => {
		it('Should call fetch with correct parameters', async () => {
			await new API(url).getDevice();

			expect(fetch).toBeCalledWith(`https://${url}/getdevice`, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				},
				body: expect.any(String)
			});
		});
	});
});
