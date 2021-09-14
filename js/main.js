// Inizializzazione
const products = [
	new Product(1, "Mocassino da barca", 60, "img/mocassino.jpg"),
	new Product(2, "Scarpa Nike", 80, "img/scarpa-nike.jpg"),
	new Product(3, "Scarpa Bershka", 30, "img/bershka.jpg"),
	new Product(4, "Pier One", 49, "img/pier-one.jpg"),
	new Product(5, "Vans", 56, "img/vans.jpg"),
	new Product(6, "Scarpa puma", 70, "img/scarpa-puma.jpg"),
];

const cart = new Cart();

// Interazione col DOM
const cartContainer = document.getElementById("cart-basket");
const productsContainer = document.getElementById("products");
const totalPriceContainer = document.getElementById("total-price");

// Stampa del carrello
const printCart = () => {
	// rimuovo tutti gli elementi
	cartContainer.innerHTML = "";
	// aggiungo gli elementi che ho nel carrello ovvero nel arra cart.items
	cart.items.forEach(
		(elm) =>{

			cartContainer.innerHTML += `
			<li>
				<h4>${elm.name}</h4>
				<div>${elm.price}$</div>
				<button data-product="${elm.id}" class="btn cart-remove">rimuovi</button>
			</li>
			`;
		}
	);
	// seleziono tutti i bottoni remove degli elementi presenti nel carrello
	const buttonsRemoveProduct = document.querySelectorAll(".btn.cart-remove");
	// Aggiungo l'evento click su questi bottoni
	buttonsRemoveProduct.forEach(
		(elm) => {
			elm.addEventListener("click", 
				function() {
					// leggo la proprieta' data-product che contiene l'id del prodotto
					let dataProduct = this.getAttribute("data-product");
					// invoco il metodo del carrello per rimuovore l'elemento
					cart.removeItem(dataProduct);
					// stampo nuovamente il carrello
					printCart();
				}
			);
		}
	);
	// stampo il totale del carrello
	totalPriceContainer.innerHTML = `${cart.getTotalPrice()}$`;
}

// stampa dei prodotti
products.forEach(
	(elm) => {
		// console.log(elm);
		// destrutturazione
		const {id, name, price, image} = elm;
		
		productsContainer.innerHTML += `
		<div class="product">
			<img src="${image}" alt="${name}">
			<h3>${name}</h3>
			<div class="price">Prezzo: ${price}$</div>
			<button data-product="${id}" class="btn add-cart">Aggiungi al carrello</button>
		</div>
		`;
	}
);

// seleziono tutti i bottoni "Aggiungi al carrello"
const buttonsAddCart = document.querySelectorAll(".btn.add-cart");
// aggiungo l'evento click a tutti questi bottoni
buttonsAddCart.forEach(
	(elm) => {
		elm.addEventListener("click", 
			function() {
				// leggiamo l'attributo data-product che contiene l'id del prodotto
				let dataProduct = this.getAttribute("data-product");
				// recuperiamo l'intero oggetto tramite l'id del prodotto
				const productSelected = products.filter(
					(elm) => {
						if ( elm.id == dataProduct ) {
							return true;
						}

						return false;
					}
				);
				// aggiungiamo l'oggetto prodotto nel carrello
				cart.addItem(productSelected[0]);
				// stampiamo il carrello aggiornato
				printCart();
			}
		);
	}
);