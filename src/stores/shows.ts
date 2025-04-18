import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { getShows as getShowsService, searchShows as searchShowsService, getCast as getCastService, getShowImages, getShowDetails, type ShowsResponse, type Shows, type Image, type SearchReasult, type Show, type CastMember } from '@/services/tvmaze';

type ShowsState = {
  paginationHistory: ShowsResponse[];
  currentPage: ShowsResponse | null;
  pageIndex: number | null;
};

type ShowsBySingleGenre = {
  genre: string;
  page: number;
  shows: Shows;
  hasNextPage: boolean;
}

export const useTvMaze = defineStore('tvMaze', () => {
  const shows = ref<ShowsState>({
    paginationHistory: [],
    currentPage: null,
    pageIndex: null,
  });

  const searchResults = ref<{ data: SearchReasult[] } | null>(null);

  const showsByGenre = computed(() => {
    const results = shows.value.currentPage?.data.reduce((output: Record<string, Shows>, show) => {
      show.genres.forEach((genre: keyof typeof output) => {
        /**
         * In the absence of a recommendation engine or usable analytics,
         * I am randomly shuffling in each genre list to ensure that
         * a) Shows that appear in multiple genres appear in a different order
         * b) The order of shows is different on each page load
         */
        output[genre] = [...(output[genre] ?? []), show].sort(() => Math.random() - 0.5);
      });
      return output;
    }, {});

    const resultsArray = Object.keys(results ?? {}).map((key) => {
      return {
        genre: key,
        shows: results?.[key],
      };
    });

    return resultsArray;
  });

  const showDetails = ref<{ cast: CastMember[]; images: Image[]; show: Show; } | null>(null);
  const detailsBanner = ref<string | null>(null);

  const showImages = ref<Image[] | null>(null);

  const randomShowCast = ref<string[]>([]);
  const randomShowBanner = ref<string | null>(null);

  const randomShow = computed(() => {
    if (!shows.value.currentPage) return null;

    const randomIndex = Math.floor(Math.random() * (shows.value.currentPage?.data.length ?? 0));
    getCast(shows.value.currentPage?.data[randomIndex].id as number);
    getImages(shows.value.currentPage?.data[randomIndex].id as number)
    .then((images: Image[]) => {
      const banner = images.find((image: Image) => image.type === 'banner');
      randomShowBanner.value = banner?.resolutions?.original?.url ?? images[0].resolutions.original.url;
    });

    return shows.value.currentPage?.data[randomIndex];
  });

  const getShows = async (page?: number) => {
    const results = await getShowsService(page);
    shows.value.currentPage = results;
    shows.value.paginationHistory = [...shows.value.paginationHistory, results].sort((a, b) => a.page - b.page);
    shows.value.pageIndex = shows.value.paginationHistory.findIndex((show) => show.page === results.page);
    return results;
  };

  const searchShows = async (query: { [key: string]: string }) => {
    const results = await searchShowsService(query);
    searchResults.value = results as { data: SearchReasult[] };
    return results;
  };

  const getCast = async (id: number) => {
    const results = await getCastService(id);
    randomShowCast.value = results.map((cast) => cast.person.name);
    return results;
  }

  const getImages = async (id: number) => {
    const results = await getShowImages(id);
    showImages.value = results;
    return results;
  };

  const getDetails = async (id: number) => {
    detailsBanner.value = null;
    showDetails.value = null;
    const results = await getShowDetails(id);

    showDetails.value = { ...results, show: results.show as Show };
    detailsBanner.value = results.images.find((image: Image) => image.type === 'banner')?.resolutions?.original?.url ?? results.images[0].resolutions.original.url;
    return results;
  };

  const resetSearch = () => {
    searchResults.value = null;
  }

  const showsBySingleGenre = ref<ShowsBySingleGenre>({
    genre: '',
    page: 0,
    shows: [],
    hasNextPage: true,
  });
  const getMoreByGenre = async (genre: string) => {
    const capitalised = genre.replace(/\b\w/g, letter => letter.toUpperCase());

    if (showsBySingleGenre.value.genre !== capitalised) {
      showsBySingleGenre.value = {
        genre: capitalised,
        page: 0,
        shows: [],
        hasNextPage: true,
      };
    }

    if (!showsBySingleGenre.value.hasNextPage) return;

    const results = await getShowsService(showsBySingleGenre.value.page);
    const byGenre = results.data.filter((show) => show.genres.includes(capitalised));
    showsBySingleGenre.value.shows = [...showsBySingleGenre.value.shows, ...byGenre];
    showsBySingleGenre.value.hasNextPage = results.hasNextPage;
    if (results.hasNextPage) showsBySingleGenre.value.page += 1;

    return showsBySingleGenre.value;
  };

  return { shows, showsByGenre, randomShow, randomShowCast, searchResults, showDetails, showImages, randomShowBanner, detailsBanner, showsBySingleGenre, getMoreByGenre, getDetails, getCast, getShows, searchShows, resetSearch };
});
