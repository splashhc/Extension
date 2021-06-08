chrome.storage.local.get("query", function(data)
{
  let query = data.query; // change this if we're using randomized facts rather than context facts

  console.log("The query is: " + query);
  processFacts(query);

  //console.log("url is: " + url); 
});

async function processFacts(searchedQuery)
{
  let query = searchedQuery; // possibly change this for randomized facts
  let urlAndPageId = await getUrlAndPageIdFromQuery(query);
  let summary = await getSummaryFromPageId(urlAndPageId[0]);
  let facts = splitSummaryIntoFacts(summary);
  let result = getRandomFactFromFactArray(query, facts);

  chrome.runtime.sendMessage({message: result}); //

  
  //console.log(result); // instead of logging the result, we will need to display the result somehow
}

// element 0 is pageId, element 1 is wikipedia URL
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

// returns a string array of the summary split into individual sentences
function splitSummaryIntoFacts(summary)
{
  // str.replace(/\.(?!\d)|([^\d])\.(?=\d)/g,'$1.|') this regex may be better
  return summary.replace(/([.?!])\s*(?=[A-Z])/g, "$1|").split("|");
}

function getRandomFactFromFactArray(query, facts)
{
  let maxIndex = facts.length;
  let randomIndex = Math.floor((Math.random() * maxIndex));
  let formattedFacts = `${query}: ${facts[randomIndex]}`;
  return formattedFacts;
}