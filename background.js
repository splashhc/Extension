chrome.webNavigation.onHistoryStateUpdated.addListener(detectSearch); // for now, this only partially works with Bing. Full compatibility with Google

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse)
{      
    var currentNotificationId = null;

    var options =
    {
        type: "basic",
        iconUrl: "https://www.google.com/favicon.ico",
        title: request.message[0],
        message: request.message[1],
        priority: 1,
        buttons: [ { title: 'Dismiss' }, { title:'Learn More' } ],
        isClickable: true
    }

    chrome.notifications.onButtonClicked.addListener(function(notificationId, btnId)
    {
        if (notificationId === currentNotificationId)
        {
            if (btnId === 0)
            {
                // does not seem to be necessary since default behavior is close?
            }
            else if (btnId === 1)
            {
                chrome.tabs.create({ url: request.message[2] });
            }
        }
    });

    chrome.notifications.create(options, function(notificationId)
    {
        currentNotificationId = notificationId;
        console.log(chrome.runtime.lastError);
    });

    sendResponse({message: 'success'});
    return true;
});

function detectSearch(details)
{
    // we only want to run the script once per page load and for only one frame
    if(!details.url.match('chrome://new-tab-page/') && !details.url.match('http?s\:\/\/www\.google\.com\/$') && details.frameId == 0)
    {
        console.log(details.url);
        chrome.scripting.executeScript({ 
            target: {tabId: details.tabId},
            files: ["search_detector.js"]}, _=> chrome.runtime.lastError);
        
        chrome.scripting.executeScript({ 
            target: {tabId: details.tabId},
            files: ["wikipedia_scraper.js"]}, _=> chrome.runtime.lastError);
    }
}