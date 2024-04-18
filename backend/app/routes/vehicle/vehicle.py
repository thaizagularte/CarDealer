from flask import Blueprint, request, jsonify, url_for, redirect, render_template
from .models import Vehicle
from .models import Models
from ...db import db

vehicle_bp = Blueprint('vehicle', __name__,
                    template_folder='templates')

@vehicle_bp.route('/Vehicle', methods=['GET', 'POST'])
def routesVehicle():
    if request.method == 'POST':
        id_model = request.form.get('id_model')
        year_car = request.form.get('year_car')
        state_car = request.form.get('state_car')
        mileage_car = request.form.get('mileage_car')

        new_vehicle = Vehicle(id_model, year_car, state_car,mileage_car)
        db.session.add(new_vehicle)
        db.session.commit()

    elif request.method == 'GET':
        return Vehicle
    

#rota para pegar os modelos

models_bp = Blueprint('models',__name__,
                      template_folder='templates')

@models_bp.route('/Models', methods=['GET'])

def routes_models():
    if request.method == 'GET':
        models = Models.query.all()
        return render_template('addCar.html', models=models)