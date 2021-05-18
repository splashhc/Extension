// events
document.addEventListener('DOMContentLoaded', setMulticolorText);

// functions
function setMulticolorText()
{
  // gets the title object
  let title = document.getElementsByClassName("title").item(0);

  // the colors to cycle between for the letters
  let colors = new Array("rgb(207, 0, 0)", "rgb(0, 207, 26)", "rgb(14, 97, 234)");

  // the HTML code to replace the title object's HTML with
  let content = "";

  // loop over the title's text and append code to the content string that changes the color of the individual letters
  for (var i = 0; i < title.textContent.length; i++)
  {
    content += "<span style=\"color:" + colors[(i % colors.length)] + ";\">" + title.textContent[i] + "</span>"
  }

  title.innerHTML = content;
}