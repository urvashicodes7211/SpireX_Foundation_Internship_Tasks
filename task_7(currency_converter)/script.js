const amount = document.getElementById("amount");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");

const convertBtn = document.getElementById("convertBtn");
const swapBtn = document.getElementById("swap");

const result = document.getElementById("result");
const rateText = document.getElementById("rate");
const message = document.getElementById("message");

async function convertCurrency() {
    const amountValue = parseFloat(amount.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if(isNaN(amountValue) || amountValue <= 0){
        message.innerText = "Please enter a valid amount!";
        result.innerText = "--";
        rateText.innerText = "";
        return;
    }
    try{
        convertBtn.innerText = "Converting...";
        convertBtn.disabled = true;

        const response = await fetch(
            `https://open.er-api.com/v6/latest/${from}`
        );

        if (!response.ok){
            throw new Error("API request failed");
        }

        const data = await response.json();

        if (data.result !== "success" || !data.rates[to]){
            throw new Error("Exchange rate unavailable");
        }

        const exchangeRate = data.rates[to];

        const convertedAmount = amountValue * exchangeRate;

        message.innerText = "Converted Amount";

        result.innerText = `${convertedAmount.toLocaleString(
            "en-US",
            {maximumFractionDigits: 2}
        )} ${to}`;

        rateText.innerText =
            `1 ${from} = ${exchangeRate} ${to}`;

    } 
    catch(error){
        message.innerText = "Something went wrong!";
        result.innerText = "--";
        rateText.innerText = "Please check your internet connection.";

        console.error(error);
    } 
    finally{
        convertBtn.innerText = "Convert Currency";
        convertBtn.disabled = false;
    }
}

swapBtn.addEventListener("click", function (){
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
    convertCurrency();
});
convertBtn.addEventListener("click", convertCurrency);

convertCurrency();