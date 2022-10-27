# Todolist React + Django based app

This project was built by React, Chakra UI, Effector JS, Apollo GraphQL Client for the frontend side and built by Django, MongoDB, Graphene for the backend side. I'm not deploy it to any of the cloud services, so there's no live demo from this app. Feel free to copy and modify for personal usage.

# Testing documentation

I was doing automated testing with [Playwright](https://playwright.dev/). Basically, it's just mimicking the user interaction to the app with the assumption that there's no todo list record in the database yet, so make sure to delete manually in the frontend app if there's any. I'm not including further automation like GiHub Actions workflow so there's still need for manually setup the backend, frontend, and running the testing script in each sub-project. I'm using Playwright autogenrate report for the documentation. You can see the document in `Playwright Test Report.pdf`. Even if the document looks like really technical with just including the source code, it's actually quite self-explanatory. The green ticks indicating success line of code (if there's a red cross, it's indicating failed or error line of code), the `click` and `fill` keyword is for imitate user interaction, and the `expect` keyword is for evaluating the expected value of specific component.

# My suggestion and recomendation

The provided app still using some tools that aren't production ready. For example, it still using SQLite and I'm changed it to [MongoDB](https://www.mongodb.com/). The app isn't supporting CORS out-of-the-box so I'm configure it manually. I'm also add and modify some QraphQL API for mutating the models because the provided one just including `add` and `delete` functionality. For the frontend app, I'm completely changed the whole code. I'm using pure react with Vite engine so it's much faster to serve the development server and build it to production. I'm also adding some moduel like state management library ([Effector JS](https://effector.dev/)) and [Chakra UI](https://chakra-ui.com/) component library for design customization and improve code robust-ness.
