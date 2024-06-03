let cart = []; // Array per memorizzare i libri nel carrello
let prezzoF = 0 // variabile per memorizzare il totale del carrello
let cartCards = []; // Array per memorizzare le card dei libri nel carrello


document.addEventListener('DOMContentLoaded', () => {
    fetch('https://striveschool-api.herokuapp.com/books')
    .then(response => response.json())
    .then(data => {
        displayBooks(data);
    })
    .catch(error => {
        console.error('Error fetching books:', error);
    });

    // Aggiungo il listener al pulsante "Svuota Carrello"
    document.getElementById('empty-cart-btn').addEventListener('click', emptyCart);
});


function displayBooks(books) {
    let booksContainer = document.getElementById('books');
    booksContainer.innerHTML = '';  // Pulisco il contenitore prima di aggiungere nuovi libri

    // Aggiungo le card dei libri
    books.forEach(book => {
        let containerCard = document.createElement('div');
        containerCard.classList.add('col-sm-6', 'col-md-4', 'col-lg-3', 'mb-4');

        // Creo la card
        let card = document.createElement('div');
        card.classList.add('card', 'h-100', 'mt-4','border', 'border-danger', 'border-3');  // 'h-100' per fare in modo che le card abbiano la stessa altezza

        // Aggiungo l'immagine della copertina del libro
        let img = document.createElement('img');
        img.classList.add('card-img-top');
        img.src = book.img;
        img.alt = "Copertina di" + book.title;

        // Creo il corpo della card
        let cardBody = document.createElement('div');
        cardBody.classList.add('card-body', 'd-flex', 'flex-column');

        //Aggiungo il titolo del libro
        let cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = book.title;

        //Aggiungo il prezzo del libro
        let cardPrice = document.createElement('p');
        cardPrice.classList.add('card-text', 'flex-grow-1');
        cardPrice.textContent = book.price + '$';

        // Creo i bottoni
        let buttonContainer = document.createElement('div');
        buttonContainer.classList.add('mt-auto', 'd-flex', 'justify-content-between');

        // Creo il pulsante per aggiungere al carrello
        let cartButton = document.createElement('button');
        cartButton.classList.add('btn', 'btn-primary', 'me-2');
        cartButton.textContent = 'Carrello';
        cartButton.onclick = () => addToCart(book, card);  // Funzione per aggiungere al carrello

        // Creo il pulsante per nascondere la card
        let nascButton = document.createElement('button');
        nascButton.classList.add('btn', 'btn-secondary');
        nascButton.textContent = 'Nascondi';
        nascButton.onclick = () => containerCard.style.display = 'none';  // Nascondo la card

        // Aggiungo i bottoni al container
        buttonContainer.appendChild(cartButton);
        buttonContainer.appendChild(nascButton);

        // Aggiungo i nodi all'elemento card
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(cardPrice);
        cardBody.appendChild(buttonContainer);  // Aggiungo i bottoni al card body
        card.appendChild(img);  // Aggiungo l'immagine al div della card
        card.appendChild(cardBody);
        containerCard.appendChild(card);
        booksContainer.appendChild(containerCard);
    });
}
function addToCart(book, card) {   // ho aggiunto l'elemento card alla funzione in modo tale che quando venga premuto il bottone alla funzione si agiunga anche l'elemento card, per potermi permettere di eliminare il bordo rosso, cosa che altrimenti non sarebbe stata possibile 
    //console.log('Adding book:', book);
    //console.log('Card:', card);
    cart.push(book); // Aggiungo il libro al carrello
    cartCards.push(card); // Aggiungo la card all'array cartCards
    prezzoF += book.price // sommo i prezzi dei libri che ho messo nell'array e quindi nel carrello
    card.classList.remove ('border-danger', 'border') 
    //console.log('Cart:', cart);
    //console.log('Total price:', prezzoF);
    displayCart(); // Aggiorno la visualizzazione del carrello
}

function displayCart() {
    //console.log('Displaying cart:', cart);

    // Aggiorna il contenitore del carrello
    let cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Pulisco il contenitore del carrello prima di aggiungere nuovi libri

    // Aggiorna la visualizzazione del carrello
    cart.forEach(book => {
        let li = document.createElement('li');
        li.classList.add('list-group-item');
        li.textContent = book.title + book.price + "$";
        console.log('Adding book:', book);
        cartItemsContainer.appendChild(li);
    });

    // Aggiorna il contatore del carrello
    let cartCounter = document.getElementById('cart-counter');
    cartCounter.textContent = cart.length;
    console.log('Cart size:', cart.length);

    // Aggiorna il totale del carrello
    let cartTot = document.getElementById('cart-total')
    cartTot.textContent = 'Totale: ' + prezzoF.toFixed(2) + "$"; //Il metodo .toFixed(2) converte un numero in una stringa e lo formatta in modo che abbia esattamente due cifre decimali.
    //console.log('Cart total:', prezzoF.toFixed(2));
}

function emptyCart() {
    cart = []; // Svuota l'array del carrello
    prezzoF = 0;

    // Rimuovi le card dal carrello
    cartCards.forEach(card => {
        card.classList.add('border-danger', 'border');
    });
    cartCards = []; // Svuota l'array delle card
    displayCart(); // Aggiorna la visualizzazione del carrello

    // Aggiorna il totale del carrello
    let cartTot = document.getElementById('cart-total')
    cartTot.textContent = 'Totale: ' + prezzoF.toFixed(2) + "$"
    
}

