export function showSkeleton() {
    const skeletons = document.querySelector('.menu__skeletons');
    const cards = document.querySelector('.menu__cards');

    skeletons.classList.remove('hidden');
    cards.classList.add('hidden');
}

export function hideSkeleton() {
    const skeletons = document.querySelector('.menu__skeletons');
    const cards = document.querySelector('.menu__cards');

    skeletons.classList.add('hidden');
    cards.classList.remove('hidden');
}


