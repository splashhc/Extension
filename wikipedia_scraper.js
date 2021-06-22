chrome.storage.local.get("query", function(data)
{
  let query = data.query; // Change this if we're using randomized facts rather than context facts.
  processFacts(query);
});

async function processFacts(searchedQuery)
{
  let query = searchedQuery; // possibly change this for randomized facts
  let urlAndPageId = await getUrlAndPageIdFromQuery(query);
  let summary = await getSummaryFromPageId(urlAndPageId[0]);
  let facts = splitSummaryIntoFacts(summary);
  let result = getRandomFactFromFactArray(query, facts);
  chrome.runtime.sendMessage({message: result});
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

function splitSummaryIntoFacts(summary)
{
  return summary.replace(/((?<!Dr|Rd|Mr|Mrs|Ms|Bros|Ltd|Inc|No|\b[A-Z])[.?!]\s*(?=[A-Z]))/g, "$1|").split("|").filter(fact => fact != "");
}

function getRandomFactFromFactArray(query, facts)
{
  let maxIndex = facts.length;
  let randomIndex = Math.floor((Math.random() * maxIndex));
  let formattedQuery = query.toLowerCase().replace(/(^\w{1})|(\s+\w{1})/g, char => char.toUpperCase());
  //let formattedFacts = `${formattedQuery}: ${facts[randomIndex]}`;
  let formattedFacts = [formattedQuery, facts[randomIndex]];

  for(let i = 0; i < facts.length; i++)
  {
    console.log(facts[i]);
  }
  return formattedFacts;
}