![alt text](public/svg/ABN-AMRO_Logo_new_colors.svg)
# Code Challenge

The purpose of this repository is to create TV Guide app in [Vue 3](https://vuejs.org/) for evaluation purposes by software engineering teams at ABN AMRO.

This repository has also been coupled to [Vercel](https://vercel.com/), and therefore is publicly accessible at [https://abnflix.vercel.app](https://abnflix.vercel.app).

You can also run the application locally by:
- Checking out the repository
- Running `npm install`
- running `npm run dev`

/!\ PLEASE CHECK THE ["Using the App"](#using-the-app) SECTION BELOW BEFORE DIVING IN! /!\

## The Codebase

The tech stack chosen for the codebase is:
- Vue 3
- Pinia
- Firebase Authentication service. In order to have a realistic experience, you will be required to log into the app using your Google account
- TV Maze API. This is the API used to get all the data that is consumed by the application
- Jest. Unit testing
- Playwright. E2E testing

## Things You Need to Know (Core Concepts)

### App
The app itself contains the basic essential features:
- A (unauthenticated) homepage. Accessible to everyone. If you are already logged in, you will be automatically rediected to the show overview page
- A (unauthenticated) login page. Accessible to everyone. If you are already logged in, you will be automatically rediected to the show overview page
- A (authenticated) show overview page. The first time you enter the page you will be presented with a "fancy"
animated splash screen to keep the end user entertained while data is being fetched.
- A (authenticated) show detail page. Accessible via the overview page, or directly if you know the show ID
- A (authenticated) genre page. Accessible by selecting a specific genre from the overview page. This page contains an infiinite scroll feature, that will keep requesting new results until there are no more pages to request

- A search bar, that starts making your search as you type and displays the results in an overlay
- A genre selector that allows you to filter your view to display all the shows of one specific genre

### Authentication
The original implementation had was using Firebase Google authentication. I was subsequently informed that it would not be possible for ABN AMRO employees to login with a Google account. In order to maintain the flow of the application and not remove any features, Google auth was replaced with a fake login; you just need to click on the fake login link and you will be logged in (it's all moocked internally with custom cookies)

### Using the App
The first time you go to the home page you will be provided with a link to the login page:
- Click on the "Sign in" link
- In the login page, click on the "Fake User" link

After this you will be redirected to the main overview (/browse) page. Fron there you are welcome to click around and test the features of the app

Every subsequent visit (after login) to the "/" and "/login" routes will redirect you back to the "/browse" route

### Testing
The testing strategy is as follows:
- Unit tests: components, services and stores
- E2E (Playwright) tests: views and general interaction
- Accessibility: this is done in Playwright, in accessibilty.spec.ts . The "Axe" package is used in conjuction with Playwright

### CI/CD
For this project the CI/CD process is as simple as it gets; every push merge to the main branch kicks off a production build in Vercel. Creating a merge request also creates a "feature" build, that reflects the state of your feature branch.

### Commits
Every commit to the repository follows a conventional commit (+ some extra details) pattern. I have gotten into the habit as in past projects such naming conventions were used to automate the process of release notes, dermining what type of deployment (major/minor/patch) will be made, and which stakeholders to notify.