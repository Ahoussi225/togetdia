// Filter functionality for services
document.addEventListener('DOMContentLoaded', function() {
    const filterForm = document.getElementById('filterForm');
    const servicesContainer = document.getElementById('servicesContainer');
    const loadingIndicator = document.getElementById('loadingIndicator');

    if (filterForm) {
        filterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            filterServices();
        });

        // Add change events to form elements
        const filterInputs = filterForm.querySelectorAll('select, input');
        filterInputs.forEach(input => {
            input.addEventListener('change', filterServices);
        });
    }

    function filterServices() {
        if (!filterForm || !servicesContainer) return;

        // Show loading indicator
        if (loadingIndicator) {
            loadingIndicator.style.display = 'block';
        }
        servicesContainer.style.opacity = '0.5';

        const formData = new FormData(filterForm);
        const category = filterForm.getAttribute('data-category') || 'digital';

        // Prepare data for AJAX request
        const data = {
            category: category,
            priceRange: formData.get('priceRange'),
            sortBy: formData.get('sortBy')
        };

        // Simulate AJAX request (in a real app, this would fetch from the server)
        setTimeout(() => {
            // This would be replaced with actual fetch API call
            // fetch('/api/services/filter', {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(data)
            // })
            // .then(response => response.json())
            // .then(data => {
            //     updateServicesDisplay(data.services);
            // })

            // For demo purposes, we'll just simulate the response
            simulateFilterResponse(data);

            // Hide loading indicator
            if (loadingIndicator) {
                loadingIndicator.style.display = 'none';
            }
            servicesContainer.style.opacity = '1';
        }, 800);
    }

    function simulateFilterResponse(data) {
        // This is a simulation - in a real app, you'd use the actual data from the server
        const services = document.querySelectorAll('.service-card');

        services.forEach(service => {
            service.style.display = 'block';

            // Simulate filtering based on price range
            if (data.priceRange === 'low') {
                // Hide every other service to simulate filtering
                if (Math.random() > 0.5) {
                    service.style.display = 'none';
                }
            } else if (data.priceRange === 'high') {
                // Hide every other service to simulate filtering
                if (Math.random() < 0.5) {
                    service.style.display = 'none';
                }
            }

            // Simulate sorting
            if (data.sortBy === 'name') {
                // In a real app, you would actually reorder the services
            } else if (data.sortBy === 'price') {
                // In a real app, you would actually reorder the services
            }
        });
    }

    function updateServicesDisplay(services) {
        // This function would update the DOM with the filtered services
        // For the demo, we're handling this in simulateFilterResponse
    }

    // Service card hover effect
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        });
    });
});