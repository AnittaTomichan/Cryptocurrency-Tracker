function searchData() {
    const currentURL = window.location.href;
    const url_obj = new URL(currentURL);
    const params = new URLSearchParams(url_obj.search);
    if(!params.has('q')){
        console.log('No data found');
        return;

    }
    document.getElementsByName('q')[0].value = params.get('q');
    fetch('https://api.coingecko.com/api/v3/search?query=' + params.get('q'))
    .then(convertToJSON)
    .then(render);
    }

    function render(data){
        for(let i=0;i<data.coins.length;i++){
            const singleData = data.coins[i];
            console.log(singleData);
            const index=i+1;
            const logo=singleData.thumb;
            const name=singleData.name;
            const symbol=singleData.symbol;
            const coinId=singleData.id;
            createSingleCard(index,logo,name,symbol,coinId);
        }
    }

    function createSingleCard(index,logo,name,symbol,coinId){
        const id_element=document.createElement('p');
        if(index<10){
            index= index + "&nbsp;&nbsp;";
        }
        id_element.innerHTML=index;

        const logo_element =document.createElement('img');
        logo_element.src=logo;
        logo_element.alt="coin logo";

        const name_element = document.createElement('h3');
        name_element.innerText=name;

        const symbol_element=document.createElement('h3');
        symbol_element.innerText = symbol;

        const anchor_element=document.createElement('a');
        anchor_element.innerText ="More Info";
        anchor_element.href="/detail.html?id=" + coinId;

        const container_element = document.createElement('div');
        container_element.classList.add('single-search-result','card');
        container_element.appendChild(id_element);
        container_element.appendChild(logo_element);
        container_element.appendChild(name_element);
        container_element.appendChild(symbol_element);
        container_element.appendChild(anchor_element);

        document.getElementById('search-results').appendChild(container_element);

    }
    window.onload = function() {
        searchData();

    }
