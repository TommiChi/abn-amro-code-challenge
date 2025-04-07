interface Link {
  href: string;
};

interface NamedLink extends Link {
  name: string;
};

type TvMazeApiCall = {
  endpoint: string;
  query?: {
    [key: string]: string | number | boolean;
  };
};

type ApiCache = {
  [key: string]: {
    value: Shows;
    timestamp: number;
  }
};

type Country = {
  name: string;
  code: string;
  timezone: string;
};

type Network = {
  id: number;
  name: string;
  country: Country | null;
  officialSite: string | null;
};

type Schedule = {
  time: string;
  days: string[];
};

type Rating = {
  average: number | null;
};

type Externals = {
  tvrage: number | null;
  thetvdb: number | null;
  imdb: string | null;
};

type Image = {
  medium: string;
  original: string;
};

type Links = {
  self: Link;
  previousepisode?: NamedLink | null;
};

export type Show = {
  id: number;
  url: string;
  name: string;
  type: string;
  language: string;
  genres: string[];
  status: string;
  runtime: number | null;
  averageRuntime: number | null;
  premiered: string | null;
  ended: string | null;
  officialSite: string | null;
  schedule: Schedule;
  rating: Rating;
  weight: number;
  network: Network | null;
  webChannel: Network | null;
  dvdCountry: Country | null;
  externals: Externals;
  image: Image | null;
  summary: string | null;
  updated: number;
  _links: Links;
}

export type Shows = Show[];

export type ShowsResponse = {
  data: Shows;
  page: number;
  hasNextPage: boolean;
};

const BASE_URL = 'https://api.tvmaze.com';

const apiCache: ApiCache = {};

async function tvMazeApiCall({ endpoint, query }: TvMazeApiCall): Promise<Shows> {
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

export const searchShows = async (query: { [key: string]: string }) => {
  const data = await tvMazeApiCall({
    endpoint: 'search/shows',
    query,
  });

  return { data };
};

export const getCast = async (id: number) => {
  const results = await tvMazeApiCall({
    endpoint: `shows/${id}/cast`,
  });

  return results;
}

export const getShowDetails = async (id: number) => {
  const cast = await getCast(id);
  const images = await getShowImages(id);
  const show = await tvMazeApiCall({
    endpoint: `shows/${id}`,
  });

  return { cast, images, show };
};

export const getShowImages = async (id: number) => {
  const results = await tvMazeApiCall({
    endpoint: `shows/${id}/images`,
  });

  return results;
}

