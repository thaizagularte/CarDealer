from flask import Blueprint, request, jsonify, url_for, redirect, render_template
from .models import Users
from ...db import db

auth_bp = Blueprint('auth', __name__,
                    template_folder='templates')

@auth_bp.route('/registerUser', methods=['GET','POST'])
def registerUser():
    if request.method == 'POST':
        name = request.form['name']
        email = request.form['email']
        password1 = request.form['password1']
        password2 = request.form['password2']
        
        user = Users.query.filter_by(email=email).first()
        if user:
            return jsonify({'message':'User already exists'})
        elif len(email) < 4:
            return jsonify({'message':'Email must be greater than 3 characters.'})
        elif len(name) < 2:
            return jsonify({'message':'Name must be greater than 1 character.'})
        elif password1 != password2:
            return jsonify({'message':'Passwords dosen\'t match.'})
        elif len(password1) < 7:
            return jsonify({'message':'Password must be at least 7 characters.'})
        else:
            new_user = Users(name=name, email=email, password=password1)
            db.session.add(new_user)
            db.session.commit()
            return jsonify({'message':'User created successfully'})
        
    return render_template('auth/register.html')
