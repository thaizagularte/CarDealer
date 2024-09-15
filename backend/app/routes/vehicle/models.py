from ...db import db

# Brand Model
class Brand(db.Model):
    __tablename__ = 'brand'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name_brand = db.Column(db.String(30), nullable=False)

    # Define relationship with Models
    models = db.relationship('Models', backref='brand', lazy=True)

# Models Model
class Models(db.Model):
    __tablename__ = 'models'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    model_name = db.Column(db.String(30), nullable=False)  # Changed to model_name
    id_brand = db.Column(db.Integer, db.ForeignKey('brand.id'))

    # Define relationship with Vehicles
    vehicles = db.relationship('Vehicle', backref='model', lazy=True)

# Vehicle Model
class Vehicle(db.Model):
    __tablename__ = 'vehicle'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    id_model = db.Column(db.Integer, db.ForeignKey('models.id'))
    year = db.Column(db.Integer, nullable=False)
    state = db.Column(db.String(20), nullable=False)
    mileage = db.Column(db.Float, nullable=True)
    image = db.Column(db.String, nullable=True) 