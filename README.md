![alt text](public/svg/ABN-AMRO_Logo_new_colors.svg)
# Code Challenge

The purpose of this repository is to create TV Guide app in [Vue 3](https://vuejs.org/) for evaluation purposes by software engineering teams at ABN AMRO.

This repository has also been coupled to [Vercel](https://vercel.com/), and therefore is publicly accessible at [https://abnflix.vercel.app](https://abnflix.vercel.app).

## The Codebase

The tech stack chosen for the codebase is:
- Vue 3
- Pinia
- Firebase Authentication service. In order to have a realistic experience, you will be required to log into the app using your Google account
- TV Maze API. This is the API used to get all the data that is consumed by the application
- Jest. Unit testing
- Playwright. E2E testing

## Things You Need to Know (Core Concepts)

### Authentication
The whole idea of introducing Google authentication is to demonstrate in a very basic way (in the router component) how client-side we can route a user based on whether they are authenicated or not. You may log in with any Google account.

### Testing
The tests present are there to illustrate what types of tests I would be running for such and application, and not necessarily to have 100% test coverage.

### App
The app itself contains the basic essential features:
- A (unauthenticated) homepage. Accessible to everyone. If you are already logged in, you will be automatically rediected to the show overview page
- A (unauthenticated) login page. Accessible to everyone. If you are already logged in, you will be automatically rediected to the show overview page
- A (authenticated) show overview page. The first time you enter the page you will be presented with a "fancy"
animated splash screen to keep the end user entertained while data is being fetched.
- A (authenticated) show detail page. Accessible via the overview page, or directly if you know the show ID
- A search bar, that starts making your search as you type and displays the results in an overlay