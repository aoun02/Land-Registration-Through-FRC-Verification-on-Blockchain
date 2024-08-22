/*!
    * Start Bootstrap - SB Admin v7.0.7 (https://startbootstrap.com/template/sb-admin)
    * Copyright 2013-2023 Start Bootstrap
    * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
    */
    // 
// Scripts
// 


window.addEventListener('DOMContentLoaded', event => {

    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
        // Uncomment Below to persist sidebar toggle between refreshes
        // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
        //     document.body.classList.toggle('sb-sidenav-toggled');
        // }
        sidebarToggle.addEventListener('click', event => {
            event.preventDefault();
            document.body.classList.toggle('sb-sidenav-toggled');
            localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled'));
        });
    }

});


document.addEventListener('DOMContentLoaded', function () {
    const viewDetailsLink = document.querySelector('.card.bg-success .card-footer a');
    const registeredLandCard = document.getElementById('registeredLandCard');
    let isCardVisible = false;
  
    viewDetailsLink.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the link from taking its default action
        
        if (isCardVisible) {
            registeredLandCard.style.display = 'none'; // Hide the card
            viewDetailsLink.textContent = 'View Details'; // Change link text to 'View Details'
        } else {
            registeredLandCard.style.display = 'block'; // Show the card
            viewDetailsLink.textContent = 'Hide Details'; // Change link text to 'Hide Details'
        }
  
        isCardVisible = !isCardVisible; // Toggle the visibility state
    });
  });
  document.addEventListener('DOMContentLoaded', function () {
    const viewTotalBuyersDetailsLink = document.querySelector('.card.bg-primary .card-footer a');
    const abcDiv = document.getElementById('abc');
    let isAbcVisible = false;
  
    viewTotalBuyersDetailsLink.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent the link from taking its default action
  
        if (isAbcVisible) {
            abcDiv.style.display = 'none'; // Hide the abc div
            viewTotalBuyersDetailsLink.textContent = 'View Details'; // Change link text to 'View Details'
        } else {
            abcDiv.style.display = 'block'; // Show the abc div
            viewTotalBuyersDetailsLink.textContent = 'Hide Details';
            
        }
  
        isAbcVisible = !isAbcVisible; // Toggle the visibility state
    });
  });