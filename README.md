# The Address Book

The app is deployed on Vercel and can be viewed at `https://kanban-clone-vert.vercel.app/` - [Demo](https://kanban-clone-vert.vercel.app/)

## Demo

https://user-images.githubusercontent.com/16633104/197829071-46df1909-8f2c-4f08-8e0e-1450a3d8a071.mp4


## Run the App locally (Development Server)

To run the app locally - once you clone the app, `cd` into the app directory and run `npm i`.

To start the app, run `npm run start` and you should be able to access the app on `localhost:3000`.

## Product Overview

1. All the CRUD operations for the single workspace tasks are possible. You can Create, Edit, Update and Delete the tasks.
2. The data is persistent in localstorage. When the user visits the app first time, the data is seeded from a local file (included). After that all the changes to the data are read and stored in local storage.
3. Option to use Dark / Light modes.

## Architecture

The app is bootstrapped using Create React App since it comes with handy tooling setup and the app does not require SSR.

For styling purposes, Chakra UI component library is used since it provided beautiful, reusable components and is inspired by TailwindCSS. All Chakra components provide flexibility to add CSS properties through its props.

For Drag and Drop feature, `react-beautiful-dnd` library is used which is built on top of drag and drop DOM API, but provides the necessary consistency and gives handy utilities.

To replicate a server api behavior, a mock REST server is setup using `mockServiceWorker` which makes it easy to replicate the real behavior.

Due to the lack of time, currently an `ErrorBoundary` is added to the app that takes care of all the UI related as well as Async errors. This helps to avoid white screen of death and allows a way for the app to recover gracefully.

## Improvements / Features to add in later versions

- [ ] Improve the app robustness by adding tests.
- [ ] Improve Modal UI and add functionality to add tags and categories.
- [ ] Dynamic list of users from some third party API
- [ ] Make different Workspaces workable
