const API_KEY = "57e2affc794f49a6b44fff9c51c2de6d";

const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews('India'));

//when ever calling a api =>fetch(url+query+apiKey)

async function fetchNews(query) {
  const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const data = await res.json();
  bindData(data.articles);
  console.log(data);
}

function bindData(articles) {
  const cardsContainer = document.getElementById('cards-container');
  const newsCardTemplate = document.getElementById('template-news-card');
  //to make the cards emplty when ever the api or the page is loaded to make the fresh nd new news data
  cardsContainer.innerHTML = '';

  //now we are loopinng the articles whcih we have recived
  articles.forEach((article) => {
    if (!article.urlToImage) return;
    // to clone all the nodes inside the targeted tag
    const cardClone = newsCardTemplate.content.cloneNode(true);
    fillDataInCard(cardClone, article);
    cardsContainer.appendChild(cardClone);
  });
}

function fillDataInCard(cardClone, article) {
  //targeting all the tags which we need to change the detail
  const newsImg = cardClone.querySelector('#news-img');
  const newsTitle = cardClone.querySelector('#news-title');
  const newsSource = cardClone.querySelector('#news-source');
  const newsDesc = cardClone.querySelector('#news-desc');

  newsImg.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;

  //now getting the updated news as per date
  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta"
  });
  newsSource.innerHTML = `${article.source.name} . ${date}`;
  cardClone.firstElementChild.addEventListener('click',()=>{
    window.open(article.url,"_blank");
  })
}


let curSelectedNav=null;
function onNavItemClick(id)
{
  fetchNews(id);
  const navItem=document.getElementById(id);
  curSelectedNav?.classList.remove('active');
  curSelectedNav=navItem;
  curSelectedNav.classList.add('active');
}

const searchButton=document.getElementById('search-button');
const searchText=document.getElementById('search-text');

searchButton.addEventListener('click',()=>{
  const query=searchText.value;
  if(!query) return;
  fetchNews(query); 
  curSelectedNav?.classList.remove("active");
  curSelectedNav=null;
})