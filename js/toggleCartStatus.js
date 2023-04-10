function toggleCartStatus() {
  const cartWrapper = document.querySelector('.cart');
  const alert = document.querySelector('.modal__alert');
  const orderForm = document.querySelector('.modal__order-form');

  if (cartWrapper.children.length > 0) {
    alert.classList.add('modal__alert_none');
    orderForm.classList.remove('modal__order-form_none');
  } else {
    alert.classList.remove('modal__alert_none');
    orderForm.classList.add('modal__order-form_none');
  }
}
