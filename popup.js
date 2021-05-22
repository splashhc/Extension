// Events
document.addEventListener('DOMContentLoaded', setMulticolorText);

// Functions
function setMulticolorText()
{
  // Receives the title object.
  let title = document.getElementsByClassName("title").item(0);

  // The colors indicated to cycle between the letters.
  let colors = new Array("rgb(207, 0, 0)", "rgb(0, 207, 26)", "rgb(14, 97, 234)");

  // The HTML code to replace the title object's HTML with.
  let content = "";

  // Loop over the title's text and append code to the content string that changes the color of the individual letters.
  for (var i = 0; i < title.textContent.length; i++)
  {
    content += "<span style=\"color:" + colors[(i % colors.length)] + ";\">" + title.textContent[i] + "</span>"
  }

  title.innerHTML = content;
}

// Response when button is clicked.
document.getElementById('everySearch').onclick = function() {
  window.alert("Hello World.")
}
