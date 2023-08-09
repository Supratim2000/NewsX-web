const NEWS_API_KEY = "fded82696162458cba12cc419efd1f84"
const baseUrl = "https://newsapi.org/v2/everything?q="

window.addEventListener('load', function() {

    let cardContainer = this.document.getElementById("card-container")
    let cardTemplate = this.document.getElementById("card-template")
    let listItemsArray = Array.from(this.document.getElementsByClassName("nav-link-items"))
    let navLogo = this.document.getElementById("nav-logo")
    let searchInput = this.document.getElementById("search-input")
    let searchButton = this.document.getElementById("search-button")

    navLogo.addEventListener('click', function(event) {
        fetchData("general")
    })

    listItemsArray.forEach((item) => {
        console.log(item.id)
        item.addEventListener('click', function(event) {
            fetchData(event.target.id)
        })
    })

    searchButton.addEventListener('click', function(event) {
        let searchedText = searchInput.value
        if (searchedText.value != "") {
            searchInput.value = ""
            fetchData(searchedText)
        }
    })

    fetchData("general")

    async function fetchData(query) {
        let fetchedData = await fetch(baseUrl + query + "&apiKey=" + NEWS_API_KEY)
        let fetchedNewsItems = await fetchedData.json()
        let fetchedNewsArticles = Array.from(fetchedNewsItems.articles)

        bindFetchedNewsItems(fetchedNewsArticles)
    }

    function bindFetchedNewsItems(fetchedNewsArticles) {
        cardContainer.innerHTML = ""
        for (let i = 0; i < fetchedNewsArticles.length; i++) {
            if (fetchedNewsArticles[i].urlToImage != null) {
                const clonedCard = cardTemplate.content.cloneNode(true)
                fillFetchedArticlesIntoCard(clonedCard, fetchedNewsArticles[i])
                clonedCard.firstElementChild.addEventListener('click', function(event) {
                    window.open(fetchedNewsArticles[i].url)
                })
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
