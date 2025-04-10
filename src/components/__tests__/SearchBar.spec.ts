import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import SearchBar from '../SearchBar.vue';
import { useTvMaze } from '@/stores/shows';

let showsStoreMock: ReturnType<typeof useTvMaze>;

vi.mock('@/stores/shows', () => ({
  useTvMaze: vi.fn(() => showsStoreMock),
}));

describe('SearchBar.vue', () => {
  beforeEach(() => {
    showsStoreMock = {
      searchShows: vi.fn(),
      resetSearch: vi.fn(),
    } as unknown as ReturnType<typeof useTvMaze>;
    vi.clearAllMocks();
  });

  it('renders the search input', () => {
    const wrapper = mount(SearchBar);
    const input = wrapper.find('input[type="text"]');
    expect(input.exists()).toBe(true);
    expect(input.attributes('placeholder')).toBe('Search for a show...');
  });

  it('calls debouncedSearch when typing in the input', async () => {
    vi.useFakeTimers();
    const wrapper = mount(SearchBar);
    const input = wrapper.find('input[type="text"]');

    await input.setValue('test query');

    vi.advanceTimersByTime(500);
    expect(showsStoreMock.searchShows).toHaveBeenCalledWith({ q: 'test query' });
    vi.useRealTimers();
  });

  it('calls resetSearch when the input is cleared', async () => {
    vi.useFakeTimers();
    const wrapper = mount(SearchBar);
    const input = wrapper.find('input[type="text"]');

    await input.setValue('test query');
    vi.advanceTimersByTime(500);
    expect(showsStoreMock.searchShows).toHaveBeenCalledWith({ q: 'test query' });

    await input.setValue('');
    vi.advanceTimersByTime(500);
    expect(showsStoreMock.resetSearch).toHaveBeenCalled();
    vi.useRealTimers();
  });

  it('does not call searchShows or resetSearch immediately when typing', async () => {
    vi.useFakeTimers();
    const wrapper = mount(SearchBar);
    const input = wrapper.find('input[type="text"]');

    await input.setValue('test');
    vi.advanceTimersByTime(300);

    expect(showsStoreMock.searchShows).not.toHaveBeenCalled();
    expect(showsStoreMock.resetSearch).not.toHaveBeenCalled();
    vi.useRealTimers();
  });
});
