const express = require('express');
const app = express();
const quotesJSON = require('./QuoteSource.json');
const port = 3000;
const quoteslength = quotesJSON.length;

app.get('/random', (req, res) => {
  const randomQuoteIndex = Math.floor(Math.random() * quoteslength);
  res.send(quotesJSON[randomQuoteIndex]);
});

app.get('/search', (req, res) => {
  const author = req.query.author;
  if (!author) {
    return res.status(400).send('Author query parameter is required');
  }
  
  const matchingQuotes = quotesJSON.filter(quote => 
    quote.author.toLowerCase().includes(author.toLowerCase())
  );
  
  if (matchingQuotes.length === 0) {
    return res.status(404).send('No quotes found for the given author');
  }

  res.json(matchingQuotes);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
