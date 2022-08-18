const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');

let apiQuotes = [];

//  Show New Quote
function newQuote(){
    //  Pick a random quote from apiQoutes array
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // Check if Author filed is blank and replace it with 'Unknown'
    if(!quote.author){
        authorText.textContent = 'Unknown';
    }else {
        authorText.textContent = quote.author;
    }
    // Check the Quote length to determine styling
    if(quote.text.length > 120){
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
}

// Get Quotes From API
async function getQuote() {
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const response =await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    }catch (error) {
        //Catch Error Here
        console.log(error);
    }
}

// Tweet quote
function tweetQuote () {
    const quote = quoteText.innerText;
    const author = authorText.innerText;const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    
    window.open(twitterUrl, '_blank');
}

// Event Listner
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On Load
getQuotes();

