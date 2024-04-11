import datetime
from ...db import db
from auth.models import User
from vehicle.models import Vehicle

class Product(db.Model):
    __tablename__ = 'Product'
    id = db.Column(db.Integer, primary_key=True)
    id_user = db.Column(db.Integer, db.ForeignKey(User.id))
    id_vehicle = db.Column(db.Integer, db.ForeignKey(Vehicle.id))
    value = db.Column(db.Float, nullable=False)
    description = db.Column(db.String, nullable=False)
    date_of_publication = db.Column(db.DateTime, default=datetime.utcnow)
    active = db.Column(db.Boolean, default=True)
    