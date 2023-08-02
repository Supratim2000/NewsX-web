const NEWS_API_KEY = "fded82696162458cba12cc419efd1f84"
const baseUrl = "https://newsapi.org/v2/everything?q="

window.addEventListener('load', function() {

    let cardContainer = this.document.getElementById("card-container")
    let cardTemplate = this.document.getElementById("card-template")

    console.log("Operation started")
    fetchData("technology")
    console.log("Operation ended")

    async function fetchData(query) {
        let fetchedData = await fetch(baseUrl + query + "&apiKey=" + NEWS_API_KEY)
        let fetchedNewsItems = await fetchedData.json()
        let fetchedNewsArticles = Array.from(fetchedNewsItems.articles)

        //console.log(fetchedNewsArticles)

        bindFetchedNewsItems(fetchedNewsArticles)
    }

    function bindFetchedNewsItems(fetchedNewsArticles) {
        cardContainer.innerHTML = ""
        for (let i = 0; i < fetchedNewsArticles.length; i++) {
            //console.log(fetchedNewsArticles[i])
            if (fetchedNewsArticles[i].urlToImage != null) {
                const clonedCard = cardTemplate.content.cloneNode(true)
                fillFetchedArticlesIntoCard(clonedCard, fetchedNewsArticles[i])
                cardContainer.appendChild(clonedCard)
            }
        }
    }

    function fillFetchedArticlesIntoCard(card, article) {
        const cardImage = card.getElementById("card-image-tag")
        const cardTitle = card.getElementById("card-heading")
        const cardAuthorAndDate = card.getElementById("card-source")
        const cardContent = card.getElementById("card-main-news")

        cardImage.src = article.urlToImage
        cardTitle.innerHTML = article.title
        cardAuthorAndDate.innerHTML = article.author
        cardContent.innerHTML = article.description
    }
})
