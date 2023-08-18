import API from '../../api';

const url = 'url.com';

const PHONE = {
  phone_name: 'device',
  slug: 'slug',
};

describe('API', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockReturnValue({
      json: () => ({
        data: {
          phones: [PHONE],
        },
      }),
    });
  });

  describe('create static method', () => {
    it('Should return an instance of API', () => {
      expect(API.create()).toBeInstanceOf(API);
    });
  });

  describe('getLatest method', () => {
    it('Should call fetch with correct parameters', async () => {
      await new API(url).getLatest();

      expect(fetch).toBeCalledWith(`${url}/latest`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
    });

    it('Should return correct result', async () => {
      const result = await new API(url).getLatest();

      expect(result).toEqual([PHONE]);
    });
  });

  describe('getDevice method', () => {
    it('Should call fetch with correct parameters', async () => {
      const slug = 'slug';

      await new API(url).getDevice(slug);

      expect(fetch).toBeCalledWith(`${url}/${slug}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
    });
  });
});
