const cartWrapper =  document.querySelector('.cart');

window.addEventListener('click', function (event) {
	if (event.target.classList.contains('cards__button')) {
		const card = event.target.closest('.cards__item');

		const productInfo = {
			id: card.id,
			title: card.querySelector('.cards__title').innerText,
			price: card.querySelector('.cards__price').innerText,
			counter: 1
		};

		const itemInCart = cartWrapper.querySelector(`[data-id="${productInfo.id}"]`);
		if (itemInCart) {
			const counterElement = itemInCart.querySelector('.modal__val');
			counterElement.innerText = parseInt(counterElement.innerText) + parseInt(productInfo.counter);
		} else { 
			const cartItemHTML = 
				`<div class="modal__item" data-id="${ productInfo.id }">
					<div class="modal__title-product">${ productInfo.title }</div>
					<div class="modal__counter">
						<div class="modal__plus modal__action">+</div>
						<div class="modal__val">${ productInfo.counter }</div>
						<div class="modal__minus modal__action">-</div>
					</div>
					<div class="modal__price">${ productInfo.price }</div>
				</div>`;

			cartWrapper.insertAdjacentHTML('beforeend', cartItemHTML);
		}

		toggleCartStatus();
		calcCartPriceAndCounter();
	}
});

const cartIcon = document.querySelector('.header__cart-icon');
	cartIcon.addEventListener('click', () => {
		document.querySelector('.modal').classList.remove('modal_none');
	});

const modalClose = document.querySelector('.modal__btn');
modalClose.addEventListener('click', () => {
	document.querySelector('.modal').classList.add('modal_none');
});

const modalForm = document.querySelector('.modal__form');
modalForm.addEventListener('submit', (event) => {
	event.preventDefault();
	let data = new FormData(modalForm);

	fetch('https://app.aaccent.su/js/confirm.php', {
		method: 'POST',
		body: data
	})
	.then(response => {
		if (response.ok) {
			document.querySelector('.modal').classList.add('modal_none');
			document.querySelector('.modal-res').classList.remove('modal-res_none');
		}
	})
});

window.addEventListener('click', (event) => {
	if (event.target.classList.contains('modal__res-btn')) {
		document.querySelector('.modal-res').classList.add('modal-res_none');
		
		const modalItems = document.querySelectorAll('.modal__item')
		for (let product of modalItems) {
			product.remove();
		}
		const countVal = document.querySelector('.header__value')
		countVal.innerHTML = 0;
	}
	toggleCartStatus();
	calcCartPriceAndCounter();
})


