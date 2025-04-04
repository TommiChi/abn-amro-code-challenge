type TvMazeApiCall = {
  endpoint: string;
  query?: {
    [key: string]: string | number | boolean;
  };
};

type Result = {
  [key: string]: { [key: string]: string | number | boolean | Result } | (string | number | boolean)[] | string | number | boolean;
};

type Results = Result[];

type ApiCache = {
  [key: string]: {
    value: Results;
    timestamp: number;
  }
}

export type ShowsResponse = {
  data: Results;
  page: number;
  hasNextPage: boolean;
};

const BASE_URL = 'https://api.tvmaze.com';

const apiCache: ApiCache = {};

async function tvMazeApiCall({ endpoint, query }: TvMazeApiCall): Promise<Results> {
  const queryString = !query ? '' : `?${Object.entries(query).map(([key, value]) => `${key}=${value}`).join('&')}`;
  const url = `${BASE_URL}/${endpoint}${queryString}`;

  if (apiCache[url]) {
    return apiCache[url].value;
  }

  const response = await fetch(url, {
    method: 'GET',
  });

  const data = await response.json();

  apiCache[url] = {
    value: data,
    timestamp: performance.now(),
  };

  return data;
}

export const getShows = async (page?: number): Promise<ShowsResponse> => {
  const validPage = Math.max(0, page ?? 0);

  const results = await tvMazeApiCall({
    endpoint: 'shows',
    query: {
      page: validPage,
    },
  });

  /**
   * Since I have implemented basic caching for the API calls,
   * I don't mind making this extra call to check if there is a next page.
   * This is a bit of a hack, but it works for now.
   */
  const nextPageResults = await tvMazeApiCall({
    endpoint: 'shows',
    query: {
      page: validPage,
    },
  })

  return {
    data: results,
    page: validPage,
    hasNextPage: nextPageResults.length > 0,
  }
};

export const searchShows = async (query: string) => {};