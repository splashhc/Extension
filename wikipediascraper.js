chrome.storage.local.get("query", function(data)
{
  let url = data.query;
  console.log("url is: " + url); 
});

// not yet working since we don't yet have a URL
function getWikipediaData(url)
{
  fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(response){
      html_code = response["parse"]["text"]["*"];
      parser = new DOMParser();
      html = parser.parseFromString(html_code, "text/html");
      var tables = html.querySelectorAll(".wikitable");
      console.log(tables);
    })
}