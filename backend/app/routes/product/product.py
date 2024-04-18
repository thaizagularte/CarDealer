from flask import Blueprint, request, jsonify, url_for, redirect, render_template
from .models import Product
from ...db import db

product_bp = Blueprint('vehicle', __name__,
                    template_folder='templates')

@product_bp.route('/Product', methods=['GET', 'POST'])
def routesProduct():
    if request.method == 'POST':
        id_user = request.form.get('id_user')
        id_vehicle = request.form.get('id_car')
        name_car = request.form.get('name_car')
        value_car = request.form.get('value_car')
        description_car = request.form.get('description_car')

        new_product = Product(id_user,id_vehicle,name_car,value_car,description_car)
        db.session.add(new_product)
        db.session.commit()

    elif request.method == 'GET':
        return render_template('product.html')    #leva pro template que mostra os produtos