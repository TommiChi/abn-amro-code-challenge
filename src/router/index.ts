import { createRouter, createWebHistory, type RouteLocationNormalized } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import { getAuth, onAuthStateChanged, type User } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

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
      path: '/dashboard',
      name: 'dashboard',
      component: HomeView,
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
      component: () => import('@/views/Login.vue'),
    },
  ],
});

router.beforeEach(async (to: RouteLocationNormalized, from, next) => {
  initializeApp(firebaseConfig);
  const auth = getAuth();
  const requiresAuth = to.matched.some((record) => {
    console.warn('/!\\ RECORD:\n', record);
    return record.meta.requiresAuth;
  });

  next();
  if (requiresAuth) {
    // Check if the user is authenticated
    const user: User | null = await new Promise((resolve) => {
      onAuthStateChanged(auth, (user) => {
        resolve(user);
      });
    });

    if (!user) {
      // User is not logged in, redirect to login
      next('/login');
    } else {
      // User is logged in, proceed to the route
      next();
    }
  } else {
    // Route does not require authentication, proceed
    next();
  }
});

export default router;
