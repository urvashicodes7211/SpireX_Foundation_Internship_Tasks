const countryInput = document.getElementById("countryInput");
const searchBtn = document.getElementById("searchBtn");

const countryCard = document.getElementById("countryCard");
const message = document.getElementById("message");

async function searchCountry(){
    const country = countryInput.value.trim();

    if(country === ""){
        message.textContent = "Please enter a country name!";
        countryCard.classList.add("hidden");
        return;
    }

    try{
        message.style.color = "blue";
        message.textContent = "Loading...";
        countryCard.classList.add("hidden");

        const isCode = /^[a-z]{2,3}$/i.test(country);

        const url = isCode
            ? `https://countries.dev/alpha/${encodeURIComponent(country)}`
            : `https://countries.dev/name/${encodeURIComponent(country)}`;

        const response = await fetch(url);

        if (!response.ok){
            throw new Error("Country not found!");
        }

        const data = await response.json();

        const countryData = Array.isArray(data)
            ? data.find(item =>
                item.name.toLowerCase() === country.toLowerCase()
              )
            : data;

        if(!countryData){
            throw new Error("Country not found!");
        }

        document.getElementById("countryName").textContent =
            countryData.name;

        document.getElementById("flag").src =
            countryData.flags?.png || countryData.flags?.svg || countryData.flag;

        document.getElementById("capital").textContent =
            countryData.capital || "Not Available";

        document.getElementById("population").textContent =
            countryData.population?.toLocaleString("en-IN") || "Not Available";

        document.getElementById("region").textContent =
            countryData.region || "Not Available";

        const currencies = countryData.currencies || [];

        document.getElementById("currency").textContent =
            currencies.map(c =>
                `${c.name} (${c.symbol || c.code})`
            ).join(", ") || "Not Available";

        const languages = countryData.languages || [];

        document.getElementById("language").textContent =
            languages.map(lang => lang.name).join(", ")
            || "Not Available";

        message.textContent = "";
        countryCard.classList.remove("hidden");

    }catch (error){
        message.style.color = "red";
        message.textContent =
            "Country not found! Please try again.";

        countryCard.classList.add("hidden");

        console.error("Error:", error);
    }
}
searchBtn.addEventListener("click", searchCountry);

countryInput.addEventListener("keydown", function(event){
    if(event.key === "Enter"){
        searchCountry();
    }
});
