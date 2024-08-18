from flask_sqlalchemy import SQLAlchemy
from sqlalchemy_utils import database_exists, create_database

db = SQLAlchemy()

def init_db(app):
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:gularte@localhost/cardealer'
    db.init_app(app)

    with app.app_context():
        if not database_exists(db.engine.url):
            create_database(db.engine.url)
        db.create_all()
