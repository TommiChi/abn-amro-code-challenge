import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { mount } from '@vue/test-utils';
import BackButton from '../BackButton.vue';
import { useRouter } from 'vue-router';

vi.mock('vue-router', () => ({
  useRouter: vi.fn(),
}));

describe('BackButton.vue', () => {
  let routerMock: any;

  beforeEach(() => {
    routerMock = {
      options: {
        history: {
          state: {
            back: '/previous-page',
          },
        },
      },
      back: vi.fn(),
      push: vi.fn(),
    };

    (useRouter as Mock).mockReturnValue(routerMock);
    vi.clearAllMocks();
  });

  it('renders the back button', () => {
    const wrapper = mount(BackButton);
    const button = wrapper.find('button');
    expect(button.exists()).toBe(true);
    expect(button.text()).toContain('BACK');
  });

  it('calls router.back() when backUrl is available', async () => {
    const wrapper = mount(BackButton);
    const button = wrapper.find('button');

    await button.trigger('click');
    expect(routerMock.back).toHaveBeenCalled();
    expect(routerMock.push).not.toHaveBeenCalled();
  });

  it('calls router.push(fallbackUrl) when backUrl is not available', async () => {
    routerMock.options.history.state.back = null; // Simulate no back URL
    const wrapper = mount(BackButton);
    const button = wrapper.find('button');

    await button.trigger('click');
    expect(routerMock.push).toHaveBeenCalledWith('/browse');
    expect(routerMock.back).not.toHaveBeenCalled();
  });
});
