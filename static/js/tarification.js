// Données des packages
const packagesData = {
    bronze: {
        name: "BRONZE",
        users: "500 – 5.000",
        publications: 2,
        pageSponsoring: 1,
        visualSponsoring: 1,
        tocetPublications: 1,
        statistics: 0,
        prices: {
            linkedin: 550000,
            facebook: 550000,
            twitter: 450000,
            instagram: 350000
        }
    },
    silver: {
        name: "SILVER",
        users: "5.501 – 10.000",
        publications: 3,
        pageSponsoring: 2,
        visualSponsoring: 2,
        tocetPublications: 2,
        statistics: 0,
        prices: {
            linkedin: 850000,
            facebook: 850000,
            twitter: 750000,
            instagram: 650000
        }
    },
    gold: {
        name: "GOLD",
        users: "10.001 – 15.000",
        publications: 4,
        pageSponsoring: 3,
        visualSponsoring: 3,
        tocetPublications: 3,
        statistics: 1,
        prices: {
            linkedin: 1250000,
            facebook: 1250000,
            twitter: 1150000,
            instagram: 950000
        }
    },
    platinum: {
        name: "PLATINUM",
        users: "15.001 et Plus",
        publications: 5,
        pageSponsoring: 4,
        visualSponsoring: 4,
        tocetPublications: 4,
        statistics: 2,
        prices: {
            linkedin: 1550000,
            facebook: 1550000,
            twitter: 1450000,
            instagram: 1250000
        }
    }
};

// Formater les prix en FCFA
function formatPrice(price) {
    return new Intl.NumberFormat('fr-FR').format(price) + " FCFA";
}

// Générer les cartes de package
function generatePackageCards(platform = 'all') {
    const packageContainer = document.getElementById('packagesContainer');
    packageContainer.innerHTML = '';

    for (const [key, packageData] of Object.entries(packagesData)) {
        const packageElement = document.createElement('div');
        packageElement.className = `package ${key}`;

        let priceText = '';
        if (platform === 'all') {
            priceText = `
                <div class="package-price">
                    LinkedIn: ${formatPrice(packageData.prices.linkedin)}<br>
                    Facebook: ${formatPrice(packageData.prices.facebook)}<br>
                    Twitter: ${formatPrice(packageData.prices.twitter)}<br>
                    Instagram: ${formatPrice(packageData.prices.instagram)}
                </div>
            `;
        } else {
            priceText = `
                <div class="package-price">
                    ${formatPrice(packageData.prices[platform])}
                </div>
            `;
        }

        packageElement.innerHTML = `
            <div class="package-header">
                ${packageData.name}
            </div>
            <div class="package-content">
                <div class="package-feature">
                    <strong>Internautes/mois:</strong> <span>${packageData.users}</span>
                </div>
                <div class="package-feature">
                    <strong>Publications/semaine:</strong> <span>${packageData.publications}</span>
                </div>
                <div class="package-feature">
                    <strong>Sponsoring page/mois:</strong> <span>${packageData.pageSponsoring}</span>
                </div>
                <div class="package-feature">
                    <strong>Sponsoring visuel/mois:</strong> <span>${packageData.visualSponsoring}</span>
                </div>
                <div class="package-feature">
                    <strong>Publications TOÇET Business/mois:</strong> <span>${packageData.tocetPublications}</span>
                </div>
                <div class="package-feature">
                    <strong>Tableaux de statistiques:</strong> <span>${packageData.statistics > 0 ? packageData.statistics + ' par mois' : 'Non inclus'}</span>
                </div>
                ${priceText}
            </div>
        `;

        packageContainer.appendChild(packageElement);
    }
}

// Initialiser la page
document.addEventListener('DOMContentLoaded', function() {
    // Générer les cartes initiales
    generatePackageCards();

    // Gérer le changement de plateforme
    const platformSelector = document.getElementById('platform');
    if (platformSelector) {
        platformSelector.addEventListener('change', function() {
            const selectedPlatform = this.value;
            generatePackageCards(selectedPlatform === 'all' ? 'all' : selectedPlatform);
        });
    }
});