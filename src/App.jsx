import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [data, setData] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/test')
      .then(response => setData(response.data.message))
      .catch(error => console.error(error));
  }, []);

  return (
    <>
      <h2>Welcome to PulseVote</h2>
      <p>{data}</p>
    </>
  )
}

export default App