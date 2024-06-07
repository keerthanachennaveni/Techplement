import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import './App.css';

const App = () => {
  const [quote, setQuote] = useState(null);
  const [author, setAuthor] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const fetchRandomQuote = () => {
    Axios.get('http://localhost:3000/random')
      .then((response) => {
        setQuote(response.data);
      })
      .catch((error) => {
        console.error('Error fetching the quote', error);
      });
  };

  useEffect(() => {
    fetchRandomQuote();
  }, []);

  const handleSearch = () => {
    if (!author) {
      alert('Please enter an author name to search for quotes.');
      return;
    }
    
    Axios.get(`http://localhost:3000/search?author=${author}`)
      .then((response) => {
        const matchingQuotes = response.data;
        if (matchingQuotes.length > 0) {
          const randomIndex = Math.floor(Math.random() * matchingQuotes.length);
          setQuote(matchingQuotes[randomIndex]);
          setAuthor('');
        } 
        else {
          alert('No quotes found for the given author');
        }
      })
      .catch((error) => {
        console.error('Error searching for quotes', error);
      });
  };

  return (
    <div className="App">
      <h3>Quote of the Day</h3>
      {quote ? (
        <div>
          <p>{quote.quote}</p>
          <p><strong>{quote.author}</strong></p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <button onClick={fetchRandomQuote}>New Quote</button>

      <h3>Search Quotes by Author</h3>
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Enter author's name"
      />
      <button onClick={handleSearch}>Search</button>

      {searchResults.length > 0 && (
        <div>
          <h4>Search Results:</h4>
          <ul>
            {searchResults.map((result, index) => (
              <li key={index}>
                <p>{result.quote}</p>
                <p><strong>{result.author}</strong></p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
