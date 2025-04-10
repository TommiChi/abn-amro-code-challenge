import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import SearchBar from '../SearchBar.vue';

describe('SearchBar.vue', () => {
  it('renders an input field and a button', () => {
    const wrapper = mount(SearchBar);

    const input = wrapper.find('input');
    const button = wrapper.find('button');

    expect(input.exists()).toBe(true);
    expect(button.exists()).toBe(true);
  });

  it('binds the input value to the search query', async () => {
    const wrapper = mount(SearchBar);

    const input = wrapper.find('input');
    await input.setValue('test query');

    expect((wrapper.vm as unknown as { searchQuery: string }).searchQuery).toBe('test query');
  });

  it('emits a "search" event with the query when the button is clicked', async () => {
    const wrapper = mount(SearchBar);

    const input = wrapper.find('input');
    const button = wrapper.find('button');

    await input.setValue('test query');
    await button.trigger('click');

    expect(wrapper.emitted('search')).toBeTruthy();
    expect(wrapper.emitted('search')?.[0]).toEqual(['test query']);
  });

  it('clears the input field after emitting the search event', async () => {
    const wrapper = mount(SearchBar);

    const input = wrapper.find('input');
    const button = wrapper.find('button');

    await input.setValue('test query');
    await button.trigger('click');

    expect((wrapper.vm as unknown as { searchQuery: string }  ).searchQuery).toBe('');
    expect(input.element.value).toBe('');
  });
});
