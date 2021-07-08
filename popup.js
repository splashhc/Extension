var enabled = null;
var enableDisableBtn = document.getElementById('enable-disable-button');

chrome.storage.local.get({"extensionEnabled": true}, function(data)
{
  enabled = data.extensionEnabled;
  enableDisableBtn.title = enabled ? "Disable Factify" : "Enable Factify";
  enableDisableBtn.className = enabled ? "enable-button" : "disable-button";
});

enableDisableBtn.onclick = function()
{
  enabled = !enabled;
  chrome.storage.local.set({"extensionEnabled": enabled});
  enableDisableBtn.title = enabled ? 'Disable Factify' : 'Enable Factify';
  enableDisableBtn.className = enabled ? "enable-button" : "disable-button";
}