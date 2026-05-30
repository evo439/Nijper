document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('team-modal');
    if (!modal) return;
    
    const closeBtn = document.querySelector('.close-modal');
    const teamCards = document.querySelectorAll('.team-card');
    
    // Modal elements
    const modalImg = document.getElementById('modal-img');
    const modalName = document.getElementById('modal-name');
    const modalRole = document.getElementById('modal-role');
    const modalBio = document.getElementById('modal-bio');

    const isModalOpen = () => modal.classList.contains('show');

    // Open modal
    teamCards.forEach(card => {
        card.addEventListener('click', () => {
            const name = card.getAttribute('data-name');
            const role = card.getAttribute('data-role');
            const bio = card.getAttribute('data-bio');
            const imgSrc = card.getAttribute('data-img');

            modalName.textContent = name;
            modalRole.textContent = role;
            modalBio.textContent = bio;
            modalImg.src = imgSrc;

            modal.classList.add('show');
            document.body.classList.add('no-scroll');

            // Push a history state for the modal
            history.pushState({ modalOpen: true }, '');
        });
    });

    // Close modal function
    const closeModal = () => {
        if (!isModalOpen()) return;

        modal.classList.remove('show');
        document.body.classList.remove('no-scroll');

        // If closed via UI (not back button), remove the modal state from history
        if (history.state && history.state.modalOpen) {
            history.back();
        }
    };

    // Close on X click
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    // Close on outside click
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // Close on mobile back button
    window.addEventListener('popstate', () => {
        if (isModalOpen()) {
            modal.classList.remove('show');
            document.body.classList.remove('no-scroll');
        }
    });

});
