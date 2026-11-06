function buyPlan(planName, price){
    let confirmPlan = confirm(
        "Do you want to select " + planName + " Plan for $" + price + " per month?"
    );
    if(confirmPlan){
        alert(
            "Congratulations! You selected " + planName +
            " Plan for $" + price + " per month."
        );
    }else{
        alert("Plan selection cancelled!");
    }
}
let cards = document.querySelectorAll(".card1, .card2, .card3");
cards.forEach(function(card){
    card.addEventListener("mouseenter", function(){
        card.style.transform = "translateY(-10px)";
        card.style.transition = "0.3s";
    });
    card.addEventListener("mouseleave", function(){
        card.style.transform = "translateY(0)";
    });
});
