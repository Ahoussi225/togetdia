// Dashboard functionality
document.addEventListener('DOMContentLoaded', function() {
    // Modal functionality
    const editProfileBtn = document.getElementById('editProfileBtn');
    const editProfileModal = document.getElementById('editProfileModal');
    const closeEditModal = document.getElementById('closeEditModal');
    const cancelEdit = document.getElementById('cancelEdit');
    const saveProfile = document.getElementById('saveProfile');
    const markAllRead = document.getElementById('markAllRead');

    // Open edit modal
    if (editProfileBtn && editProfileModal) {
        editProfileBtn.addEventListener('click', function() {
            editProfileModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }

    // Close modal functions
    function closeModal() {
        if (editProfileModal) {
            editProfileModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }

    if (closeEditModal) closeEditModal.addEventListener('click', closeModal);
    if (cancelEdit) cancelEdit.addEventListener('click', closeModal);

    // Close modal when clicking outside
    if (editProfileModal) {
        editProfileModal.addEventListener('click', function(e) {
            if (e.target === editProfileModal) {
                closeModal();
            }
        });
    }

    // Save profile (simulation)
    if (saveProfile) {
        saveProfile.addEventListener('click', function() {
            // Simulation de sauvegarde
            setTimeout(() => {
                alert('Profil mis à jour avec succès!');
                closeModal();
            }, 500);
        });
    }

    // Mark all as read
    if (markAllRead) {
        markAllRead.addEventListener('click', function() {
            const unreadNotifications = document.querySelectorAll('.notification-item.unread');
            unreadNotifications.forEach(notification => {
                notification.classList.remove('unread');
                const badge = notification.querySelector('.notification-badge');
                if (badge) badge.remove();
            });

            // Mettre à jour le compteur de notifications
            const messageCount = document.querySelector('.stat-number:nth-child(3)');
            if (messageCount) messageCount.textContent = '0';
        });
    }

    // Animation des statistiques
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.textContent);
        let current = 0;
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        const interval = duration / steps;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target;
                clearInterval(timer);
            } else {
                stat.textContent = Math.round(current);
            }
        }, interval);
    });

    // Service card hover effects
    const serviceCards = document.querySelectorAll('.service-mini-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(8px)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Notification click
    const notifications = document.querySelectorAll('.notification-item.unread');
    notifications.forEach(notification => {
        notification.addEventListener('click', function() {
            this.classList.remove('unread');
            const badge = this.querySelector('.notification-badge');
            if (badge) badge.remove();

            // Mettre à jour le compteur
            const messageCount = document.querySelector('.stat-number:nth-child(3)');
            if (messageCount) {
                let count = parseInt(messageCount.textContent);
                if (count > 0) {
                    messageCount.textContent = count - 1;
                }
            }
        });
    });

    // Interactive empty state
    const emptyState = document.querySelector('.empty-state');
    if (emptyState) {
        emptyState.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });

        emptyState.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }
});