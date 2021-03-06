chrome.webNavigation.onHistoryStateUpdated.addListener(detectSearch); // for now, this only partially works with Bing. Full compatibility with Google

var currentNotificationId = null;
chrome.notifications.onButtonClicked.addListener(function(notificationId, btnId)
{
    if(btnId === 1)
    {
        formattedUrl = notificationId.slice(0, -11);
        chrome.tabs.create({ url: formattedUrl }, function(tab)
        {
            if(!tab)
            {
                chrome.windows.create({url: formattedUrl, focused: true});
            }
            else
            {
                chrome.windows.update(tab.windowId, {focused: true});
            }
        });
    }
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse)
{      
    var options =
    {
        type: "basic",
        iconUrl: "../images/notification48.png",
        title: request.message[0],
        message: request.message[1],
        priority: 1,
        buttons: [ { title: 'Dismiss' }, { title: 'Learn More' } ],
        isClickable: true
    }

    let rng = Math.random().toString().slice(2,13);;
    let uniqueId = request.message[2] + rng;

    chrome.storage.local.get('extensionEnabled', data =>
    {
        if(data.extensionEnabled)
        {
            chrome.notifications.create(uniqueId, options, function()
            {
                currentNotificationId = id;
            });        
        }
    });

    sendResponse({message: 'success'});
    return true;
});

function detectSearch(details)
{
    // We only want to run the script once per page load and for only one frame
    if(!details.url.match('chrome://new-tab-page/') && !details.url.match('http?s\:\/\/www\.google\.com\/$') && details.frameId == 0)
    {
        chrome.scripting.executeScript({ 
            target: {tabId: details.tabId},
            files: ["search_detector.js"]}, _=> chrome.runtime.lastError);
        
        chrome.scripting.executeScript({ 
            target: {tabId: details.tabId},
            files: ["wikipedia_scraper.js"]}, _=> chrome.runtime.lastError);
    }
}