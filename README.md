# First Test

Repo has a React app, and a server.

### TODO:
- connect to mongo database.
- make the UI prettier.
- Create pages for when survey is opened.

## Setup Open AI api on Mac

- Create an api key on the open ai website.
- edit the ~/.zshrc file

```zsh
nano ~/.zshrc
```

- add a line for your api key:

```zsh
export OPENAI_API_KEY='your-api-key-here'
```

## Start the server

Go into the server directory and start the server:

```zsh
cd server/
node index.js
```

## Start the react app

Go into the survey-app directory and run npm start

```zsh
cd survey-app
npm start
```
