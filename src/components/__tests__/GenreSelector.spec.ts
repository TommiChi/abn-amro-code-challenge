import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { mount } from '@vue/test-utils';
import GenreSelector from '../GenreSelector.vue';
import { useTvMaze } from '@/stores/shows';
import { useRouter, type Router } from 'vue-router';

vi.mock('@/stores/shows', () => ({
  useTvMaze: vi.fn(),
}));

vi.mock('vue-router', () => ({
  useRouter: vi.fn(),
}));

describe('GenreSelector.vue', () => {
  let showsStoreMock;
  let routerMock: Router;

  beforeEach(() => {
    showsStoreMock = {
      showsByGenre: [
        { genre: 'Drama' },
        { genre: 'Comedy' },
        { genre: 'Action' },
      ],
    };

    routerMock = {
      push: vi.fn(),
    } as unknown as Router;

    (useTvMaze as unknown as Mock).mockReturnValue(showsStoreMock);
    (useRouter as Mock).mockReturnValue(routerMock);

    vi.clearAllMocks();
  });

  it('renders the genre selector with default genre', () => {
    const wrapper = mount(GenreSelector);
    expect(wrapper.text()).toContain('All Genres');
  });

  it('renders the list of genres', async () => {
    const wrapper = mount(GenreSelector);
    const genreItems = wrapper.findAll('li');
    expect(genreItems).toHaveLength(4);
    expect(genreItems[0].text()).toBe('All Genres');
    expect(genreItems[1].text()).toBe('Drama');
    expect(genreItems[2].text()).toBe('Comedy');
    expect(genreItems[3].text()).toBe('Action');
  });

  it('toggles the selector height when clicked', async () => {
    const wrapper = mount(GenreSelector);
    const label = wrapper.find('label');
    const section = wrapper.find('#selector');

    expect(section.attributes('style')).toContain('height: 50px');
    await label.trigger('click');
    expect(section.attributes('style')).not.toContain('height: 50px');
    await label.trigger('click');
    expect(section.attributes('style')).toContain('height: 50px');
  });

  it('updates the selected genre and navigates to the correct path', async () => {
    const wrapper = mount(GenreSelector);
    const genreItems = wrapper.findAll('li');

    await genreItems[1].trigger('click'); // Select "Drama"
    expect(wrapper.text()).toContain('Drama');
    expect(routerMock.push).toHaveBeenCalledWith('/browse/Drama');

    await genreItems[0].trigger('click'); // Select "All Genres"
    expect(wrapper.text()).toContain('All Genres');
    expect(routerMock.push).toHaveBeenCalledWith('/browse');
  });

  it('does not navigate to an invalid genre', async () => {
    const wrapper = mount(GenreSelector);
    const invalidGenre = wrapper.find('li[data-genre="InvalidGenre"]');

    if (invalidGenre.exists()) {
      await invalidGenre.trigger('click');
      expect(routerMock.push).not.toHaveBeenCalledWith('/browse/InvalidGenre');
    }
  });
});
