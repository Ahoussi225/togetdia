from flask import Flask, render_template, request, redirect, url_for, session, jsonify, abort
from functools import wraps

app = Flask(__name__)
app.secret_key = 'votre_cle_secrete_ici'

# Données complètes des services
services_data = {
    'digital': [
        {
            'id': 1,
            'title': 'Développement Web',
            'description': 'Création de sites web modernes et responsives',
            'price': 'À partir de 643.500fcfa',
            'image': 'web-dev.jpg',
            'delivery_time': '2-4 semaines',
            'features': [
                'Design responsive adapté à tous les appareils',
                'Intégration SEO pour une meilleure visibilité',
                'Interface administrateur intuitive',
                'Optimisation des performances',
                'Sécurité renforcée',
                'Support technique 24/7'
            ],
            'long_description': 'Nous créons des sites web modernes, responsives et optimisés pour le référencement. Notre équipe de développeurs expérimentés utilise les dernières technologies pour garantir des performances optimales.',
            'process': [
                'Consultation et analyse des besoins',
                'Conception et maquettage',
                'Développement et intégration',
                'Tests et validation',
                'Formation et livraison'
            ]
        },
        {
            'id': 2,
            'title': 'Design Graphique',
            'description': 'Conceptions visuelles percutantes pour votre marque',
            'price': 'À partir de 318.500fcfa',
            'image': 'graphic-design.jpg',
            'delivery_time': '1-2 semaines',
            'features': [
                'Logo et identité visuelle',
                'Charte graphique complète',
                'Design d\'interface utilisateur',
                'Supports print et digitaux',
                'Recommandations stratégiques',
                'Fichiers sources fournis'
            ],
            'long_description': 'Notre équipe de designers talentueux crée des identités visuelles fortes qui renforcent votre image de marque et captivent votre audience.',
            'process': [
                'Audit de l\'existant',
                'Brainstorming créatif',
                'Concepts initiaux',
                'Révisions et ajustements',
                'Livraison des fichiers finaux'
            ]
        },
        {
            'id': 3,
            'title': 'Marketing Digital',
            'description': 'Stratégies digitales pour augmenter votre visibilité',
            'price': 'À partir de 513.500fcfa',
            'image': 'digital-marketing.jpg',
            'delivery_time': '3-6 semaines',
            'features': [
                'Audit marketing complet',
                'Stratégie de contenu',
                'Campagnes publicitaires',
                'Analyse des performances',
                'Optimisation continue',
                'Reporting mensuel'
            ],
            'long_description': 'Développez votre présence en ligne avec nos stratégies de marketing digital sur mesure, conçues pour maximiser votre ROI et atteindre votre public cible.',
            'process': [
                'Analyse du marché et concurrence',
                'Définition des objectifs',
                'Mise en œuvre stratégique',
                'Monitoring et optimisation',
                'Analyse des résultats'
            ]
        },
        {
            'id': 4,
            'title': 'Rédaction SEO',
            'description': 'Contenu optimisé pour le référencement naturel',
            'price': 'À partir de 100.000fcfa',
            'image': 'seo-writing.jpg',
            'delivery_time': '1-3 jours',
            'features': [
                'Recherche de mots-clés',
                'Contenu optimisé SEO',
                'Structure sémantique',
                'Intégration des balises',
                'Relecture et correction',
                'Guidelines de style'
            ],
            'long_description': 'Notre équipe de rédacteurs experts crée du contenu engageant et optimisé pour le référencement, boostant votre visibilité sur les moteurs de recherche.',
            'process': [
                'Briefing et analyse',
                'Recherche sémantique',
                'Rédaction du contenu',
                'Optimisation SEO',
                'Validation et livraison'
            ]
        }
    ],
    'ia': [
        {
            'id': 1,
            'title': 'Chatbot Intelligent',
            'description': 'Assistant conversationnel personnalisé pour votre entreprise',
            'price': 'À partir de 838.500fcfa',
            'image': 'chatbot.jpg',
            'delivery_time': '3-5 semaines',
            'features': [
                'Interface conversationnelle naturelle',
                'Intégration multi-canaux',
                'Apprentissage automatique',
                'Analytics et reporting',
                'Maintenance incluse',
                'Formation de l\'équipe'
            ],
            'long_description': 'Développez des chatbots intelligents qui améliorent l\'expérience client et automatisent vos processus métier avec l\'intelligence artificielle.',
            'process': [
                'Analyse des besoins clients',
                'Design de l\'expérience conversationnelle',
                'Développement et entraînement',
                'Tests et validation',
                'Déploiement et formation'
            ]
        },
        {
            'id': 2,
            'title': 'Analyse Prédictive',
            'description': 'Solutions IA pour anticiper les tendances du marché',
            'price': 'À partir de 1.293.500fcfa',
            'image': 'predictive-analysis.jpg',
            'delivery_time': '4-8 semaines',
            'features': [
                'Collecte et nettoyage des données',
                'Modèles prédictifs avancés',
                'Tableaux de bord interactifs',
                'Alertes automatiques',
                'Recommandations actionnables',
                'Support technique expert'
            ],
            'long_description': 'Utilisez la puissance de l\'IA pour anticiper les tendances, prévoir les comportements clients et prendre des décisions data-driven.',
            'process': [
                'Audit des données disponibles',
                'Développement des modèles',
                'Entraînement et validation',
                'Intégration des résultats',
                'Formation à l\'utilisation'
            ]
        },
        {
            'id': 3,
            'title': 'Reconnaissance d\'Images',
            'description': 'Systèmes de vision par ordinateur sur mesure',
            'price': 'À partir de 1.618.500fcfa',
            'image': 'image-recognition.jpg',
            'delivery_time': '6-10 semaines',
            'features': [
                'Algorithmes de computer vision',
                'Traitement d\'images avancé',
                'Intégration API',
                'Interface utilisateur intuitive',
                'Documentation complète',
                'Maintenance évolutive'
            ],
            'long_description': 'Développez des solutions de reconnaissance d\'images sur mesure pour automatiser vos processus et extraire des insights visuels précieux.',
            'process': [
                'Définition des cas d\'usage',
                'Collecte et annotation des données',
                'Développement des algorithmes',
                'Tests de performance',
                'Déploiement en production'
            ]
        },
        {
            'id': 4,
            'title': 'Traitement du Langage',
            'description': 'Solutions NLP pour analyser et générer du texte',
            'price': 'À partir de 1.163.500fcfa',
            'image': 'nlp.jpg',
            'delivery_time': '4-7 semaines',
            'features': [
                'Analyse de sentiment',
                'Classification de texte',
                'Génération de contenu',
                'Résumé automatique',
                'Multi-langues support',
                'API RESTful'
            ],
            'long_description': 'Exploitez la puissance du NLP pour analyser, comprendre et générer du contenu textuel de manière automatisée et intelligente.',
            'process': [
                'Analyse des besoins linguistiques',
                'Développement des modèles NLP',
                'Entraînement sur données spécifiques',
                'Optimisation des performances',
                'Intégration et déploiement'
            ]
        }
    ]
}


# Route pour les détails des services dynamiques
@app.route('/service/<category>/<int:service_id>')
def service_detail(category, service_id):
    services = services_data.get(category, [])
    service = next((s for s in services if s['id'] == service_id), None)

    if not service:
        abort(404)

    return render_template('service_detail.html',
                           service=service,
                           category=category,
                           category_name="Services Digitaux" if category == "digital" else "Services IA")


@app.context_processor
def inject_global_data():
    return dict(services_data=services_data)

# Decorator pour les routes nécessitant une authentification
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if 'user_id' not in session:
            return redirect(url_for('login', next=request.url))
        return f(*args, **kwargs)

    return decorated_function


@app.route('/')
def index():
    return render_template('index.html', services_data=services_data)


# Route pour les services digitaux (alias pour compatibilité)
@app.route('/services')
def services():
    return redirect(url_for('digital_services'))


@app.route('/service-digital/')
def digital_services():
    category = 'digital'
    services = services_data.get(category, [])
    return render_template('services.html', services=services, category=category, title="Services Digitaux")


@app.route('/service-ia/')
def ia_services():
    category = 'ia'
    services = services_data.get(category, [])
    return render_template('services.html', services=services, category=category, title="Services IA")


@app.route('/service-ia/ola/services/developpent-de-site-web')
def web_development_service():
    service = {
        'title': 'Développement de Site Web',
        'description': 'Nous créons des sites web modernes, responsives et optimisés pour le référencement. Notre équipe de développeurs expérimentés utilise les dernières technologies pour garantir des performances optimales.',
        'features': [
            'Design responsive adapté à tous les appareils',
            'Intégration SEO pour une meilleure visibilité',
            'Interface administrateur intuitive',
            'Optimisation des performances',
            'Sécurité renforcée',
            'Support technique 24/7'
        ],
        'price': 'À partir de 990€',
        'delivery_time': '2-4 semaines',
        'image': 'web-development.jpg'
    }
    return render_template('service_detail.html', service=service)


@app.route('/m/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')

        # Validation basique (à remplacer par une vraie vérification)
        if username and password:
            session['user_id'] = 1
            session['username'] = username

            next_page = request.args.get('next')
            if next_page:
                return redirect(next_page)
            return redirect(url_for('dashboard'))

    return render_template('login.html')


@app.route('/m/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')
        confirm_password = request.form.get('confirm_password')

        # Validation basique
        if password == confirm_password and username and email:
            session['user_id'] = 1
            session['username'] = username
            return redirect(url_for('dashboard'))

    return render_template('register.html')


@app.route('/m/account')
@login_required
def dashboard():
    return render_template('dashboard.html', username=session.get('username'))


@app.route('/logout')
def logout():
    session.clear()
    return redirect(url_for('index'))


@app.route('/api/services/filter', methods=['POST'])
def filter_services():
    data = request.get_json()
    category = data.get('category', 'digital')
    price_range = data.get('priceRange', 'all')
    sort_by = data.get('sortBy', 'default')

    # Filtrage factice pour la démonstration
    filtered_services = services_data.get(category, [])

    # Simulation de filtrage par prix
    if price_range == 'low':
        filtered_services = filtered_services[:2]  # Prendre les 2 premiers (moins chers)
    elif price_range == 'high':
        filtered_services = filtered_services[2:]  # Prendre les 2 derniers (plus chers)

    # Simulation de tri
    if sort_by == 'name':
        filtered_services = sorted(filtered_services, key=lambda x: x['title'])
    elif sort_by == 'price':
        filtered_services = sorted(filtered_services, key=lambda x: x['price'])

    return jsonify(services=filtered_services)


@app.errorhandler(404)
def not_found_error(error):
    return render_template('404.html'), 404


@app.route('/contact')
def contact():
    return render_template('contact.html')


@app.route('/about')
def about():
    return render_template('about.html')


if __name__ == '__main__':
    app.run(debug=True)