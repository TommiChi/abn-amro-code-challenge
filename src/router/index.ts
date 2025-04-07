import { createRouter, createWebHistory, type RouteLocationNormalized } from 'vue-router';
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import HomeView from '../views/HomeView.vue';
import NotFound from '../views/NotFoundView.vue';

const firebaseConfig = {
  apiKey: "AIzaSyApavUqR6DH4c96Es63CeOz4OizYDT8FhM",
  authDomain: "abn-amro-code-challenge-51ac2.firebaseapp.com",
  projectId: "abn-amro-code-challenge-51ac2",
  storageBucket: "abn-amro-code-challenge-51ac2.firebasestorage.app",
  messagingSenderId: "85973761352",
  appId: "1:85973761352:web:dc2e3ea1e61317a5ff877d",
  measurementId: "G-Q1PCF6TQX4"
};

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

router.beforeEach(async (to: RouteLocationNormalized, from, next) => {
  initializeApp(firebaseConfig);
  const auth = getAuth();
  const requiresAuth = to.matched.some((record) => {
    return record.meta.requiresAuth;
  });

  const user: User | null = await new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      resolve(user);
    });
  });

  if (requiresAuth) {
    if (!user) {
      next('/login');
    } else {
      next();
    }
  } else if (['/', '/login'].includes(to.path) && user) {
    next('/browse');
  } else {
    next();
  }
});

export default router;
