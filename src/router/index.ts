import { createRouter, createWebHistory, type RouteLocationNormalized } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import NotFound from '../views/NotFoundView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: '/browse',
      name: 'browse',
      component: () => import('@/views/OverviewView.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/browse/:genre',
      name: 'browseByGenre',
      component: () => import('@/views/GenreView.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/shows/:id',
      name: 'details',
      component: () => import('@/views/ShowDetailsView.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        requiresAuth: false,
      },
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/:pathMatch(.*)*', // This matches any path that hasn't been matched above
      name: 'NotFound',
      component: NotFound,
      meta: {
        requiresAuth: false,
      },
    },
  ],
});

router.beforeEach(async (to: RouteLocationNormalized, _, next) => {
  const requiresAuth = to.matched.some((record) => {
    return record.meta.requiresAuth;
  });

  const cookieList = document.cookie.split('; ');
  const isLoggedIn = !!cookieList.find((cookie) => cookie === 'abnFlixUser=FakeUser');

  if (requiresAuth) {
    if (!isLoggedIn) {
      next('/login');
    } else {
      next();
    }
  } else if (['/', '/login'].includes(to.path) && isLoggedIn) {
    next('/browse');
  } else {
    next();
  }
});

export default router;
