// let Base_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json"
// let res = fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json')


let dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("form button");
let formCrr = document.querySelector(".form select");
let toCrr = document.querySelector(".to select");
let msg = document.querySelector("form .msg");
let input = document.querySelector(".amount input");

for (let select of dropdowns){
    for( crrCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText =  crrCode ;
        newOption.value = crrCode ;
        select.append(newOption);
        if( select.name === "from" && crrCode === "PKR"){
             newOption.selected = "selected" ;
        }else if( select.name === "to" && crrCode === "USD"){
            newOption.selected = "selected";
        }
        
    }
    select.addEventListener("change" , (evt) => {
        updateFlag(evt.target);
        
    })
    
}


let updateFlag = (element) => {
    let crrCode = element.value ; 
    let countryCode = countryList[crrCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64` ;
    let img = element.parentElement.querySelector("img");
    img.src= newSrc ;
}



    btn.addEventListener("click" ,  (e) => {
        e.preventDefault();
        let fromOptions = e.target.previousElementSibling.previousElementSibling.querySelector('.form');
        let toOptions = e.target.previousElementSibling.previousElementSibling.querySelector('.to');
        let formSelectCode , toSelectCode;
       
        for(let e of fromOptions){
           if(e.selected){
            formSelectCode= e.value
           }
        }
        for(let b of toOptions){
            if(b.selected){
             toSelectCode = b.value
            }
         }
         msg.innerHTML= 'waiting...';
         let res = fetch(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${formSelectCode.toLowerCase()}.json`)
        res.then((response)=> {
            return response.json();
        }).then((data)=>{
            let exchangeRate = data[`${formSelectCode.toLowerCase()}`][`${toSelectCode.toLowerCase()}`]
             let convertedValue = exchangeRate * input.value;
             msg.innerHTML = `${input.value} ${countryList[formSelectCode]} = ${convertedValue.toFixed(2)} ${countryList[toSelectCode]}`;
        })
        
    })
