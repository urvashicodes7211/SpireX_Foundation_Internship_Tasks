let cards = document.getElementById("cards");
let prev = document.getElementById("prev");
let next = document.getElementById("next");

let currentIndex = 0;

function getVisibleCards(){
    if(window.innerWidth <= 768){
        return 1;
    }
    return 3;
}

function updateSlider(){
    let card = cards.querySelector(".card");
    let cardWidth = card.offsetWidth;
    let gap = parseFloat(getComputedStyle(cards).gap);
    let visibleCards = getVisibleCards();
    let totalCards = cards.children.length;
    let maxIndex = totalCards - visibleCards;
    if(currentIndex > maxIndex){
        currentIndex = maxIndex;
    }
    if(currentIndex < 0){
        currentIndex = 0;
    }
    let move = currentIndex * (cardWidth + gap);
    cards.style.transform = `translateX(-${move}px)`;
    prev.disabled = currentIndex === 0;
    next.disabled = currentIndex === maxIndex;
}

next.addEventListener("click", function(){
    currentIndex++;
    updateSlider();
});

prev.addEventListener("click", function(){
    currentIndex--;
    updateSlider();
});

window.addEventListener("resize", function(){
    updateSlider();
});

updateSlider();
