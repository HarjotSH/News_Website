const API_KEY = "14d789fdfa9848d8b8c83c6c5378b940";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("India"));

function reload() {
  window.location.reload();
}

//API Handling
async function fetchNews(query) {
  try {
    const resp = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    if (!resp.ok) {
      throw new Error('Failed to load news');
    }
    const data = await resp.json();
    console.log(data);
    bindData(data.articles);
  } catch (error) {
    console.log('Error fetching news:', error);
  }
}

//Display Handling
function bindData(articles) {
  const cardsContainer = document.getElementById("cards-container");
  const newsCardTemaplate = document.getElementById("template-news-card");
  cardsContainer.innerHTML = "";

  articles.forEach((article) => {
    if (!article.urlToImage) return;
    const cardClone = newsCardTemaplate.content.cloneNode(true);
    fillDataInCard(cardClone, article);
    cardsContainer.appendChild(cardClone);
  });
}

function fillDataInCard(cardClone, article) {
  const newsImage = cardClone.querySelector("#news-image");
  const newsTitle = cardClone.querySelector("#news-title");
  const newsSource = cardClone.querySelector("#news-source");
  const newsDesc = cardClone.querySelector("#news-desc");

  newsImage.src = article.urlToImage;
  newsTitle.innerHTML = article.title;
  newsDesc.innerHTML = article.description;

  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });

  newsSource.innerHTML = `${article.source.name} · ${date}`;

  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}

//Event Handling
let curr_Selected_Nav = null;
function onNavItemClick(id) {
  fetchNews(id);
  const navItem = document.getElementById(id);
  curr_Selected_Nav?.classList.remove("active");
  curr_Selected_Nav = navItem;
  curr_Selected_Nav.classList.add("active");
}

//Search handling
const searchBtn = document.getElementById("search_btn");
const searchText = document.getElementById("search-text");

searchBtn.addEventListener("click", () => {
  const query = searchText.value;
  if (!query) return;
  fetchNews(query);
  curr_Selected_Nav?.classList.remove("active");
  curr_Selected_Nav = null;
});

