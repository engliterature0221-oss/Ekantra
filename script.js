/* ==========================================
   Ekantra
   Version 3.0

   JavaScript Part 1

   Preloader
   Typing Effect

========================================== */


/* ==========================================
   PRELOADER
========================================== */

window.addEventListener("load", function () {

    const preloader = document.getElementById("preloader");

    preloader.style.opacity = "0";

    setTimeout(function () {

        preloader.style.display = "none";

    }, 600);

});


/* ==========================================
   TYPING EFFECT
========================================== */

const typingText = document.getElementById("typingText");

const textArray = [

    "Welcome to  Ekantra",

    "Learn English with Confidence",

    "Master English Grammar",

    "Improve Your Vocabulary",

    "Prepare for Competitive English"

];

let textIndex = 0;

let charIndex = 0;

let deleting = false;

function typeEffect() {

    const currentText = textArray[textIndex];

    if (!deleting) {

        typingText.textContent = currentText.substring(0, charIndex);

        charIndex++;

        if (charIndex > currentText.length) {

            deleting = true;

            setTimeout(typeEffect, 1500);

            return;

        }

    }

    else {

        typingText.textContent = currentText.substring(0, charIndex);

        charIndex--;

        if (charIndex < 0) {

            deleting = false;

            textIndex++;

            if (textIndex >= textArray.length) {

                textIndex = 0;

            }

        }

    }

    setTimeout(typeEffect, deleting ? 40 : 100);

}

typeEffect();

/* ==========================================
   MOBILE HAMBURGER MENU
========================================== */

const menuToggle = document.getElementById("menu-toggle");

const menu = document.getElementById("menu");

menuToggle.addEventListener("click", function () {

    menu.classList.toggle("active");

});


/* ==========================================
   CLOSE MENU AFTER CLICK
========================================== */

const menuLinks = document.querySelectorAll(".menu a");

menuLinks.forEach(function(link){

    link.addEventListener("click", function(){

        menu.classList.remove("active");

    });

});


/* ==========================================
   CLOSE MENU WHEN CLICK OUTSIDE
========================================== */

document.addEventListener("click", function(e){

    if(

        !menu.contains(e.target) &&

        !menuToggle.contains(e.target)

    ){

        menu.classList.remove("active");

    }

});

/* ==========================================
   DARK / LIGHT MODE
========================================== */

const themeButton = document.getElementById("themeToggle");

/* আগের Theme Load হবে */

if(localStorage.getItem("theme") === "dark"){

    document.body.classList.add("dark-mode");

    themeButton.textContent = "☀️";

}

else{

    themeButton.textContent = "🌙";

}

/* Theme Change */

themeButton.addEventListener("click", function(){

    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){

        themeButton.textContent = "☀️";

        localStorage.setItem("theme","dark");

    }

    else{

        themeButton.textContent = "🌙";

        localStorage.setItem("theme","light");

    }

});

/* ==========================================
   BACK TO TOP BUTTON
========================================== */

const topBtn = document.getElementById("topBtn");

/* Scroll করলে Button Show */

window.addEventListener("scroll", function () {

    if (window.scrollY > 300) {

        topBtn.style.display = "block";

    }

    else {

        topBtn.style.display = "none";

    }

});


/* Click করলে উপরে যাবে */

topBtn.addEventListener("click", function () {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});

/* ==========================================
   SCROLL REVEAL ANIMATION
========================================== */

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {

    const windowHeight = window.innerHeight;

    reveals.forEach(function(reveal){

        const revealTop = reveal.getBoundingClientRect().top;

        const revealPoint = 120;

        if(revealTop < windowHeight - revealPoint){

            reveal.classList.add("active");

        }

        else{

            reveal.classList.remove("active");

        }

    });

}

window.addEventListener("scroll", revealOnScroll);

window.addEventListener("load", revealOnScroll);

/* ==========================================
   FAQ ACCORDION
========================================== */

const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach(function(question){

    question.addEventListener("click", function(){

        const currentAnswer = this.nextElementSibling;

        const currentIcon = this.querySelector(".icon");

        faqQuestions.forEach(function(item){

            if(item !== question){

                item.nextElementSibling.style.maxHeight = null;

                item.nextElementSibling.classList.remove("show");

                item.querySelector(".icon").textContent = "+";

            }

        });

        if(currentAnswer.classList.contains("show")){

            currentAnswer.classList.remove("show");

            currentAnswer.style.maxHeight = null;

            currentIcon.textContent = "+";

        }

        else{

            currentAnswer.classList.add("show");

            currentAnswer.style.maxHeight =
            currentAnswer.scrollHeight + "px";

            currentIcon.textContent = "−";

        }

    });

});

/* ==========================================
   GALLERY LIGHTBOX
========================================== */

const galleryImages = document.querySelectorAll(".gallery-item img");

const lightbox = document.getElementById("lightbox");

const lightboxImg = document.getElementById("lightboxImg");

const closeLightbox = document.getElementById("closeLightbox");

/* Open Lightbox */

galleryImages.forEach(function(image){

    image.addEventListener("click", function(){

        lightbox.style.display = "flex";

        lightboxImg.src = this.src;

    });

});

/* Close Button */

closeLightbox.addEventListener("click", function(){

    lightbox.style.display = "none";

});

/* Click Outside */

lightbox.addEventListener("click", function(e){

    if(e.target === lightbox){

        lightbox.style.display = "none";

    }

});

/* ESC Key */

document.addEventListener("keydown", function(e){

    if(e.key === "Escape"){

        lightbox.style.display = "none";

    }

});

/* ==========================================
   LIVE CHAT
========================================== */

const chatButton = document.getElementById("chatButton");

const chatBox = document.getElementById("chatBox");

chatButton.addEventListener("click", function(){

    if(chatBox.classList.contains("show")){

        chatBox.classList.remove("show");

    }

    else{

        chatBox.classList.add("show");

    }

});

/* ==========================================
   SEARCH FUNCTION
========================================== */

const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

if(searchBtn){

    searchBtn.addEventListener("click", function(){

        const keyword = searchInput.value.trim().toLowerCase();

        if(keyword === ""){

            alert("Please enter something to search.");

            return;

        }

        window.find(keyword);

    });

}

/* ==========================================
   NEWSLETTER
========================================== */

const subscribeBtn = document.getElementById("subscribeBtn");

const newsletterEmail =
document.getElementById("newsletterEmail");

const newsletterMessage =
document.getElementById("newsletterMessage");

if(subscribeBtn){

subscribeBtn.addEventListener("click", function(){

    const email = newsletterEmail.value.trim();

    const emailPattern =
/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(emailPattern.test(email)){

        newsletterMessage.style.color="green";

        newsletterMessage.innerHTML=
"✔ Subscription Successful!";

        newsletterEmail.value="";

    }

    else{

        newsletterMessage.style.color="red";

        newsletterMessage.innerHTML=
"Please enter a valid email.";

    }

});

}

/* ==========================================
   CONTACT FORM
========================================== */

const contactForm =
document.querySelector(".contact-form form");

if(contactForm){

contactForm.addEventListener("submit",function(e){

const name =
this.querySelector("input[name='name']").value.trim();

const email =
this.querySelector("input[name='email']").value.trim();

const message =
this.querySelector("textarea").value.trim();

if(name==="" || email==="" || message===""){

e.preventDefault();

alert("Please fill all required fields.");

}

});

}

/* ==========================================
   WEBSITE READY
========================================== */

console.log(" Ekantra Website Loaded Successfully.");

/* ==========================================
   VOCABULARY QUIZ
========================================== */

const options =
document.querySelectorAll(".quiz-option");

const result =
document.getElementById("quizResult");

options.forEach(function(option){

option.addEventListener("click",function(){

if(this.innerText==="Courageous"){

result.innerHTML="✅ Correct Answer";

result.style.color="green";

}

else{

result.innerHTML="❌ Wrong Answer";

result.style.color="red";

}

});

});

/* ==========================================
   VOCABULARY SEARCH
========================================== */

const searchWord =
document.getElementById("wordSearch");

const vocabularyCards =
document.querySelectorAll(".search-card");

if(searchWord){

searchWord.addEventListener("keyup", function(){

const value =
this.value.toLowerCase();

vocabularyCards.forEach(function(card){

const text =
card.innerText.toLowerCase();

if(text.includes(value)){

card.style.display="block";

}

else{

card.style.display="none";

}

});

});

}

/* ==========================================
   NOTES SEARCH
========================================== */

const notesSearch =
document.getElementById("notesSearch");

const noteCards =
document.querySelectorAll(".note-search-card");

if(notesSearch){

notesSearch.addEventListener("keyup",function(){

const value =
this.value.toLowerCase();

noteCards.forEach(function(card){

const text =
card.innerText.toLowerCase();

if(text.includes(value)){

card.style.display="block";

}

else{

card.style.display="none";

}

});

});

}

/* ==========================================
   LITERATURE SEARCH
========================================== */

const literatureSearch =
document.getElementById("literatureSearch");

const literatureCards =
document.querySelectorAll(".literature-search-card");

if(literatureSearch){

literatureSearch.addEventListener("keyup",function(){

const value =
this.value.toLowerCase();

literatureCards.forEach(function(card){

const text =
card.innerText.toLowerCase();

if(text.includes(value)){

card.style.display="block";

}

else{

card.style.display="none";

}

});

});

}

/* ==========================================
   DOWNLOAD SEARCH
========================================== */

const downloadSearch =
document.getElementById("downloadSearch");

const downloadCards =
document.querySelectorAll(".download-search-card");

if(downloadSearch){

downloadSearch.addEventListener("keyup",function(){

const value =
this.value.toLowerCase();

downloadCards.forEach(function(card){

const text =
card.innerText.toLowerCase();

if(text.includes(value)){

card.style.display="block";

}

else{

card.style.display="none";

}

});

});

}

/* ==========================================
   STICKY NAVIGATION
========================================== */

window.addEventListener("scroll",function(){

const nav=document.querySelector("nav");

if(window.scrollY>60){

nav.classList.add("scrolled");

}

else{

nav.classList.remove("scrolled");

}

});

/* ==========================================================
   MODULE 2
   WEBSITE CONFIGURATION
========================================================== */

const WEBSITE = {

    name: "Ekantra",

    tagline: "From Darkness to Knowledge",

    email: "contact@Ekantra.com",

    phone: "+91XXXXXXXXXX",

    youtube: "#",

    facebook: "#",

    instagram: "#",

    telegram: "#",

    whatsapp: "#"

};

/* ==========================================================
   CURRENT YEAR
========================================================== */

document.querySelectorAll(".currentYear").forEach(function(item){

    item.textContent = new Date().getFullYear();

});

/* ==========================================================
MODULE 3
PRELOADER
========================================================== */

window.addEventListener("load",function(){

    const preloader=document.getElementById("preloader");

    preloader.style.opacity="0";

    preloader.style.visibility="hidden";

});

/* =====================================
MODULE 4
SCROLL PROGRESS BAR
===================================== */

window.addEventListener("scroll", function(){

    let scrollTop = document.documentElement.scrollTop;

    let scrollHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

    let progress =
    (scrollTop / scrollHeight) * 100;

    document.getElementById("progressBar").style.width =
    progress + "%";

});

// ===============================
// Secure Payment Button
// ===============================

const payBtn = document.getElementById("pay-btn");

if(payBtn){

payBtn.addEventListener("click",function(){

alert("Payment Gateway will be activated soon.");

});

}


