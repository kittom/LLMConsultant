import axios from 'axios';
import React, { useState } from 'react'

function App() {
  const [context, setContext] = useState('');
  const [aims, setAims] = useState('');
  const [surveyUrl, setSurveyUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false); // State to track loading status

  const handleContextInputChange = (e) => {
    setContext(e.target.value);
  };

  const handleAimsInputChange = (e) => {
    setAims(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log('submitted', { context, aims })
    e.preventDefault();
    setIsLoading(true); // Set loading to true before the request is made
    axios.post('http://localhost:3001/create-survey', { context, aims })
      .then(response => {
        // Handle the response from the server
        setSurveyUrl(response.data.surveyUrl);
        console.log(response.data.surveyUrl);
        setIsLoading(false); // Set loading to false after the request is completed
      })
      .catch(error => {
        // Handle any errors from the server
        console.log('There was an error creating the survey', error);
        setIsLoading(false); // Set loading to false if the request fails
      });
  };

  return (
    <div className='App'>
      <header className='App-Header'>
        <form onSubmit={handleSubmit}>
          <label htmlFor='context-input'>Describe the context of this survey:</label>
          <input 
          id="context-input"
          type='text'
          value={context}
          onChange={handleContextInputChange}
          required
          />
          <br/>
          <label htmlFor='aims-input'>Describe the aims of this survey:</label>
          <input 
          id="aims-input"
          type='text'
          value={aims}
          onChange={handleAimsInputChange}
          required
          />
          <button type='submit'>Submit</button>
        </form>
        {isLoading && <p>Loading survey URL...</p>} {/* Loading text displayed during request */}
        {surveyUrl && <p>Survey URL: <a href={surveyUrl}>{surveyUrl}</a></p>}
      </header>
    </div>
  )
}

export default App;
