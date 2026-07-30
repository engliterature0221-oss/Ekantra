/* ==========================================================
                    EKANTRA

                SCRIPT.JS VERSION 5.0

Author      : Bikash Barman

Project     : Ekantra

Description :

Professional JavaScript File
for Ekantra Educational Website.

This file contains all website interactions.

========================================================== */

/* ==========================================================
                    STRICT MODE

Purpose :

Strict Mode JavaScript-এর ভুল কমায় এবং
Professional Coding Practice নিশ্চিত করে।

========================================================== */

"use strict";
/* ==========================================================
                GLOBAL SHORTCUT FUNCTIONS

Purpose :

বারবার document.querySelector()
না লিখে ছোট Function ব্যবহার করব।

Example :

$("#menu")

বা

$$(".course")

========================================================== */

const $ = (selector) => document.querySelector(selector);

const $$ = (selector) => document.querySelectorAll(selector);
/* ==========================================================
                SAFE EVENT LISTENER

Purpose :

যে Element Website-এর সব Page-এ নেই,
সেখানে Error না আসার জন্য
আগে Element আছে কিনা পরীক্ষা করবে।

========================================================== */

function safeEvent(element, eventName, callback){

if(element){

element.addEventListener(eventName,callback);

}

}
/* ==========================================================
                PAGE READY

Purpose :

DOM সম্পূর্ণ Load হওয়ার পরে
সব JavaScript শুরু হবে।

========================================================== */

document.addEventListener("DOMContentLoaded",function(){

console.log("Ekantra Loaded Successfully.");

});



// Part-2

/* ==========================================================
                    PRELOADER

Purpose :

Website সম্পূর্ণ Load হওয়ার আগে
একটি Loading Screen দেখানো।

যখন Website-এর সব HTML,
CSS,
JavaScript,
Image Load হয়ে যাবে,

তখন Preloader নিজে থেকেই
Fade Out হবে।

========================================================== */


/*
Function Name :

hidePreloader()

Purpose :

Preloader-কে ধীরে ধীরে
অদৃশ্য করা।

*/

function hidePreloader(){

    // Preloader Element খুঁজে বের করা

    const preloader=$("#preloader");


    // যদি Page-এ Preloader না থাকে
    // তাহলে Error না দিয়ে Function শেষ হবে।

    if(!preloader){

        return;

    }


    // Fade Animation

    preloader.style.opacity="0";


    // Animation শেষ হওয়ার পর

    setTimeout(function(){

        preloader.style.display="none";

    },600);

}



/*
Window Load Event

সব Image,

Font,

CSS,

JavaScript

Load হওয়ার পরে

hidePreloader()

চালানো হবে।

*/

window.addEventListener("load",hidePreloader);

/* ==========================================================
                    TYPING EFFECT

Purpose :

Hero Section-এ একাধিক Message
Typing Animation-এর মাধ্যমে দেখানো।

========================================================== */


/*
Function Name :

startTypingEffect()

Purpose :

Typing Animation শুরু করা।

*/

function startTypingEffect() {

    // Typing Element খুঁজে বের করা

    const typingElement = $("#typingText");


    // যদি Page-এ Typing Element না থাকে
    // তাহলে Function এখানেই শেষ হবে।

    if (!typingElement) {

        return;

    }


    /* ==========================================
       Typing Text List
    ========================================== */

    const textList = [

        "Welcome to Ekantra",

        "Learn English with Confidence",

        "Master English Grammar",

        "Improve Your Vocabulary",

        "Prepare for Competitive English"

    ];


    /* ==========================================
       Typing Variables
    ========================================== */

    let textIndex = 0;

    let characterIndex = 0;

    let deleting = false;


    /* ==========================================
       Typing Function
    ========================================== */

    function typing() {

        const currentText = textList[textIndex];



        // Typing শুরু

        if (!deleting) {

            typingElement.textContent =

                currentText.substring(0, characterIndex);

            characterIndex++;


            // পুরো Text লেখা শেষ

            if (characterIndex > currentText.length) {

                deleting = true;

                setTimeout(typing, 1500);

                return;

            }

        }



        // Delete শুরু

        else {

            typingElement.textContent =

                currentText.substring(0, characterIndex);

            characterIndex--;


            // পুরো Text Delete হলে

            if (characterIndex < 0) {

                deleting = false;

                textIndex++;


                // আবার প্রথম Text-এ ফিরে যাবে

                if (textIndex >= textList.length) {

                    textIndex = 0;

                }

            }

        }


        // Typing Speed

        setTimeout(

            typing,

            deleting ? 40 : 100

        );

    }


    // Animation শুরু

    typing();

}


/*
Website Load হলে
Typing Effect চালু হবে।
*/

document.addEventListener(

    "DOMContentLoaded",

    startTypingEffect

);


/* ==========================================================
                    DARK / LIGHT MODE

Purpose :

Website-এর Theme পরিবর্তন করা এবং
User-এর পছন্দ Browser-এ Save করে রাখা।

========================================================== */


/*
Function Name :

initializeTheme()

Purpose :

Website Load হওয়ার সময়
আগের Theme Restore করবে।

*/

function initializeTheme() {

    // Theme Toggle Button খুঁজে বের করা

    const themeButton = $("#themeToggle");


    // যদি Button না থাকে
    // তাহলে Function এখানেই শেষ হবে।

    if (!themeButton) {

        return;

    }


    /* ==========================================
       আগের Theme Load করা
    ========================================== */

    const savedTheme = localStorage.getItem("theme");


    if (savedTheme === "dark") {

        document.body.classList.add("dark-mode");

        themeButton.textContent = "☀️";

    }

    else {

        document.body.classList.remove("dark-mode");

        themeButton.textContent = "🌙";

    }


    /* ==========================================
       Theme Button Click Event
    ========================================== */

    themeButton.addEventListener("click", function () {

        document.body.classList.toggle("dark-mode");


        if (document.body.classList.contains("dark-mode")) {

            // Theme Save

            localStorage.setItem("theme", "dark");

            themeButton.textContent = "☀️";

        }

        else {

            // Theme Save

            localStorage.setItem("theme", "light");

            themeButton.textContent = "🌙";

        }

    });

}


/*
Website Load হলে
Theme Initialize হবে।
*/

document.addEventListener(

    "DOMContentLoaded",

    initializeTheme

);

/* ==========================================================
                    MOBILE MENU

Purpose :

Responsive Website-এর Mobile Navigation
Open / Close করা।

Features :

✓ Click করলে Menu Open হবে

✓ আবার Click করলে Close হবে

✓ Menu Link-এ Click করলে Menu Close হবে

✓ বাইরে Click করলে Menu Close হবে

✓ ESC চাপলে Menu Close হবে

✓ Menu Open থাকলে Body Scroll বন্ধ হবে

========================================================== */


/*
Function Name :

initializeMobileMenu()

Purpose :

Mobile Navigation Control করা।

*/

function initializeMobileMenu() {

    // প্রয়োজনীয় Element খুঁজে বের করা

    const menuToggle = $("#menu-toggle");

    const menu = $(".menu");


    // যদি Element না থাকে

    if (!menuToggle || !menu) {

        return;

    }


    /* ==========================================
       Menu Open / Close
    ========================================== */

    menuToggle.addEventListener("click", function () {

        menu.classList.toggle("active");


        // Body Scroll Lock

        document.body.classList.toggle("menu-open");

    });


    /* ==========================================
       Menu Link Click
    ========================================== */

    const menuLinks = $$(".menu a");

    menuLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            menu.classList.remove("active");

            document.body.classList.remove("menu-open");

        });

    });


    /* ==========================================
       Outside Click
    ========================================== */

    document.addEventListener("click", function (event) {

        if (

            !menu.contains(event.target) &&

            !menuToggle.contains(event.target)

        ) {

            menu.classList.remove("active");

            document.body.classList.remove("menu-open");

        }

    });


    /* ==========================================
       ESC Key Close
    ========================================== */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            menu.classList.remove("active");

            document.body.classList.remove("menu-open");

        }

    });

}


/*
Website Load হলে

Mobile Menu চালু হবে।

*/

document.addEventListener(

    "DOMContentLoaded",

    initializeMobileMenu

);



/* ==========================================================
                    SEARCH SYSTEM

Purpose :

Website-এর Search Box ব্যবহার করে
User-কে দ্রুত প্রয়োজনীয় Page বা
Google Search-এ পাঠানো।

Features :

✓ Empty Search Check

✓ Enter Key Support

✓ Search Button Support

✓ Console Error Free

✓ Beginner Friendly

========================================================== */


/*
Function Name :

initializeSearch()

Purpose :

Search Box চালু করা।

*/

function initializeSearch() {

    // প্রয়োজনীয় Element খুঁজে বের করা

    const searchInput = $("#searchInput");

    const searchButton = $("#searchBtn");


    // যদি Search Box না থাকে

    if (!searchInput || !searchButton) {

        return;

    }


    /* ==========================================
       Search Function
    ========================================== */

    function searchWebsite() {

        // Search Keyword

        const keyword = searchInput.value.trim();


        // Empty হলে

        if (keyword === "") {

            alert("Please enter something to search.");

            searchInput.focus();

            return;

        }


        /* ==========================================
           Website Search

           ভবিষ্যতে এখানে Internal Search হবে।

           বর্তমানে Google Search ব্যবহার করছি।

        ========================================== */

        const website = "site:engliterature0221-oss.github.io/Ekantra";

        const url =

        "https://www.google.com/search?q=" +

        encodeURIComponent(

            website + " " + keyword

        );


        // নতুন Tab-এ Open হবে

        window.open(url, "_blank");

    }


    /* ==========================================
       Button Click
    ========================================== */

    searchButton.addEventListener(

        "click",

        searchWebsite

    );


    /* ==========================================
       Enter Key
    ========================================== */

    searchInput.addEventListener(

        "keydown",

        function (event) {

            if (event.key === "Enter") {

                searchWebsite();

            }

        }

    );

}


/*
Website Ready হলে

Search System চালু হবে।

*/

document.addEventListener(

    "DOMContentLoaded",

    initializeSearch

);


/* ==========================================================
                    REVEAL ANIMATION

Purpose :

Website Scroll করার সময়
Section, Card, Image, Button ইত্যাদি
ধীরে ধীরে Animation সহ দেখানো।

Technology :

✓ IntersectionObserver

Advantages :

✓ খুব Fast

✓ কম Memory ব্যবহার করে

✓ Mobile Friendly

✓ Console Error Free

========================================================== */


/*
Function Name :

initializeRevealAnimation()

Purpose :

যেসব Element-এর class="reveal"
আছে তাদের Animation চালু করা।

*/

function initializeRevealAnimation() {

    // Reveal Element খুঁজে বের করা

    const revealElements = document.querySelectorAll(".reveal");


    // যদি কোনো Reveal Element না থাকে

    if (revealElements.length === 0) {

        return;

    }


    /* ==========================================
       Intersection Observer
    ========================================== */

    const observer = new IntersectionObserver(

        function(entries){

            entries.forEach(function(entry){

                if(entry.isIntersecting){

                    // Animation চালু

                    entry.target.classList.add("active");


                    // একবার Animation হলে
                    // আর Observe করবে না

                    observer.unobserve(entry.target);

                }

            });

        },

        {

            threshold:0.15

        }

    );


    /* ==========================================
       সব Reveal Element Observe করা
    ========================================== */

    revealElements.forEach(function(element){

        observer.observe(element);

    });

}


/*
Website Ready হলে

Reveal Animation চালু হবে।

*/

document.addEventListener(

    "DOMContentLoaded",

    initializeRevealAnimation

);



/* ==========================================================
                    BACK TO TOP BUTTON

Purpose :

Website Scroll করলে একটি
"Back To Top" Button দেখাবে।

User Button-এ Click করলে
Smooth Scroll করে Page-এর উপরে যাবে।

Features :

✓ Smooth Scroll

✓ Mobile Friendly

✓ Fast

✓ Error Free

========================================================== */


/*
Function Name :

initializeBackToTop()

Purpose :

Back To Top Button পরিচালনা করা।

*/

function initializeBackToTop() {

    // Button খুঁজে বের করা

    const backToTop = $("#backToTop");


    // যদি Button না থাকে

    if (!backToTop) {

        return;

    }


    /* ==========================================
       Scroll করলে Button Show / Hide
    ========================================== */

    window.addEventListener("scroll", function () {

        if (window.scrollY > 300) {

            backToTop.classList.add("show");

        }

        else {

            backToTop.classList.remove("show");

        }

    });


    /* ==========================================
       Button Click
    ========================================== */

    backToTop.addEventListener("click", function () {

        window.scrollTo({

            top: 0,

            behavior: "smooth"

        });

    });

}


/*
Website Ready হলে

Back To Top চালু হবে।

*/

document.addEventListener(

    "DOMContentLoaded",

    initializeBackToTop

);


/* ==========================================================
                PREMIUM STORE INTERACTION

Purpose :

Premium Product Card-এর Interaction
Professional করা।

Features :

✓ Card Hover Animation

✓ Buy Button Loading

✓ Product Click Animation

✓ Safe Programming

✓ Future Ready

========================================================== */


/*
Function Name :

initializePremiumStore()

Purpose :

Premium Store-এর সব Interaction
এক জায়গা থেকে নিয়ন্ত্রণ করা।

*/

function initializePremiumStore() {

    // সব Premium Card নির্বাচন

    const premiumCards = $$(".download-category-card");


    // যদি কোনো Card না থাকে

    if (premiumCards.length === 0) {

        return;

    }


    /* ==========================================
       প্রতিটি Card-এর জন্য Event
    ========================================== */

    premiumCards.forEach(function(card){

        // Mouse ঢুকলে

        card.addEventListener("mouseenter",function(){

            card.classList.add("hover");

        });


        // Mouse বের হলে

        card.addEventListener("mouseleave",function(){

            card.classList.remove("hover");

        });

    });


    /* ==========================================
       BUY BUTTON
    ========================================== */

    const buyButtons = $$(".buy-btn");


    buyButtons.forEach(function(button){

        button.addEventListener("click",function(){

            // Loading Animation

            button.classList.add("loading");

            button.innerHTML="⏳ Loading...";

        });

    });

}


/*
Website Ready হলে

Premium Store চালু হবে।

*/

document.addEventListener(

    "DOMContentLoaded",

    initializePremiumStore

);

/* ==========================================================
                FINAL CLEANUP

Author :

Bikash Barman

Website :

Ekantra

Purpose :

Website-এর Performance উন্নত করা,

Console Error কমানো,

Future Development সহজ করা।

========================================================== */


/*
==========================================================
PAGE LOAD PERFORMANCE
==========================================================

Website সম্পূর্ণ Load হলে

body-তে "loaded" Class যোগ হবে।

*/

window.addEventListener("load",function(){

document.body.classList.add("loaded");

});


/*
==========================================================
IMAGE DRAG DISABLE
==========================================================

Website-এর Image Drag হওয়া বন্ধ করবে।

*/

$$("img").forEach(function(image){

image.setAttribute("draggable","false");

});


/*
==========================================================
EXTERNAL LINK CHECK
==========================================================

যে Link অন্য Website-এ যাবে

সেগুলো নতুন Tab-এ Open হবে।

*/

$$("a").forEach(function(link){

const url=link.getAttribute("href");

if(

url &&

url.startsWith("http")

){

link.setAttribute("target","_blank");

link.setAttribute(

"rel",

"noopener noreferrer"

);

}

});


/*
==========================================================
SMOOTH PAGE FOCUS
==========================================================

Page Load হলে

Body Focus হবে।

*/

document.body.setAttribute(

"tabindex",

"-1"

);

document.body.focus();


/*
==========================================================
WINDOW RESIZE
==========================================================

Future Responsive Feature-এর জন্য

Placeholder।

*/

window.addEventListener(

"resize",

function(){

// Future Code

}

);


/*
==========================================================
GLOBAL ERROR HANDLER
==========================================================

JavaScript Error Console-এ দেখাবে।

Developer Debug করার জন্য।

*/

window.addEventListener(

"error",

function(error){

console.log(

"JavaScript Error :",

error.message

);

}

);


/*
==========================================================
FINAL MESSAGE
==========================================================

Developer Console Message

*/

console.log(

"%cEkantra Version 5.0 Loaded Successfully",

"color:green;font-size:16px;font-weight:bold;"

);


/*
==========================================================
END OF FILE

Thank You

==========================================================*/
