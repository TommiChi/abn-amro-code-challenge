import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, type Mock } from 'vitest';
import SearchResults from '@/components/SearchResults.vue';
import { useTvMaze } from '@/stores/shows';

vi.mock('@/stores/shows', () => ({
  useTvMaze: vi.fn(),
}));

describe('SearchResults.vue', () => {
  it('renders search results when searchResults is available', () => {
    const mockResetSearch = vi.fn();
    const mockSearchResults = {
      data: [
        {
          show: {
            id: 1,
            name: 'Test Show',
            image: { medium: 'test-image.jpg' },
          },
        },
      ],
    };

    (useTvMaze as unknown as Mock).mockReturnValue({
      searchResults: mockSearchResults,
      resetSearch: mockResetSearch,
    });

    const wrapper = mount(SearchResults);

    expect(wrapper.find('h3').text()).toBe('Test Show');
    expect(wrapper.find('img').attributes('src')).toBe('test-image.jpg');
  });

  it('does not render anything when searchResults is null', () => {
    (useTvMaze as unknown as Mock).mockReturnValue({
      searchResults: null,
    });

    const wrapper = mount(SearchResults);

    expect(wrapper.html()).toBe('<!--v-if-->');
  });

  it('calls resetSearch when a result is clicked', async () => {
    const mockResetSearch = vi.fn();
    const mockSearchResults = {
      data: [
        {
          show: {
            id: 1,
            name: 'Test Show',
            image: { medium: 'test-image.jpg' },
          },
        },
      ],
    };

    (useTvMaze as unknown as Mock).mockReturnValue({
      searchResults: mockSearchResults,
      resetSearch: mockResetSearch,
    });

    const wrapper = mount(SearchResults);

    await wrapper.find('routerlink').trigger('click');

    expect(mockResetSearch).toHaveBeenCalled();
  });
});
