
/*
Sets the width of the side nav to 250px 
moves the page left 250px by adding margin to it
gives the body a slightly tinged color (black with a really low opacity) 

*/
function openNav() {
    document.getElementById("sideNav").style.width = "250px";
    document.getElementById("sideNav").style.height = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }
  
  function closeNav() {
    document.getElementById("sideNav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
  }