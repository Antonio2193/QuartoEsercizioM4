document.addEventListener("DOMContentLoaded", async () => {
    // console.log("pagina caricata")
    const params = new URLSearchParams(location.search)
    console.log (params)
    let asin = params.get("asin")
    console.log(asin)
    let price = params.get("price")
    console.log(price);
    fetch("https://striveschool-api.herokuapp.com/books/" + asin)
        .then((response) => {
            console.log(response)
            response.json().then((data) => {
                console.log(data.title)
                let bookDetailsContainer = document.getElementById('schedaLibro');

                let titolo = document.createElement('h1');
                titolo.classList.add('text-center');
                titolo.textContent = data.title;
                bookDetailsContainer.appendChild(titolo);

                // Crea la card
                let card = document.createElement('div');
                 card.classList.add('mx-auto');
                card.style.width = '30rem';
                card.style.height = '35rem';

                // Crea l'immagine
                let img = document.createElement('img');
                img.src = data.img;
                img.classList.add( 'img-fluid', 'rounded', 'mx-auto', 'd-block');
                img.alt = 'Copertina di ' + data.title;

                // Crea il corpo della card
                let cardBody = document.createElement('div');
                cardBody.classList.add('card-body', 'text-center');

                // Crea il titolo
                let cardTitle = document.createElement('h6');
                cardTitle.classList.add('card-title');
                cardTitle.textContent = data.title;

                // Crea il prezzo
                let cardPrice = document.createElement('p');
                cardPrice.classList.add('card-text');
                cardPrice.textContent = 'Prezzo: ' + data.price + '€';

                // Crea la descrizione
                let cardDescription = document.createElement('p');
                cardDescription.classList.add('card-text');
                cardDescription.textContent = data.description;

                // Assembla la card
                cardBody.appendChild(cardTitle);
                cardBody.appendChild(cardPrice);
                cardBody.appendChild(cardDescription);
                card.appendChild(img);
                card.appendChild(cardBody);

                // Aggiungi la card al contenitore
                bookDetailsContainer.appendChild(card);
            }
     
     )
})


})
