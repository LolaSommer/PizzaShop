//начало проигрывания видео при  нажатии на плей или пауза
const video = document.querySelector('video');
const videoBtn = document.querySelector('.video__btn');
videoBtn.addEventListener('click',()=>{
  video.play();
  videoBtn.style.display = 'none';
});
video.addEventListener('click',()=>{
 video.pause();
videoBtn.style.display = 'block';
});
 //двойная кнопнка на герое 
const btnRight = document.querySelector('.hero__btn-right');
const menuSection = document.querySelector('.menu');
const btnLeft = document.querySelector('.hero__btn-left');
//скролл до меню
btnRight.addEventListener('click',()=>{
  btnRight.classList.add('btn-active');
  btnLeft.classList.remove('btn-active');
  menuSection.scrollIntoView({behavior: 'smooth'});
});
//открытие модального окна 
btnLeft.addEventListener('click',()=>{
btnLeft.classList.add('btn-active');
btnRight.classList.remove('btn-active');
const firstIngredientsButton = document.querySelector('.card__ingredients');
firstIngredientsButton.click();
});