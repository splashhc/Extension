chrome.tabs.onUpdated.addListener(detectSearch);

function detectSearch(_tabId, info)
{
    // we only want to run the script once per page load, so check first to see if the page has finished loading
    if(info.status === 'complete')
    {
        chrome.scripting.executeScript({ 
            target: {tabId: _tabId},
            files: ["search_detector.js"]});
            
        chrome.scripting.executeScript({ 
            target: {tabId: _tabId},
            files: ["wikipediascraper.js"]});
    }
}