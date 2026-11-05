const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");
menuToggle.addEventListener("click", function(){
    navLinks.classList.toggle("active");
    if(navLinks.classList.contains("active")){
        menuToggle.innerHTML = "✕";
        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Close navigation menu");
    }else{
        menuToggle.innerHTML = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    }
});
const links = document.querySelectorAll(".nav-links a");
links.forEach(function(link){
    link.addEventListener("click", function(){
        navLinks.classList.remove("active");
        menuToggle.innerHTML = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    });
});
document.addEventListener("keydown", function(event){
    if(event.key === "Escape"){
        navLinks.classList.remove("active");
        menuToggle.innerHTML = "☰";
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation menu");
    }
});
