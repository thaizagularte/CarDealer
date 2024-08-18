import datetime
from ...db import db
from app.routes.auth.models import User
from app.routes.vehicle.models import Vehicle

class Product(db.Model):
    __tablename__ = 'product'
    id = db.Column(db.Integer, primary_key=True)
    id_user = db.Column(db.Integer, db.ForeignKey(User.id))
    id_vehicle = db.Column(db.Integer, db.ForeignKey(Vehicle.id))
    value = db.Column(db.Float, nullable=False)
    description = db.Column(db.String, nullable=False)
    date_of_publication = db.Column(db.DateTime, default=datetime.UTC)
    active = db.Column(db.Boolean, default=True)
    