chrome.webNavigation.onHistoryStateUpdated.addListener(detectSearch); // for now, this only partially works with Bing. Full compatibility with Google

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse)
{   
    // console.log("The message is: " + request.message);
    
        var options =
        {
            type : "basic",
            iconUrl: "https://www.google.com/favicon.ico",
            title : "Did you know...",
            message: request.message,
            priority: 1,
            buttons:[ { title:'dismiss'}, {title:'learn more'} ],
            isClickable: true
        }
        chrome.notifications.create("", options, function() { console.log(chrome.runtime.lastError); });    

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