![alt text](public/svg/ABN-AMRO_Logo_new_colors.svg)
# Code Challenge

The purpose of this repository is to create TV Guide app in [Vue 3](https://vuejs.org/) for evaluation purposes by software engineering teams at ABN AMRO.

This repository has also been coupled to [Vercel](https://vercel.com/), and therefore is publicly accessible [here](https://abn-amro-code-challenge.vercel.app/).

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
The whole idea of introducing Google authentication is to demonstrate in a very basic way (in the router component) how client-side we can route a user based on whether they are authenicated or not
