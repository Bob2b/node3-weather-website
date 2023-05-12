const weahterForm = document.querySelector("form");
const search = document.querySelector("input");

const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weahterForm.addEventListener("submit", ((e)=>{
    e.preventDefault();
    const location = search.value;
    messageOne.textContent = "loading...";
    messageTwo.textContent ="";

        fetch("/weather?address="+ location ).then((reponce)=>{
         reponce.json().then((data)=>{
             if(data.error){
                   messageOne.textContent = data.error;
                }
             else{
                    messageOne.textContent = data.location;
                    messageTwo.textContent = data.forecast;
             }
         } )   
        } )
}))


