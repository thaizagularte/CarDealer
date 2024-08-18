from flask import Blueprint, redirect, request, render_template, url_for, jsonify
import time
from .models import Vehicle, Models, Brand
from ...db import db


vehicle_bp = Blueprint('vehicle', __name__, 
                    template_folder='templates')

#ROTA PARA LISTAR VEICULOS
@vehicle_bp.route('/getVehicles', methods=['GET'])
def getVehicles():
    vehicles = Vehicle.query.all()
    return render_template('vehicle/vehicles.html', vehicles=vehicles)

@vehicle_bp.route('/get_models_by_brand', methods=['GET'])
def get_models_by_brand():
    brand_id = request.args.get('brand_id')
    
    # Fetch models by the provided brand_id
    models = Models.query.filter_by(id_brand=brand_id).all()
    
    # Serialize the data
    models_list = [{'id': model.id, 'model_name': model.model_name} for model in models]
    
    # Return the models as JSON
    return jsonify(models_list)

#ROTA PARA ABRIR TEMPLATE DE ADICIONAR VEICULO
@vehicle_bp.route('/addVehicle', methods=['GET'])
def addVehicle():
    models = Models.query.all()
    brands = Brand.query.all()  # Get all brands to populate the brand dropdown
    return render_template('vehicle/addCar.html', models=models, brands=brands)

#ROTA QUE ADICIONA O NOVO VEICULO
@vehicle_bp.route('/add', methods=['POST'])
def new_vehicle():
    id_model = int(request.form.get('id_model'))
    year_car = int(request.form.get('year_car'))
    state_car = request.form.get('state_car')
    mileage_car = float(request.form.get('mileage_car'))
    new_vehicle = Vehicle(
        id_model=id_model,
        year=year_car,
        state=state_car,
        mileage=mileage_car
    )
    db.session.add(new_vehicle)
    db.session.commit()
    return redirect(url_for('vehicle.getVehicles'))
