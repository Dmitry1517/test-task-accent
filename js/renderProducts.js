getProducts();
async function getProducts() {
  const response = await fetch('./js/products.json');
  const productsArray = await response.json();
	return productsArray;
}

async function main() {
	const postData = await getProducts();
	let currentPage = 1;
	let row = 6;


	function displayList(arrData, rowPerPage, page) {
		const productsContainer = document.querySelector('.cards__inner');
		productsContainer.innerHTML = '';
		const checkIcons = document.querySelectorAll('.filters__icon');
		for (let chek of checkIcons) chek.style.display = 'none';
		const filtersCheckboxs = document.querySelectorAll('.filters__checkbox');
    for (let el of filtersCheckboxs) el.style.pointerEvents = '';
		const filtersInputs = document.querySelectorAll('.filters__input');
    for (let el of filtersInputs) el.checked = false;
		page--;
		const start = rowPerPage * page;
		const end = start + rowPerPage;
		const paginationData = arrData.slice(start, end);

		paginationData.forEach(item => {
			const productHTML = `
				<div class="cards__item" id="${ item.id }">
					<h4 class="cards__title">${ item.title }</h4>
					<div class="cards__content">
						<img class="cards__img" src="${ item.image }" />
						<div class="cards__info">
							<div class="cards__price">${ item.regular_price.value }</div>
							<div class="cards__brand">${ item.brand }</div>
						</div>
					</div>
					<div class="cards__bottom">
						<button class="cards__button">Add to Cart</button>
					</div>
				</div> `;
			productsContainer.insertAdjacentHTML('beforeend', productHTML);
		});
	}

	function displayPagination(arrData, rowPerPage) {
		const paginationEl = document.querySelector('.pagination__inner');
		const pageCount = Math.ceil(arrData.length / rowPerPage);
		const ulEl = document.createElement('ul');
		ulEl.classList.add('pagination__list');

		for (let i = 0; i < pageCount; i++) {
			const liEl = displayPaginationBtn(i + 1);
			ulEl.append(liEl);
		}
		paginationEl.append(ulEl);
	}

	function displayPaginationBtn(page) {
		const liEl = document.createElement('li');
		liEl.classList.add('pagination__item');
		liEl.innerText = page;
		liEl.addEventListener('click', () => {
			currentPage = page;
			displayList(postData, row, currentPage)
		})
		return liEl;
	}

	displayList(postData, row, currentPage);
	displayPagination(postData, row)
}

main();






