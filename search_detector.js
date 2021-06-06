// replace all '+' characters in the raw URL with spaces using RegEx before processing
var queryUtf8 = getSearchUtf8(window.location.search.replace(/\+/g, ' '));
var query = decodeURIComponent(queryUtf8.q);
chrome.storage.local.set({"query": query});

//console.log("You searched for: " + query); // only used to verify the search detection works

function getSearchUtf8(url)
{
    let searchTerms = [];
    let currentTerm = undefined;
    let termBuffer = url.slice(url.indexOf('?') + 1).split('&');
    for(let index = 0; index < termBuffer.length; index++)
    {
        currentTerm = termBuffer[index].split('=');
        searchTerms.push(currentTerm[0]);
        searchTerms[currentTerm[0]] = currentTerm[1];
    }
    return searchTerms;
}