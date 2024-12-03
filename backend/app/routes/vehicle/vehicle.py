import base64
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
    vehicles_list = []
    for vehicle in vehicles:
        
        vehicle_data = {
            'id': vehicle.id,
            'id_model': vehicle.id_model,
            'year': vehicle.year,
            'state': vehicle.state,
            'mileage': vehicle.mileage,
            'image': vehicle.image
        }
        vehicles_list.append(vehicle_data)

    return jsonify(vehicles_list)

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
    image = request.files['image_car']
    image_blob = image.read()  # Converte a imagem em bytes
    image_base64 = base64.b64encode(image_blob).decode('utf-8')
    
    new_vehicle = Vehicle(
        id_model=id_model,
        year=year_car,
        state=state_car,
        mileage=mileage_car,
        image=image_base64
    )
    db.session.add(new_vehicle)
    db.session.commit()
    return redirect(url_for('vehicle.getVehicles'))

@vehicle_bp.route('/<int:id>', methods=['PUT'])
def edit_vehicle(id):
    # Pegar o veículo pelo ID
    vehicle = Vehicle.query.get(id)

    if vehicle is None:
        return jsonify({'error': 'Vehicle not found'}), 404

    try:
        # Pega os dados passados via query params
        id_model = request.args.get('id_model', type=int)
        year_car = request.args.get('year_car', type=int)
        state_car = request.args.get('state_car', type=str)
        mileage_car = request.args.get('mileage_car', type=float)
        image_car = request.args.get('image_car')  # Supondo que a imagem seja passada como base64

        # Atualizar os campos que não são None (ou seja, foram enviados para edição)
        if id_model:
            vehicle.id_model = id_model
        if year_car:
            vehicle.year = year_car
        if state_car:
            vehicle.state = state_car
        if mileage_car:
            vehicle.mileage = mileage_car
        if image_car:
            vehicle.image = image_car  # Imagem passada como base64 já processada
        
        # Confirma as alterações no banco de dados
        db.session.commit()

        return jsonify({'message': f'Vehicle {id} updated successfully'}), 200

    except Exception as e:
        db.session.rollback()  # Faz rollback se houver erro
        return jsonify({'error': f'Error updating vehicle: {str(e)}'}), 500

@vehicle_bp.route('/<int:id>', methods=['DELETE'])
def delete_vehicle(id):
    # Consulta o veículo no banco de dados
    vehicle = Vehicle.query.get(id)
    
    if vehicle is None:
        return jsonify({'error': 'Vehicle not found'}), 404
    
    try:
        db.session.delete(vehicle)  # Remove o veículo do banco
        db.session.commit()  # Confirma a remoção no banco
        return jsonify({'message': f'Vehicle {id} deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()  # Caso haja um erro, faz rollback
        return jsonify({'error': f'Error deleting vehicle: {str(e)}'}), 500
    
@vehicle_bp.route('/model', methods=['GET'])
def model():
    model_id = request.args.get('model_id')
    if not model_id:
        return jsonify({'error': 'model_id parameter is required'}), 400
    
    # Consultar o banco de dados
    model = Models.query.filter_by(id=model_id).first()  # Supondo que a coluna seja 'id'

    if model is None:
        return jsonify({'error': 'Model not found'}), 404

    # Retornar os dados como JSON
    return jsonify({
        'id': model.id,
        'model_name': model.model_name, 
    })

@vehicle_bp.route('/models', methods=['GET'])
def get_models():
    models = Models.query.all()
    models_list = [{'id': model.id, 'model_name': model.model_name, 'id_brand': model.id_brand} for model in models]
    return jsonify(models_list)


@vehicle_bp.route('/brands', methods=['GET'])
def get_brands():
    brands = Brand.query.all()
    brands_list = [{'id': brand.id, 'name_brand': brand.name_brand} for brand in brands]
    return jsonify(brands_list)