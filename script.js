document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("myModal");
    const openBtnNav = document.getElementById("openModal"); // Logo button
    const openBtnAbout = document.getElementById("openModalFromAbout"); // "Click Me" button
    const openResumeModal = document.getElementById("openResumeModal"); // "My Resume" button
    const openCertificatesModal = document.getElementById("openCertificatesModal"); // New: E-Certificates button
    const closeBtn = modal.querySelector(".close");

    const modalAboutContent = document.getElementById("modalAboutContent");
    const modalResumeContent = document.getElementById("modalResumeContent");
    const modalCertificatesContent = document.getElementById("modalCertificatesContent"); // New: Certificates content

    // Function to open modal and show specific content
    function openSpecificModal(contentType) {
        // Hide all modal content tabs first
        modalAboutContent.classList.remove("active");
        modalResumeContent.classList.remove("active");
        modalCertificatesContent.classList.remove("active"); // New: Hide certificates content

        // Show the requested content tab
        if (contentType === "about") {
            modalAboutContent.classList.add("active");
        } else if (contentType === "resume") {
            modalResumeContent.classList.add("active");
        } else if (contentType === "certificates") { // New: Condition for certificates
            modalCertificatesContent.classList.add("active");
        }
        modal.style.display = "flex"; // Display the modal
    }

    if (modal && closeBtn) {
        if (openBtnNav) {
            openBtnNav.addEventListener("click", () => {
                openSpecificModal("about"); // Show about content by default from logo
            });
        }

        if (openBtnAbout) {
            openBtnAbout.addEventListener("click", () => {
                openSpecificModal("about"); // Show about content from "Click Me" button
            });
        }

        if (openResumeModal) {
            openResumeModal.addEventListener("click", () => {
                openSpecificModal("resume"); // Show resume content from "My Resume" button
            });
        }

        // New: Event listener for the E-Certificates button
        if (openCertificatesModal) {
            openCertificatesModal.addEventListener("click", () => {
                openSpecificModal("certificates"); // Show certificates content
            });
        }

        closeBtn.addEventListener("click", () => {
            modal.style.display = "none"; // Hide the modal
        });

        window.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.style.display = "none"; // Hide modal if clicked outside
            }
        });
    }

    // Function to handle showing/hiding items for a specific section
    function setupSeeMoreToggle(gridId, buttonId, initialCount = 4) {
        const gridContainer = document.getElementById(gridId);
        const seeMoreBtn = document.getElementById(buttonId);

        if (!gridContainer || !seeMoreBtn) {
            // console.warn(`Could not find grid container with ID "${gridId}" or button with ID "${buttonId}".`);
            return; // Exit if elements aren't found
        }

        const allCards = Array.from(gridContainer.querySelectorAll('.artwork-card'));
        const hiddenCards = allCards.slice(initialCount); // Get cards beyond the initial count

        // Initially hide the items if there are more than `initialCount`
        if (allCards.length > initialCount) {
            hiddenCards.forEach(card => {
                card.classList.add('hidden-item');
            });
        } else {
            // If there are no items to hide, hide the button itself
            seeMoreBtn.style.display = 'none';
            return; // No need for button functionality if nothing to show/hide
        }


        // Add event listener to the button
        seeMoreBtn.addEventListener('click', function() {
            // Check if any of the initially hidden cards are currently visible
            // We can just check the first one as they all toggle together
            const isShowingAll = !hiddenCards[0].classList.contains('hidden-item');

            hiddenCards.forEach(card => {
                if (isShowingAll) {
                    card.classList.add('hidden-item'); // Hide if currently showing all
                } else {
                    card.classList.remove('hidden-item'); // Show if currently hiding
                }
            });

            // Change button text
            this.textContent = isShowingAll ? 'See More' : 'See Less';
        });
    }

    // Call the setup function for each section that needs this functionality
    // Ensure these IDs match the ones you've added in your HTML
    setupSeeMoreToggle('illustratorArtworks', 'illustratorSeeMoreBtn', 4);
    setupSeeMoreToggle('youtubeThumbnails', 'youtubeSeeMoreBtn', 4);
    // If you have other sections with this behavior (e.g., projects), add them here:
    // setupSeeMoreToggle('projectGridId', 'projectSeeMoreBtn', 4); // Example for a project section
});