import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useTvMaze } from '@/stores/shows';
import { getShows as getShowsService, searchShows as searchShowsService } from '@/services/tvmaze';

vi.mock('@/services/tvmaze', () => ({
  getShows: vi.fn(),
  searchShows: vi.fn(),
}));

describe('shows.ts', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  it('fetches and stores a list of shows', async () => {
    const mockShowsResponse = {
      data: [
        { id: 1, name: 'Show 1', genres: ['Drama'] },
        { id: 2, name: 'Show 2', genres: ['Comedy'] },
      ],
      page: 1,
      hasNextPage: true,
    };
    (getShowsService as Mock).mockResolvedValueOnce(mockShowsResponse);

    const store = useTvMaze();
    const result = await store.getShows(1);

    expect(getShowsService).toHaveBeenCalledWith(1);
    expect(store.shows.currentPage).toEqual(mockShowsResponse);
    expect(store.shows.paginationHistory).toContainEqual(mockShowsResponse);
    expect(result).toEqual(mockShowsResponse);
  });

  it('searches for shows and stores the results', async () => {
    const mockSearchResults = {
      data: [
        { score: 1, show: { id: 1, name: 'Search Result 1' } },
        { score: 0.9, show: { id: 2, name: 'Search Result 2' } },
      ],
    };
    (searchShowsService as Mock).mockResolvedValueOnce(mockSearchResults);

    const store = useTvMaze();
    const result = await store.searchShows({ q: 'test' });

    expect(searchShowsService).toHaveBeenCalledWith({ q: 'test' });
    expect(store.searchResults).toEqual(mockSearchResults);
    expect(result).toEqual(mockSearchResults);
  });

  it('computes shows grouped by genre', async () => {
    const mockShowsResponse = {
      data: [
        { id: 1, name: 'Show 1', genres: ['Drama', 'Action'] },
        { id: 2, name: 'Show 2', genres: ['Comedy'] },
        { id: 3, name: 'Show 3', genres: ['Drama'] },
      ],
      page: 1,
      hasNextPage: true,
    };
    (getShowsService as Mock).mockResolvedValueOnce(mockShowsResponse);

    const store = useTvMaze();
    await store.getShows(1);

    const showsByGenre = store.showsByGenre;

    expect(showsByGenre).toEqual([
      { genre: 'Drama', shows: expect.any(Array) },
      { genre: 'Action', shows: expect.any(Array) },
      { genre: 'Comedy', shows: expect.any(Array) },
    ]);
    expect(showsByGenre.find((g) => g.genre === 'Drama')?.shows).toHaveLength(2);
    expect(showsByGenre.find((g) => g.genre === 'Action')?.shows).toHaveLength(1);
    expect(showsByGenre.find((g) => g.genre === 'Comedy')?.shows).toHaveLength(1);
  });
});
