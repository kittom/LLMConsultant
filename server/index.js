const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const OpenAi = require('openai')

// setup express server
const app = express();

app.use(cors());
app.use(bodyParser.json());

const openai = new OpenAi

// Placeholder for storing surveys in memory
const surveys = {};


app.post('/create-survey', (req, res) => {
    const { context, aims } = req.body;
    // Generate a unique key for the survey
    const surveyKey = Math.random().toString(36).substr(2,9);
    initialQuestion(context, aims)
    .then( new_question => {
        surveys[surveyKey] = {context, aims, questions : [new_question]};

        // send back the URL to access the survey
        res.json({surveyUrl: `http://localhost:3001/survey/${surveyKey}`});
    })

});

app.get('/survey/:key', (req, res) => {
    const survey = surveys[req.params.key];
    if (survey) {
        res.json({context: survey.context, aims: survey.aims, questions:survey.questions});
    } else {
        res.status(404).send('Survey not found');
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))



// AI question Maker
async function initialQuestion(context, aims) {
    const completion = await openai.chat.completions.create({
      messages: [
          { role: "system", content: "You will ask a question based on the context and aims provided" },
          {role: "system", content: `context: ${context}`},
          {role: "system", content: `aims: ${aims}`},
          {role: "system", content:"make the question personal to the person you are speaking to. It is a confidential 1 on 1 discussion"},
      ],
      model: "gpt-3.5-turbo",
    });
  
    console.log(completion.choices[0]["message"]["content"]);
    return completion.choices[0]["message"]["content"]
  }

