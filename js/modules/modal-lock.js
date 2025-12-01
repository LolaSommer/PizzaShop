 export function toggleBodyLock (){
  const modals = document.querySelectorAll('.modal-open');
  const anyOpen = [...modals].some(modal => !modal.classList.contains('hidden'));
  if(anyOpen){
  document.body.classList.add('modal__body-active');
  }else{
  document.body.classList.remove('modal__body-active');
  }
 }