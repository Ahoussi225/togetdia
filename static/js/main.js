// Navigation mobile
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');

        // Fermer le menu si on clique sur un lien
        const navLinks = navMenu.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    });
}

// Chatbot functionality - Version corrigée et optimisée
const initializeChatbot = () => {
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotContainer = document.querySelector('.chatbot-container');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');
    const chatbotMessages = document.getElementById('chatbotMessages');

    // Simple chatbot responses
    const chatbotResponses = [
        "Bonjour ! Comment puis-je vous aider aujourd'hui ?",
        "Nous proposons une large gamme de services digitaux et IA.",
        "Pouvez-vous me donner plus de détails sur votre projet ?",
        "Nos développeurs sont disponibles pour discuter de votre projet.",
        "Voulez-vous que je vous mette en contact avec un expert ?",
        "Je peux vous aider à choisir le service qui correspond à vos besoins.",
        "Nos services IA incluent des chatbots, de l'analyse prédictive et bien plus.",
        "Quel type de projet souhaitez-vous développer ?",
        "Je suis là pour vous orienter vers les bons services.",
        "N'hésitez pas à me poser toutes vos questions !"
    ];

    // Réponses contextuelles basées sur des mots-clés
    const keywordResponses = {
        "prix": "Nos prix varient selon le service. Le développement web commence à 990€ et nos services IA à partir de 1290€.",
        "coût": "Nos tarifs sont adaptés à chaque projet. Souhaitez-vous un devis personnalisé ?",
        "devis": "Nous pouvons vous préparer un devis personnalisé. Quel service vous intéresse ?",
        "délai": "Les délais varient de 2 à 8 semaines selon la complexité du projet.",
        "temps": "La durée de réalisation dépend du service choisi. En moyenne 2-4 semaines.",
        "web": "Nous proposons du développement web sur mesure avec les dernières technologies.",
        "site": "Nous créons des sites web modernes, responsives et optimisés SEO.",
        "ia": "Nos services IA incluent chatbots, analyse de données et solutions intelligentes.",
        "chatbot": "Nos chatbots intelligents sont personnalisables et s'intègrent à vos systèmes.",
        "marketing": "Nous offrons des stratégies de marketing digital complètes.",
        "référencement": "Nous optimisons votre site pour le référencement naturel (SEO).",
        "contact": "Vous pouvez nous contacter au +33 1 23 45 67 89 ou par email à contact@togetdia.com",
        "email": "Notre adresse email est contact@togetdia.com",
        "téléphone": "Vous pouvez nous appeler au +33 1 23 45 67 89",
        "adresse": "Nous sommes situés au 123 Rue du Digital, 75000 Paris",
        "merci": "Je vous en prie ! N'hésitez pas si vous avez d'autres questions.",
        "bonjour": "Bonjour ! Comment puis-je vous aider aujourd'hui ?",
        "salut": "Salut ! Je suis là pour vous aider avec nos services.",
        "au revoir": "Au revoir ! N'hésitez pas à revenir si vous avez besoin d'aide.",
        "bye": "À bientôt ! Contactez-nous pour plus d'informations."
    };

    // Fonction pour ajouter un message au chat
    const addMessage = (message, isUser = false) => {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');

        const messageP = document.createElement('p');
        messageP.textContent = message;

        messageDiv.appendChild(messageP);
        chatbotMessages.appendChild(messageDiv);

        // Scroll to bottom avec animation smooth
        chatbotMessages.scrollTo({
            top: chatbotMessages.scrollHeight,
            behavior: 'smooth'
        });
    };

    // Fonction pour générer une réponse intelligente
    const generateResponse = (userMessage) => {
        const lowerMessage = userMessage.toLowerCase();

        // Vérifier les mots-clés spécifiques avec priorité
        for (const [keyword, response] of Object.entries(keywordResponses)) {
            if (lowerMessage.includes(keyword)) {
                return response;
            }
        }

        // Réponses contextuelles pour certaines questions
        if (lowerMessage.includes('comment') && lowerMessage.includes('contacter')) {
            return "Vous pouvez nous contacter par téléphone au +33 1 23 45 67 89, par email à contact@togetdia.com, ou via notre formulaire de contact.";
        }

        if (lowerMessage.includes('heure') && (lowerMessage.includes('ouvert') || lowerMessage.includes('horaire'))) {
            return "Nous sommes ouverts du lundi au vendredi de 9h à 18h, et le samedi de 10h à 16h.";
        }

        if (lowerMessage.includes('service') || lowerMessage.includes('propos') || lowerMessage.includes('offre')) {
            return "Nous proposons des services digitaux (développement web, design, marketing) et des services IA (chatbots, analyse de données). Tapez 'digital' ou 'ia' pour en savoir plus !";
        }

        if (lowerMessage.includes('urgence') || lowerMessage.includes('important')) {
            return "Pour une demande urgente, veuillez nous appeler au +33 6 12 34 56 78. Nous sommes disponibles pour vous aider rapidement.";
        }

        // Réponse aléatoire par défaut
        const randomIndex = Math.floor(Math.random() * chatbotResponses.length);
        return chatbotResponses[randomIndex];
    };

    // Fonction pour envoyer un message
    const sendMessage = () => {
        const message = chatbotInput.value.trim();
        if (message) {
            addMessage(message, true);
            chatbotInput.value = '';

            // Simuler la réflexion du bot avec indicateur de frappe
            const typingIndicator = document.createElement('div');
            typingIndicator.classList.add('message', 'bot-message', 'typing-indicator');
            typingIndicator.innerHTML = '<p>...</p>';
            chatbotMessages.appendChild(typingIndicator);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;

            setTimeout(() => {
                chatbotMessages.removeChild(typingIndicator);
                const botResponse = generateResponse(message);

                // Simuler le temps de frappe en fonction de la longueur du message
                const typingTime = Math.min(1500, botResponse.length * 30);

                setTimeout(() => {
                    addMessage(botResponse, false);

                    // Suggestions automatiques après certaines réponses
                    if (botResponse.includes('service') || botResponse.includes('digital') || botResponse.includes('ia')) {
                        setTimeout(() => {
                            addMessage("Voici quelques suggestions qui pourraient vous intéresser :\n• En savoir plus sur nos services digitaux\n• Découvrir nos solutions IA\n• Demander un devis personnalisé", false);
                        }, 800);
                    }
                }, typingTime);
            }, 1000);
        }
    };

    // Initialisation des événements du chatbot
    if (chatbotToggle && chatbotContainer) {
        chatbotToggle.addEventListener('click', () => {
            chatbotContainer.classList.toggle('active');
            if (chatbotContainer.classList.contains('active')) {
                chatbotInput.focus();
            }
        });
    }

    if (chatbotClose) {
        chatbotClose.addEventListener('click', () => {
            chatbotContainer.classList.remove('active');
        });
    }

    if (chatbotSend && chatbotInput) {
        chatbotSend.addEventListener('click', sendMessage);
        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    // Fermer le chatbot en cliquant à l'extérieur
    document.addEventListener('click', (e) => {
        if (chatbotContainer && chatbotContainer.classList.contains('active') &&
            !chatbotContainer.contains(e.target) &&
            e.target !== chatbotToggle) {
            chatbotContainer.classList.remove('active');
        }
    });

    // Animation d'ouverture du chatbot
    if (chatbotToggle) {
        chatbotToggle.addEventListener('click', () => {
            if (!chatbotContainer.classList.contains('active')) {
                chatbotContainer.style.transform = 'scale(0.8)';
                chatbotContainer.classList.add('active');
                setTimeout(() => {
                    chatbotContainer.style.transform = 'scale(1)';
                }, 50);
            }
        });
    }
};

// Sticky navigation avec optimisation des performances
let scrollTimeout;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');

    // Annimer l'animation précédente
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }

    scrollTimeout = setTimeout(() => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'none';
        }
    }, 10);
});

// Animation on scroll avec Intersection Observer (plus performant)
const initializeAnimations = () => {
    const animatedElements = document.querySelectorAll('.service-card, .feature-card, .contact-info-card');

    // Configuration de l'Observer
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observer chaque élément
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
};

// Chargement différé des images
const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
};

// Initialisation au chargement du document
document.addEventListener('DOMContentLoaded', () => {
    initializeChatbot();
    initializeAnimations();
    lazyLoadImages();

    // Prévenir la fermeture du formulaire avec des données non sauvegardées
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        let formChanged = false;

        form.querySelectorAll('input, textarea, select').forEach(input => {
            input.addEventListener('input', () => {
                formChanged = true;
            });
        });

        window.addEventListener('beforeunload', (e) => {
            if (formChanged) {
                e.preventDefault();
                e.returnValue = '';
            }
        });

        form.addEventListener('submit', () => {
            formChanged = false;
        });
    });
});

// Gestion des erreurs globales
window.addEventListener('error', (e) => {
    console.error('Erreur JavaScript:', e.error);
});

// Polyfill pour les vieux navigateurs
if (!NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}