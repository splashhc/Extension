chrome.storage.local.get("query", function(data)
{
  let url = data.query;
  console.log("url is: " + url); 
});

async function getWikipediaUrlFromQuery(query)
{
    let url = encodeURI(`https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${query}`);
    let response = await fetch(url);
    let data = await response.json();
    let pageId = data.query.search[0].pageid;
    let wikipediaUrl = `https://en.wikipedia.org/?curid=${pageId}`;
    // console.log(wikipediaUrl);
    return wikipediaUrl;
}

// Not yet working since we don't yet have a URL
// function getWikipediaData(url)
// {
//   fetch(url)
//     .then(function(response) {
//       return response.json();
//     })
//     .then(function(response){
//       html_code = response["parse"]["text"]["*"];
//       parser = new DOMParser();
//       html = parser.parseFromString(html_code, "text/html");
//       var tables = html.querySelectorAll(".wikitable");
//       console.log(tables);
//     })
// }