chrome.tabs.onUpdated.addListener(detect_search);

function detect_search(_tabId, pageinfo, tab)
{
    // we only want to run the script once per page load, so check first to see if the page has finished loading
    if(pageinfo.status === 'complete')
    {
        chrome.scripting.executeScript({ 
            target: {tabId: _tabId},
            files: ["wikipediascraper.js"]});
    }
}