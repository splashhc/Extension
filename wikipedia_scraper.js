chrome.storage.local.get("query", function(data)
{
  let query = data.query; // Change this if we're using randomized facts rather than context facts.
  processFacts(query);

  // console.log("The query is: " + query);
  // console.log("url is: " + url); 
});

async function processFacts(searchedQuery)
{
  let query = searchedQuery; // possibly change this for randomized facts
  let urlAndPageId = await getUrlAndPageIdFromQuery(query);
  let summary = await getSummaryFromPageId(urlAndPageId[0]);
  let facts = splitSummaryIntoFacts(summary);
  let result = getRandomFactFromFactArray(query, facts);
  chrome.runtime.sendMessage({message: result});

  // console.log(result); -- Rather than logging the result, we will need to display the result somehow.
}

// Element 0 is pageId; Element 1 is wikipedia URL.
async function getUrlAndPageIdFromQuery(query)
{
  let url = encodeURI(`https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${query}`);
  let response = await fetch(url);
  let data = await response.json();
  let pageId = await data.query.search[0].pageid;
  let wikipediaUrl = `https://en.wikipedia.org/?curid=${pageId}`;
  return [pageId, wikipediaUrl];
}

async function getSummaryFromPageId(pageId)
{
  let url = `https://en.wikipedia.org/w/api.php?format=json&origin=*&action=query&prop=extracts&exintro&explaintext&redirects=1&pageids=${pageId}`;
  let response = await fetch(url);
  let data = await response.json();
  let summary = await data.query.pages[pageId].extract;
  return summary;
}

// Returns a string array of the summary split into individual sentences.
function splitSummaryIntoFacts(summary)
{
  // str.replace(/\.(?!\d)|([^\d])\.(?=\d)/g,'$1.|') -- This regex may be better.
  return summary.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
}

function getRandomFactFromFactArray(query, facts)
{
  let maxIndex = facts.length;
  let randomIndex = Math.floor((Math.random() * maxIndex));
  let formattedQuery = query.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, char => char.toUpperCase());
  let formattedFacts = `${formattedQuery}: ${facts[randomIndex]}`;
  return formattedFacts;
}