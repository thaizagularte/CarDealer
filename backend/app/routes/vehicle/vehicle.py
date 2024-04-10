from flask import Blueprint, request, jsonify, url_for, redirect, render_template
from .models import Vehicle
from ...db import db

vehicle_bp = Blueprint('vehicle', __name__,
                    template_folder='templates')

@vehicle_bp.route('/addVehicle', methods=['GET','POST'])
def addVehicle():
    pass