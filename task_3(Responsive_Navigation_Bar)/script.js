const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

function closeMenu(){
    navLinks.classList.remove("active");
    menuToggle.textContent = "☰";
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute(
        "aria-label",
        "Open navigation menu"
    );
}
menuToggle.addEventListener("click", function(){
    const isOpen = navLinks.classList.toggle("active");
    if(isOpen){
        menuToggle.textContent = "✕";
        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute(
            "aria-label",
            "Close navigation menu"
        );
    }else{
        closeMenu();
    }

});
const links = document.querySelectorAll(".nav-links a");

links.forEach(function (link){
    link.addEventListener("click", function(){
        closeMenu();
    });
});
document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" &&
        navLinks.classList.contains("active")) {
        closeMenu();
        menuToggle.focus();
    }
});