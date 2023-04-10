window.addEventListener('click', function (event) {

	let counter;
	if (event.target.classList.contains('modal__plus') || event.target.classList.contains('modal__minus')) {
		const counterWrapper = event.target.closest('.modal__counter');
		counter = counterWrapper.querySelector('.modal__val');
	}
	if (event.target.classList.contains('modal__plus')) {
		counter.innerText = ++counter.innerText;
	}

	if (event.target.classList.contains('modal__minus')) {

		if (parseInt(counter.innerText) > 1) {
			counter.innerText = --counter.innerText;
		} else if (event.target.closest('.cart') && parseInt(counter.innerText) === 1) {
      event.target.closest('.modal__item').remove();
      toggleCartStatus();
      calcCartPriceAndCounter();
    }
	}

	if (event.target.classList.contains('modal__action') && event.target.closest('.cart')) {
		calcCartPriceAndCounter();
	}
});