 export function initHero() {
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

//начало проигрывания видео при  нажатии на плей или пауза
const video = document.querySelector('video');
const videoBtn = document.querySelector('.video__btn');
const videoBtnSmall = document.querySelector('.video__btn-small');
videoBtn.addEventListener('click',()=>{
  video.play();
  videoBtn.style.display = 'none';
  videoBtnSmall.classList.remove('hidden');
});
videoBtnSmall.addEventListener('click',()=>{
if(video.paused === true){
  video.play();
  videoBtnSmall.classList.add('play');
  videoBtnSmall.classList.remove('is-paused');
   
}else if(video.paused === false){
  videoBtnSmall.classList.add('is-paused');
  videoBtnSmall.classList.remove('play');
  video.pause();
}

});
};

