//https://api.coingecko.com/api/v3/search/trending 
//https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,JPY,EUR







function windowLoaded() {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=inr')
    .then(convertToJSON)
    .then(loadCoinData)
    .catch(err => console.error(err));
}

function loadCoinData(data) {
    const conversionRate = data.bitcoin.inr; 
    console.log('Conversion Rate:', conversionRate);
    fetch('https://api.coingecko.com/api/v3/search/trending')
    .then(convertToJSON)
    .then(function(data){
        render(data,conversionRate);
    })
    .catch(err => console.error(err)); // Add error handling
}

function render(coinData, conversionRate) {
    for(let i=0;i<coinData.coins.length;i++){
        const singleData=coinData.coins[i].item;
        const logo=singleData.thumb;
        const name =`${singleData.name} (${singleData.symbol})`;
        const price=Math.round(singleData.price_btc*conversionRate*10000)/10000;
        insertCryptocard(logo,name,price);

    }
}
function insertCryptocard(thumb,name,price){
    const price_para = document.createElement('p');
    price_para.innerText=`₹ ${price}`;
    const name_head=document.createElement('h1');
    name_head.innerText=name;

    const right_container=document.createElement('div');
    right_container.classList.add('f-left');
    right_container.appendChild(name_head);
    right_container.appendChild(price_para);

    const image_element=document.createElement('img');
    image_element.src=thumb;
    image_element.classList.add('f-left','card-image');
    image_element.alt="Coin Image";

    const card_container=document.createElement('div');
    card_container.classList.add('flex-item-small','card');
    card_container.appendChild(image_element);
    card_container.appendChild(right_container);

    document.getElementById('coins_container').appendChild(card_container);

          
}

window.onload = function() {
    windowLoaded();
}
