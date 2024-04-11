from ...db import db

class Brand(db.Model):
    __tablename__ = 'Brand'
    id = db.Column(db.Integer, primary_key=True, autoIncrement=True)
    name_brand = db.Column(db.String(30), nullale=False)

class Models(db.Model):
    __tablename__ = 'Models'
    id = db.Column(db.Integer, primary_key=True, autoIncrement=True)
    name_brand = db.Column(db.String(30), nullale=False)
    id_brand = db.Column(db.Integer,  db.ForeignKey('Brand.id'))

class Vehicle(db.Model):
    __tablename__ = 'Vehicle'
    id = db.Column(db.Integer, primary_key=True, autoIncrement=True)
    id_model = db.Column(db.Integer,  db.ForeignKey('Models.id'))
    year = db.Column(db.Date, nullable=False)
    state = db.Column(db.String, nullable=False)
    mileage = db.Column(db.Float, nullable=True)
