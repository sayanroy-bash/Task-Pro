// Get the contact modal and portfolio modal elements
var contactModal = document.getElementById("contactModal");
var portfolioModal = document.getElementById("portfolioModal");

// Get the contact link and portfolio link elements
var contactLink = document.getElementById("contactLink");
var portfolioLink = document.getElementById("portfolioLink");

// Get the close button elements for both modals
var contactClose = document.getElementsByClassName("close")[0];
var portfolioClose = document.getElementsByClassName("close2")[0];

// When the user clicks on the contact link, open the contact modal
contactLink.onclick = function(event) {
    event.preventDefault(); 
    contactModal.style.display = "block";
}

// When the user clicks on the portfolio link, open the portfolio modal
portfolioLink.onclick = function(event) {
    event.preventDefault(); 
    portfolioModal.style.display = "block";
}

// When the user clicks on the close button of the contact modal, close the contact modal
contactClose.onclick = function() {
    contactModal.style.display = "none";
}

// When the user clicks on the close button of the portfolio modal, close the portfolio modal
portfolioClose.onclick = function() {
    portfolioModal.style.display = "none";
}

// When the user clicks anywhere outside of the modals, close the open modal
window.onclick = function(event) {
    if (event.target == contactModal) {
        contactModal.style.display = "none";
    }
    if (event.target == portfolioModal) {
        portfolioModal.style.display = "none";
    }
}
