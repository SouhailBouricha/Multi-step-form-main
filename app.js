const form = document.querySelector(".form");
const inputs = document.querySelectorAll(".form input");
const error = document.querySelector(".error");
const phone = document.querySelector(".phone");
const pages = document.querySelectorAll(".pages");
const steps = document.querySelectorAll(".step");
const backBtns = document.querySelectorAll(".back");
const checkboxBtn = document.querySelector(".checkbox");
const monthLabel = document.querySelector(".Monthly_Yearly_Label1");
const yearlyLabel = document.querySelector(".Monthly_Yearly_Label2");
const cardsPara = document.querySelectorAll(".card p");
const cards = document.querySelectorAll(".card");
const AddOnsPrices = document.querySelectorAll(".AddOns_price");
const nextStep2Btn = document.querySelector(".next_step2");
const ChosenPlan = { plan : "Arcade" , price : 9 , state : "monthly"};
let PageId = 0;
const lookUp = { "0" : true,"1" : true,"2" : true,"3" : true,"4" : true,"5" : true,"6" : true,"7" : true,"8" : true,"9" : true,"10" : true,
}
function checkEmpty(){
    let count = 0;
    inputs.forEach((element) =>{
        if(element.value === ""){
            element.style.border =  '2px solid red';
            count++;
        }
        else{
            element.style.border =  '2px solid hsl(231, 11%, 63%)';
        }
    });
    return count > 0 ? false : true;
}
function checkNumber(){
    let count = 0;
    phone.value.split("").forEach((element) =>{
        if(!lookUp[element]){
            phone.style.border =  '2px solid red';
            count++;
        }
    });
    return count > 0 ? false : true;
}
function moveToTheNextPage(id){
    pages.forEach((page) =>{
        page.classList.add("notAvailable");
    });
    steps.forEach((page) =>{
        page.classList.remove("active");
    });
    pages[id].classList.remove("notAvailable");
    steps[id].classList.add("active");
}
form.addEventListener("submit",(e) => {
    e.preventDefault();
    if(checkEmpty() === false){
        error.classList.add("visi");
        error.textContent = "All The Fields Are Requirde";
    }
    else if(checkNumber() === false){
        error.classList.add("visi");
        error.textContent = "Phone Number : Wrong Format";

    }
    else{
        PageId++;
        moveToTheNextPage(PageId);
    }
});
backBtns.forEach(back =>{
    back.addEventListener("click", () =>{
        PageId--;
        moveToTheNextPage(PageId);
    });
});

checkboxBtn.addEventListener("click",()=>{
    if(checkboxBtn.checked){
        monthLabel.classList.add("Uncheckd_Label");
        monthLabel.classList.remove("checkd_Label");
        yearlyLabel.classList.add("checkd_Label");
        yearlyLabel.classList.remove("Uncheckd_Label");
        cardsPara[0].textContent = "$90/yr";
        cardsPara[1].textContent = "$120/yr";
        cardsPara[2].textContent = "$150/yr";
        AddOnsPrices[0].textContent = "+$10/yr";
        AddOnsPrices[1].textContent = "+$20/yr";
        AddOnsPrices[2].textContent = "+$20/yr";
    }
    else{
        yearlyLabel.classList.remove("checkd_Label");
        yearlyLabel.classList.add("Uncheckd_Label");
        monthLabel.classList.add("checkd_Label");
        monthLabel.classList.remove("Uncheckd_Label");
        cardsPara[0].textContent = "$9/mo";
        cardsPara[1].textContent = "$12/mo";
        cardsPara[2].textContent = "$15/mo";
        AddOnsPrices[0].textContent = "+$1/mo";
        AddOnsPrices[1].textContent = "+$2/mo";
        AddOnsPrices[2].textContent = "+$2/mo";
    }
})
cards.forEach((card) =>{
    card.addEventListener("click",(e) =>{
        cards.forEach(card => card.classList.remove("card_active"));
        card.classList.add("card_active");     
    });
});
nextStep2Btn.addEventListener("click", (e) =>{
    cards.forEach((card) =>{
        if(card.classList.contains("card_active")){
            ChosenPlan["plan"] = card.children[1].textContent;
            if(checkboxBtn.checked){
                ChosenPlan["price"] = 10 * Number(card.getAttribute("price"));
                ChosenPlan["state"] = "yearly";
            }
            else{
                ChosenPlan["price"] = Number(card.getAttribute("price"));
                ChosenPlan["state"] = "monthly";
            }
            console.log(ChosenPlan);
        }
    });
    PageId++;
    moveToTheNextPage(PageId);
});