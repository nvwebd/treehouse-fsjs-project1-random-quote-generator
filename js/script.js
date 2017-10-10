'use strict';

// Object array holding the quotes
let quotes = [
  {
    id: 1,
    quote: 'Don\'t cry because it\'s over, smile because it happened.',
    source: 'Dr. Seuss',
    citation: 'Citation Example 1',
    year: 1995,
    category: ['Example1 Tag 1', 'Example2 Tag 2']
  }, {
    id: 2,
    quote: 'You can do anything but not everything',
    source: 'David Allen',
    citation: 'Making It All Work',
    year: 2009,
    category: ['life', 'self growth']
  }, {
    id: 3,
    quote: 'You can observe a lot just by watching.',
    source: 'Yogi Berra',
    citation: '',
    category: ['managment', 'planning', 'truism']
  }, {
    id: 4,
    quote: 'A house divided against itself cannot stand.',
    source: 'Abraham Lincoln',
    citation: '',
    category: ['wisdom']
  }, {
    id: 5,
    quote: 'Difficulties increase the nearer we get to the goal.',
    source: 'Johann Wolfgang von Goethe',
    citation: '',
    category: ['future', 'goals']
  }, {
    id: 6,
    quote: 'Fate is in your hands and no one elses',
    source: 'Byron Pulsifer',
    citation: '',
    category: ['fate', 'wisdom']
  }, {
    id: 7,
    quote: 'Be the chief but never the lord.',
    source: 'Lao Tzu',
    citation: '',
    category: ['leadership']
  }, {
    id: 8,
    quote: 'Nothing happens unless first we dream.',
    source: 'Carl Sandburg',
    citation: '',
    category: ['dreams']
  }, {
    id: 9,
    quote: 'Well begun is half done.',
    source: 'Aristotle',
    citation: '',
    category: ['wisdom', 'greek', 'intelligence']
  }
];

// array of already displayed quotes
let consumedQuotes = [];

// saved interval so it can be manualy canceled
let intervalID;

/*  function that resets the quote rotation on button click -
    the function is triggered if all quotes were shown or button was clicked
*/
const resetQuoteRotation = (event) => {
  if (event) {
    if (event.id) {
      printQuote(event); // event here is the last quote shown in last rotation
    } else { // event = button click
      printQuote();
      clearInterval(intervalID);
      intervalID = setInterval(printQuote, 10000);
    }
  } else {
    printQuote();
  }
};

/**
 * [startQuoteRotation initial quote rotation start]
 * @return {[void]}
 */
const startQuoteRotation = () => {
  printQuote();
  intervalID = setInterval(printQuote, 10000);
};

/**
 * [calculateRandomBodyColor description]
 * @return {[string]} [string representing HEX color - #cc12aa]
 */
const calculateRandomBodyColor = () => {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};

/**
 * [changeBodyColor changes the body color]
 * @param  {[string]} bodyColor [which color to display]
 * @return {[void]}           []
 */
const changeBodyColor = (bodyColor) => {
  document.body.style.background = bodyColor;
};

/**
 * [getRandomQuote description]
 * @return {[Object]} [Object of Quotes]
 */
const getRandomQuote = () => {
  return quotes[Math.floor(Math.random() * quotes.length) + 0];
};

/**
 * [quoteAlreadyShown checks if the newly fetched quote was already displayed]
 * @param  {[number]} quoteId [quote.id - id value of the quote to be checked]
 * @return {[boolean]}         [returns true: if incoming quotes has already been show / false: if the quote wasn't shown before]
 */
const quoteAlreadyShown = (quoteId) => {
  for (let i = 0; i < consumedQuotes.length; i++) {
    if (consumedQuotes[i].id === quoteId) {
      return true;
    }
  }
  return false;
};

/**
 * [checkIfAllQuotesWereUsed checks if all of the quotes were uses - displayed]
 * @return {[boolean]} []
 */
const checkIfAllQuotesWereUsed = () => {
  if (consumedQuotes.length === quotes.length) {
    return true;
  } else {
    return false;
  }
};

/**
 * [printQuote gets a random quote from the Object[] and checks if all quotes were used
 * checks the current quote if it was shown before
 * appends the quote object to the DOM]
 * @param  {[Object]} lastQuote [if the rotation has been through 1 time then this is set to the last quote that was displayed]
 * @return {[void]}
 */
const printQuote = (lastQuote) => {
  let quote = getRandomQuote();
  // console.log(quote);

  if (lastQuote) {
    while (lastQuote.id === quote.id) {
      quote = getRandomQuote();
    }
  }

  if (checkIfAllQuotesWereUsed()) {
    lastQuote = consumedQuotes.pop();
    consumedQuotes = [];
    resetQuoteRotation(lastQuote);
  } else {

    while (quoteAlreadyShown(quote.id)) {
      quote = getRandomQuote();
    }

    consumedQuotes.push(quote);
    console.log('Displayed quotes: ', consumedQuotes);

    changeBodyColor(calculateRandomBodyColor());

    let quoteMarkup = `<p class="quote">${quote.quote}</p><p class="source">${quote.source}`;

    if (quote.citation !== undefined) {
      quoteMarkup += `<span class="citation">${quote.citation}</span>`;
    } else if (quote.year !== undefined) {
      quoteMarkup += `<span class="year">${quote.year}</span>`;
    }

    quoteMarkup += '</p>';

    if(quote.category !== 0 ) {
      quoteMarkup += '<div class="category"><h3>category:</h3>';
      for(let i = 0; i < quote.category.length; i++){
        quoteMarkup += `<p class="tag-item">${quote.category[i]}</p>`;
      }
      quoteMarkup += '</div>';
    }

    document.getElementById('quote-box').innerHTML = quoteMarkup;
  }
};

/**
 * main logic start - set interval to automatically display quotes
 */
startQuoteRotation();

// event listener to respond to "Show another quote" button clicks
// when user clicks anywhere on the button, the "printQuote" function is called
document.getElementById('loadQuote').addEventListener('click', resetQuoteRotation, false);
