// Events
document.addEventListener('DOMContentLoaded', setMulticolorText);

// Functions
function setMulticolorText()
{
  // Receives the title object.
  let title = document.getElementsByClassName("title").item(0);

  // The colors to cycle between the letters.
  // let colors = new Array("rgb(207, 0, 0)", "rgb(0, 207, 26)", "rgb(14, 97, 234)");

  // The HTML code to replace the title object's HTML with.
  let content = "";

  // Changes the color of the individual letters.
  for (var i = 0; i < title.textContent.length; i++)
  {
    content += "<span style=\"color:" + colors[(i % colors.length)] + ";\">" + title.textContent[i] + "</span>"
  }

  title.innerHTML = content;
}

// Response when button is clicked.
document.getElementById('everySearch').onclick = function()
{
  window.alert("Hello, World.")
}
document.getElementById('occasionally').onclick = function()
{
  window.alert("Hello, Galaxy.")
}
document.getElementById('rarely').onclick = function()
{
  window.alert("Hello, Universe.")
}
document.getElementById('manual').onclick = function()
{
  window.alert("Hello?...")
}

/*
var isExtensionOn = true;

function disableButton() {
    var disableButton = document.getElementById("disableButton");
    if (disableButton.innerHTML === "Disable") {
        isExtensionOn = false;
    } else if (disableButton.innerHTML === "Enable") {
        isExtensionOn = true;
    } else {
        alert("Error");
    }
}

document.addEventListener('DOMContentLoaded', function () {
    var disableButton = document.getElementById("disableButton");
    var br1 = document.getElementById("br1");
    var br2 = document.getElementById("br2");

chrome.extension.sendMessage({cmd: "setOnOffState", data: {value: isExtensionOn}});

chrome.extension.sendMessage({cmd: "getOnOffState"}, function (response) {
    if (response !== undefined) {
        if (response) {
            disableButton.innerHTML = "Disable";
            disableButton.className = "option-button";
            disableButton.style.display = "";
            br1.style.display = "";
            br2.style.display = "";
        }
        else {
        disableButton.innerHTML = "Enable";
                disableButton.className = "option-button";
                disableButton.style.display = "";
                br1.style.display = "";
                br2.style.display = "";
            }
        }
    });
});
*/

var enabled = false; // Disabled by default.
var myButton = document.getElementById('toggle');

chrome.storage.local.get('enabled', data => {
    enabled = !!data.enabled;
    myButton.textContent = enabled ? 'Disable' : 'Enable';
});

myButton.onclick = () => {
    enabled = !enabled;
    myButton.textContent = enabled ? 'Disable' : 'Enable';
    chrome.storage.local.set({enabled:enabled});
};