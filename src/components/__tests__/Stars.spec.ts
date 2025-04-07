import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Stars from '@/components/Stars.vue';

describe('Stars.vue', () => {
  it('renders 5 stars', () => {
    const wrapper = mount(Stars, {
      props: {
        rating: 0,
      },
    });

    const stars = wrapper.findAll('[data-test="star"]');
    expect(stars.length).toBe(5);
  });

  it('fills the correct number of stars based on the rating', () => {
    const wrapper = mount(Stars, {
      props: {
        rating: 8, // Rounded to 4 stars
      },
    });

    const stars = wrapper.findAll('[data-test="star"]');
    stars.forEach((star, index) => {
      if (index < 4) {
        expect(star.attributes('fill')).toBe('#f0e40c'); // Filled star
      } else {
        expect(star.attributes('fill')).toBe('#d2d5da'); // Empty star
      }
    });
  });

  it('fills the correct number of stars even when ratings are not whole numbers', () => {
    const wrapper = mount(Stars, {
      props: {
        rating: 6.7, // Rounded to 3 stars
      },
    });

    const stars = wrapper.findAll('[data-test="star"]');
    stars.forEach((star, index) => {
      if (index < 3) {
        expect(star.attributes('fill')).toBe('#f0e40c'); // Filled star
      } else {
        expect(star.attributes('fill')).toBe('#d2d5da'); // Empty star
      }
    });
  });

  it('handles null or 0 rating gracefully', () => {
    const wrapper = mount(Stars, {
      props: {
        rating: null,
      },
    });

    const stars = wrapper.findAll('[data-test="star"]');
    stars.forEach((star) => {
      expect(star.attributes('fill')).toBe('#d2d5da'); // All stars empty
    });
  });
});
