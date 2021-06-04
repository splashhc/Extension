// block level scope is needed to avoid errors
{
    let query_utf_8 = getSearchUTF8(window.location.search.replace(/\+/g, ' '));
    let query = decodeURIComponent(query_utf_8.q);
    console.log("You searched for: " + query); // only used to verify the search detection works
}

function getSearchUTF8(url)
{
    let words = [], hash;
    let hashes = url.slice(url.indexOf('?') + 1).split('&');
    for(let i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        words.push(hash[0]);
        words[hash[0]] = hash[1];
    }
    return words;
}