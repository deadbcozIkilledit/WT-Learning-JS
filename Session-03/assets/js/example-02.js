const form = document.getElementByID('SearchForm');
form.addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
    //prevent page from reloading when form is submitted
    event.preventDefault();

    //get value of input field, remove whitespace
    const inputValue = document.getElementById('SearchInput').value;
    const searchQuery= inputValue.trim();

    const searchResults = document.getElementById('SearchResults');
    //clear the previous results
    searchResults.innerHTML = '';
    
    const spinner = document.getElementByID('LoadingSpinner');
    spinner.classList.remove('hidden');

    try {
        const results = await searchWikipedia(searchQuery);
        displayResults(results);
    } catch (err) {
        console.log(err);
        alert('failed to search wikipedia');
    } finally {
        spinner.classList.add('hidden');
    }
}

async function searchWikipedia(searchQuery) {
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=${ searchQuery }`;
    const response = await fetch(endpoint);
    if (!response.ok) {
        throw Error(response.statusText);
    }
    const json = await response.json();
    return json;
}

function displayResults(results) {
    //get a reference to the SearchResults element
    const searchResults = document.getElementById('SearchResults');
    //iterate over the seearch array, each nested object in the array can be accessed through the result parameter.
    results.query.search.forEach(result => {
        const url = `https://en.wikipedia.org/?curid=${ result.pageid }`;

        //append the searchresults to the dom 
        searchResults.insertAdjacentHTML(
            'beforeend',
            `<div class="flex flex-col bg-white my-2 p-4 text-stone-600">
        <h3 class="text-lg text-stone-200 bg-stone-700 pb-1 border-t-1 border-b-stone-500 -mx-4 -mt-4 px-4 pt-2 rounded-t-lg">
            <a href="${ url }" target="_blank" rel="noopener">${ result.title }</a>
        </h3>
        <div class=" border border-stone-500 rounded-b-lg -mx-4 px-4 pb-4 pt-2">
            <p>
                <a href="${ url }" class="text-sm text-stone-500 " target="_blank" rel="noopener">${ url }</a>
            </p>
            <span class="py-2">${ result.snippet }</span>
        </div>
      </div>`
        );
    });
}