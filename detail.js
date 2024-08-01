

function loadDetail(){
    const url_string = window.location.href;
    const url_obj = new URL(url_string);
    const params=new URLSearchParams(url_obj.search);
    if(!params.has('id')){

        window.location.href="./index.html";
    }
    fetch(`https://api.coingecko.com/api/v3/coins/${params.get('id')}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`)
    .then(convertToJSON)
    .then(render);

    fetch(`https://api.coingecko.com/api/v3/coins/${params.get('id')}/market_chart?vs_currency=inr&days=10`)
    .then(convertToJSON)
    .then(renderChart);
    
    

}  
function render(data){
    console.log(data);
    const name=`${data.name} (${data.symbol.toUpperCase()})`;
    const description = data.description.en;
    const logo=data.image.large;
    const inr = data.market_data.current_price.inr;
    const usd = data.market_data.current_price.usd;
    const eur=data.market_data.current_price.eur;
    const gbp=data.market_data.current_price.gbp;
    

    document.getElementById('coin-name').innerText= name;
    document.getElementById('coin-description').innerHTML = description;
    document.getElementById('coin-logo').src=logo;

    document.getElementById('inr-price').innerText=inr;
    document.getElementById('usd-price').innerText=usd;
    document.getElementById('eur-price').innerText=eur;
    document.getElementById('gbp-price').innerText=gbp;


}


window.onload = function(){
    loadDetail();
}



function renderChart(data){
  const prices=data.prices;
  const timestamps =[];
  const prices_inr= [];

  for(let i=0;i<prices.length;i++){
    const single_price = prices[i];

    const date_obj= new Date(single_price[0]);
    let days=date_obj.getDay();
    

    let hours=date_obj.getHours();
    
    

    timestamps.push(`${days}:${hours}`);
    prices_inr.push(single_price[1]);
  }
   const ctx = document.getElementById('myChart').getContext('2d');
   const myChart= new Chart(ctx, {
     type: 'line',
     data: {
       labels: timestamps,
       datasets: [{
         label: 'Price(in INR)',
         data:prices_inr,
         borderColor:'rgba(75,192,192)',
         tension:0.4
       }]
     },
     options: {
       Plugins:{
        legend:{
          display: false,
        }
       }
     }
   });
 
}
