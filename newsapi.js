const apiKey = "ddd663c6bc6e45828794167d21a0a770";
const blogContainer = document.querySelector(".blog-container");
const searchField = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");

// fetching Random news from the API Key
async function fetchRandomNews(){
    try{
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=100&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch(error){
        console.error("Error fetching the randomnews", error);
        return[];
    }

}
searchBtn.addEventListener("click",async ()=>{
    const query = searchField.value.trim()
    if(query!== ""){

        try{
            const articles = await fetchNewsQuery(query);
            displayBlogs(articles);
        }
        catch(error){
            console.error("Error fetching news by query", error);
        }
    }
})

// Add event listener for "Enter" key press
searchField.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});

//Function to fetch news based on the search query
async function fetchNewsQuery(query){

    try{
        const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=100&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.articles;
    } catch(error){
        console.error("Error fetching the news", error);
        return[];
    }

}

// function to dispaly the display blogs
function displayBlogs(articles){
    blogContainer.innerHTML="";
    
    articles.forEach((article)=> {
        const blogCard = document.createElement("div");
        blogCard.classList.add("blog-card");
        const imgEl=document.createElement("img");
        imgEl.src=article.urlToImage;
        imgEl.alt=article.title;
        const title = document.createElement("h2");
        title.textContent = article.title;
        const description = document.createElement("p");
        description.textContent = article.description;

        blogCard.appendChild(imgEl);
        blogCard.appendChild(title);
        blogCard.appendChild(description);
        blogCard.addEventListener("click",()=>{
            window.open(article.url,"__blank");
        })
        blogContainer.appendChild(blogCard);
    });
}
(async ()=>{
    try{
      const articles = await fetchRandomNews();
      displayBlogs(articles);
    }catch(error){
        console.error("Error fetching the random news");
    }
})();