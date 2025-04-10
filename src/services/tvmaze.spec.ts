import { describe, it, expect, vi, beforeEach, type Mock, afterEach } from 'vitest';
import {
  getShows,
  searchShows,
  getCast,
  getShowDetails,
  getShowImages,
} from './tvmaze';

global.fetch = vi.fn();

const mockFetch = (data: any) => {
  // console.warn('@mock fetch:\n', data);
  (fetch as Mock).mockResolvedValueOnce({
    json: vi.fn().mockResolvedValueOnce(data),
  });
};

describe('tvmaze.ts', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // vi.resetAllMocks();
  });

  // afterEach(() => {
  //   vi.clearAllMocks();
  //   vi.resetAllMocks();
  // });

  it('fetches a list of shows with pagination', async () => {
    const mockShows = [{ id: 1, name: 'Show 1' }, { id: 2, name: 'Show 2' }];
    mockFetch(mockShows);

    const result = await getShows(1);

    expect(fetch).toHaveBeenCalledWith('https://api.tvmaze.com/shows?page=1', { method: 'GET' });
    expect(result.data).toEqual(mockShows);
    expect(result.page).toBe(1);
  });

  it('searches for shows based on a query', async () => {
    const mockSearchResults = [{ score: 1, show: { id: 1, name: 'Search Result' } }];
    mockFetch(mockSearchResults);

    const result = await searchShows({ q: 'test' });

    expect(fetch).toHaveBeenCalledWith('https://api.tvmaze.com/search/shows?q=test', { method: 'GET' });
    expect(result.data).toEqual(mockSearchResults);
  });

  it('fetches the cast of a show', async () => {
    const mockCast = [{ person: { id: 1, name: 'Actor 1' }, character: { id: 1, name: 'Character 1' } }];
    mockFetch(mockCast);

    const result = await getCast(1);

    expect(fetch).toHaveBeenCalledWith('https://api.tvmaze.com/shows/1/cast', { method: 'GET' });
    expect(result).toEqual(mockCast);
  });
});
