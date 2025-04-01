![alt text](public/svg/ABN-AMRO_Logo_new_colors.svg)
# Code Challenge

The purpose of this repository is to create TV Guide app in [Vue 3](https://vuejs.org/) for evaluation purposes by software engineering teams at ABN AMRO.

This repository has also been coupled to [Vercel](https://vercel.com/), and therefore is publicly accessible [here](https://abn-amro-code-challenge.vercel.app/).

## The Codebase

The tech stack chosen for the codebase is:
- Vue 3. The last Vue-related project I worked on was 3 years ago, when I built a Nuxt application where users can upload images, which get optimised and sized in multiple dimensions before getting sent to a CDN
- Pinia. State management
- Firebase Authentication service. In order to have a realistic experience, you will be required to log into the app using your Google account
- TV Maze API. This is the API used to get all the data that is consumed by the application
- Jest. Unit testing
- Playwright. E2E testing

## Things You Need to Know (Key Concepts)

### Authentication
The whole idea of introducing Google authentication is to demonstrate in a very basic way (in the router component) how client-side we can route a user based on whether they are authenicated or not

### Routing
I wanted the components to be as dumb as possible so that they could be reused in as many situations as possible. As a result, all data fetching, store updates, and other such business logic are done on the router level, while the route is being mounted. In a full blown project, I would probably have something like a BFF/middleware layer (either in the codebase or in the CMS) that would work in conjuction with the router to fetch the correct data