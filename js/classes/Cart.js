class Cart {
	constructor() {
		this.items = []
	}

	addItem(product) {
		this.items.push(product);
	}

	removeItem(id) {
		this.items = this.items.filter(
			(elm) => {
				if ( elm.id != id ) {
					return true;
				}
				return false;
			}
		);
	}

	getTotalPrice() {
		let tot = 0;
		
		this.items.forEach(
			(elm) => {
				tot += elm.price;
			}
		);

		return tot;
	}
}