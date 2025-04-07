import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import WithLogoHeader from '../WithLogoHeader.vue';

describe('WithLogoHeader.vue', () => {
  it('renders the component with only text content', () => {
    const wrapper = mount(WithLogoHeader, {
      slots: {
        default: 'I only have text content, no markup',
      },
    });

    expect(wrapper.html()).toContain('I only have text content, no markup');
  });

  it('ensures content is correctly injected into the slot', () => {
    const wrapper = mount(WithLogoHeader, {
      slots: {
        default: '<div><span>Injected Slot Content</span></div>',
      },
    });

    expect(wrapper.html()).toContain('<span>Injected Slot Content</span>');
  });
});
