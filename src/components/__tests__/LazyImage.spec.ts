import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import LazyImage from '../LazyImage.vue';

describe('LazyImage.vue', () => {
  it('renders the image with the correct src and alt attributes', () => {
    const props = {
      src: 'test-image.jpg',
      alt: 'Test Image',
    };

    const wrapper = mount(LazyImage, {
      props,
    });

    const img = wrapper.find('img');
    expect(img.exists()).toBe(true);
    expect(img.attributes('src')).toBe(props.src);
    expect(img.attributes('alt')).toBe(props.alt);
  });

  it('sets the fallback image on error', async () => {
    const props = {
      src: 'test-image.jpg',
      alt: 'Test Image',
      fallback: 'fallback-image.jpg',
    };

    const wrapper = mount(LazyImage, {
      props,
    });

    const img = wrapper.find('img');
    await img.trigger('error');

    expect(img.attributes('src')).toBe(props.fallback);
  });

  it('emits an event when the image is loaded', async () => {
    const props = {
      src: 'test-image.jpg',
      alt: 'Test Image',
    };

    const wrapper = mount(LazyImage, {
      props,
    });

    const img = wrapper.find('img');
    await img.trigger('load');

    expect(wrapper.emitted('load')).toBeTruthy();
  });
});
