
/* ==========================================
        PRODUCT MODAL
========================================== */

const modal=document.getElementById("productModal");

const openBtn=document.getElementById("addProductBtn");

const closeBtn=document.querySelector(".close-modal");

if(openBtn){

openBtn.onclick=function(){

modal.style.display="flex";

}

}

if(closeBtn){

closeBtn.onclick=function(){

modal.style.display="none";

}

}

window.onclick=function(event){

if(event.target===modal){

modal.style.display="none";

}

}