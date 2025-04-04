import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { getShows as getShowsService, searchShows as searchShowsService, type ShowsResponse } from '@/services/tvmaze';

type ShowsState = {
  paginationHistory: ShowsResponse[];
  pageData: ShowsResponse | null;
  pageIndex: number | null;
};

type SearchState = any;

export const useTvMaze = defineStore('tvMaze', () => {
  const shows = ref<ShowsState>({
    paginationHistory: [],
    pageData: null,
    pageIndex: null,
  });

  const searchResults = ref<SearchState>(null);

  const getShows = async (page?: number) => {
    const results = await getShowsService(page);
    shows.value.pageData = results;
    shows.value.paginationHistory = [...shows.value.paginationHistory, results].sort((a, b) => a.page - b.page);
    shows.value.pageIndex = shows.value.paginationHistory.findIndex((show) => show.page === results.page);
  };

  const searchShows = async (query: string) => {
    const results = await searchShowsService(query);
    searchResults.value = results;
  };

  return { shows, searchResults, getShows, searchShows };
});
