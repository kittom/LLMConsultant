import axios from 'axios';
import React, { useState } from 'react'
import './App.css'

const Navbar = () => {
  return (
    <nav className='navbar'>
      {/* You can add your navigation items here */}
      <span>Home</span>
      <span>Open surveys</span>
      <span>Analytics</span>
    </nav>
  );
};


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
      <Navbar />
      <header className='App-Header'>
        <form onSubmit={handleSubmit} className='survey-form'>
          <label htmlFor='context-input'>Provide information about how what the context of this survey is...</label>
          <textarea 
            id="context-input"
            className='large-input'
            placeholder='Enter the context...'
            value={context}
            onChange={handleContextInputChange}
            required
          />
          
          <label htmlFor='aims-input'>Provide information about how what the aims of this survey are.</label>
          <textarea 
            id="aims-input"
            className='large-input'
            placeholder='Enter the aims...'
            value={aims}
            onChange={handleAimsInputChange}
            required
          />
          
          <button type='submit' className='large-button'>Start Survey</button>
        </form>
        {isLoading && <p>Survey is loading...</p>}
        {surveyUrl && <p>Survey URL: <a href={surveyUrl}>{surveyUrl}</a></p>}
      </header>
    </div>
  );
}

export default App;
