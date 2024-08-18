from flask import Flask
from flask_cors import CORS
from config import config
from .db import init_db

def create_app(app_config='development'):
    app = Flask(__name__)
    app.config.from_object(config[app_config])

    # Configurações do CORS
    CORS(app, resources={r'/*': {'origins': '*'}}, supports_credentials=True)
    app.config['CORS_HEADERS'] = 'Content-Type'
    
    # Configura o segredo da aplicação
    app.secret_key = 'secret'
    
    # Inicializa o banco de dados
    init_db(app)

    # Importa e registra blueprints
    from .routes.auth.auth import auth_bp
    from .routes.vehicle.vehicle import vehicle_bp
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(vehicle_bp, url_prefix='/vehicle')

    return app
