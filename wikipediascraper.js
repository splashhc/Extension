var url = 'search_detector.js';

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

