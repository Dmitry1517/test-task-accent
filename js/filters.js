const filtersContainer = document.querySelector('.filters__items');

getFilters();
async function getFilters() {
  const response = await fetch('./js/products.json');
  const filtersArray = await response.json();
  renderFilters(filtersArray);
}

function renderFilters(filtersArray) {
  filtersArray.forEach(item => {
    const filtersHTML = `
    <label class="filters__checkbox" id="${ item.id }">
      <input type="checkbox" class="filters__input">
      <span class="filters__state">
        <span class="filters__control">
          <div class="filters__icon"></div>                        
        </span>
        <span class="checkbox__label">${ item.title }</span>
      </span>
    </label>
    `;
    filtersContainer.insertAdjacentHTML('beforeend', filtersHTML);
  });
}

filteredProducts();

function filteredProducts() {
  let filterArr = [];
  document.addEventListener('click', (event) => {
    if (event.target.closest('.filters__state')) {
      const filtersCheckbox = event.target.closest('.filters__checkbox');
      const filtersInput = filtersCheckbox.querySelector('.filters__input')
      const filtersIcon = filtersCheckbox.querySelector('.filters__icon')    
      if (!filtersInput.checked) {
        filtersIcon.style.display = 'block';
        filtersCheckbox.style.pointerEvents = 'none';
        filterArr.push(filtersCheckbox.id);
        let cards = document.querySelectorAll('.cards__item');
        for (let card of cards) {
          card.style.display = 'none';
          for (let item of filterArr) {
            if (card.id == item) {
              card.style.display = 'block'
            }
          }
        }
      } else filtersCheckbox.style.pointerEvents = '';
    }
    if (event.target.closest('.filters__button')) {
      let cards = document.querySelectorAll('.cards__item');
      for (let card of cards) card.style.display = 'block';
      const filtersIcons = document.querySelectorAll('.filters__icon')
      for (let el of filtersIcons) el.style.display = 'none';
      const filtersCheckboxs = document.querySelectorAll('.filters__checkbox');
      for (let el of filtersCheckboxs) el.style.pointerEvents = '';
      const filtersInputs = document.querySelectorAll('.filters__input');
      for (let el of filtersInputs) el.checked = false;
      filterArr = [];
    }
  })
}


