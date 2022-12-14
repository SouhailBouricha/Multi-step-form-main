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
const nextStep3Btn = document.querySelector(".next_step3");
const plan = document.querySelector(".confirm_details_infos_left h3");
const planPrice = document.querySelector(".Plan_price");
const totalLabel = document.querySelector(".totalLabel");
const totalPrice = document.querySelector(".total h3");
const ConfirmBtn = document.querySelector(".ConfirmBtn");
const confirm_details = document.querySelector(".confirm_details");
const AddOnsExtra = document.querySelectorAll(".inp-cbx");
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
    if(steps[id]){
        steps[id].classList.add("active");
    }
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
        confirm_details.childNodes.forEach((element) =>{
            if(element.classList){
                if(element.classList.contains("addsone_finale")){
                    element.remove();
                }
            }
        });
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
        AddOnsPrices[0].setAttribute("p",10);
        AddOnsPrices[1].setAttribute("p",20);
        AddOnsPrices[2].setAttribute("p",20);
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
        AddOnsPrices[0].setAttribute("p",1);
        AddOnsPrices[1].setAttribute("p",2);
        AddOnsPrices[2].setAttribute("p",2);
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
nextStep3Btn.addEventListener("click", (e) =>{
    PageId++;
    moveToTheNextPage(PageId);
    plan.textContent = `${ChosenPlan["plan"]} (${ChosenPlan["state"].charAt(0).toUpperCase() + ChosenPlan["state"].slice(1)})`;
    if(ChosenPlan["state"] === "monthly"){
        planPrice.textContent = `$${ChosenPlan["price"]}/mo`;
        totalLabel.textContent = `Total (per month)`;
    }
    else{
        planPrice.textContent = `$${ChosenPlan["price"]}/yr`;
        totalLabel.textContent = `Total (per year)`;
    }
    confirm_details.childNodes.forEach((element) =>{
        if(element.classList){
            if(element.classList.contains("addsone_finale")){
                element.remove();
            }
        }
    });
    let addPrices = 0;
    AddOnsExtra.forEach(check =>{
        if(check.checked){
            const adds = document.createElement("div");
            adds.classList.add("addsone_finale");
            const paraadds = document.createElement("p");
            paraadds.textContent = check.parentElement.children[1].children[1].children[0].textContent;
            
            const priceadds = document.createElement("h4");
            priceadds.textContent = check.parentElement.children[1].children[2].textContent;
            
            adds.appendChild(paraadds);
            adds.appendChild(priceadds);
            confirm_details.appendChild(adds);
            addPrices += Number(check.parentElement.children[1].children[2].getAttribute("p"));
        }
    });
    if(ChosenPlan["state"] === "monthly"){
        totalPrice.textContent = `$${addPrices + ChosenPlan["price"]}/mo`;
    }
    else{
        totalPrice.textContent = `$${addPrices + ChosenPlan["price"]}/yr`;
    }
});
ConfirmBtn.addEventListener("click", (e) =>{
    PageId++;
    moveToTheNextPage(PageId);
});