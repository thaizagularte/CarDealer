from flask import Blueprint, redirect, request, render_template, url_for
from .models import Vehicle, Models
from ...db import db

vehicle_bp = Blueprint('vehicle', __name__, template_folder='templates')

#ROTA PARA LISTAR VEICULOS
@vehicle_bp.route('/vehicle', methods=['GET'])
def get_vehicles():
    vehicles = Vehicle.query.all()
    return render_template('vehicles.html', vehicles=vehicles)

#ROTA PARA ABRIR TEMPLATE DE ADICIONAR VEICULO
@vehicle_bp.route('/vehicleAdd', methods=['GET'])
def add_vehicle():
    models = Models.query.all()
    return render_template('addCar.html', models=models)

#ROTA QUE ADICIONA O NOVO VEICULO
@vehicle_bp.route('/vehicle/add', methods=['POST'])
def new_vehicle():
    id_model = request.form.get('id_model')
    year_car = request.form.get('year_car')
    state_car = request.form.get('state_car')
    mileage_car = request.form.get('mileage_car')
    value_car = request.form.get('value_car')
    description_car = request.form.get('description_car')
    new_vehicle = Vehicle(
        id_model=id_model,
        year=year_car,
        state=state_car,
        mileage=mileage_car,
        value=value_car,
        description=description_car
    )
    db.session.add(new_vehicle)
    db.session.commit()
    return redirect(url_for('vehicle.get_vehicles'))
