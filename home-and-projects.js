/////// RESPONSIVE NAVBARS ///////

let navBtn = document.querySelector(".nav-btn")
let navLinks = document.querySelector(".res-nav-links")

navBtn.addEventListener("click", function(){
 let value = navLinks.classList.contains("nav-collapse")

 if(value){
navLinks.classList.remove("nav-collapse")
navBtn.classList.remove("change")
 }
 else{
  navLinks.classList.add("nav-collapse")
  navBtn.classList.add("change")

 }
})

/////// COPYRIGHT CURRENT YEAR ///////

document.getElementById("year").textContent = new Date().getFullYear();




