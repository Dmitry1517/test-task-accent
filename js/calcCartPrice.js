function calcCartPriceAndCounter() {
	const cartWrapper = document.querySelector('.cart');
	const priceElements = cartWrapper.querySelectorAll('.modal__price');
	const totalPriceEl = document.querySelector('.total-price');
	const counValue = document.querySelector('.header__value');
	
	let priceTotal = 0;
	let counter = 0;

	priceElements.forEach( item => {
		const amountEl = item.closest('.modal__item').querySelector('.modal__val');
		priceTotal += +(item.innerText) * +(amountEl.innerText);
		counter += +amountEl.innerText;
	});
	totalPriceEl.innerText = priceTotal.toFixed(2);
	counValue.innerText = counter;
}




