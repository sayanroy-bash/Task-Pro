// Get the modal elements
var contactModal = document.getElementById("contactModal");
var portfolioModal = document.getElementById("portfolioModal");
var teamModal = document.getElementById("teamModal");

// Get the link elements
var contactLink = document.getElementById("contactLink");
var portfolioLink = document.getElementById("portfolioLink");
var teamLink = document.getElementById("teamLink");

// Get the close button elements
var contactClose = document.getElementsByClassName("close")[0];
var portfolioClose = document.getElementsByClassName("close2")[0];
var teamClose = document.getElementsByClassName("close3")[0];

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

// When the user clicks on the team link, open the team modal
teamLink.onclick = function(event) {
    event.preventDefault(); 
    teamModal.style.display = "block";
}

// Close modals when the close button is clicked
contactClose.onclick = function() {
    contactModal.style.display = "none";
}

portfolioClose.onclick = function() {
    portfolioModal.style.display = "none";
}

teamClose.onclick = function() {
    teamModal.style.display = "none";
}

// Close modals when the user clicks outside of them
window.onclick = function(event) {
    if (event.target == contactModal) {
        contactModal.style.display = "none";
    }
    if (event.target == portfolioModal) {
        portfolioModal.style.display = "none";
    }
    if (event.target == teamModal) {
        teamModal.style.display = "none";
    }
}
