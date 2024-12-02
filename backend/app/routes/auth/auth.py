from flask import Blueprint, request, jsonify, url_for, redirect, render_template
from .models import User, UserCPF, UserCNPJ
from ...db import db

auth_bp = Blueprint('auth', __name__, template_folder='templates')

def is_cpf(document):
    # Add validation logic for CPF (typically 11 digits)
    return len(document) == 14

def is_cnpj(document):
    # Add validation logic for CNPJ (typically 14 digits)
    return len(document) == 18

@auth_bp.route('/registerUser', methods=['GET', 'POST'])
def registerUser():
    if request.method == 'POST':
        data = request.json  # Pega os dados da requisição como JSON

        username = data.get('name')
        email = data.get('email')
        password1 = data.get('password1')
        password2 = data.get('password2')
        document_number = data.get('cpf_cnpj')

        # Validar entrada
        user = User.query.filter_by(email=email).first()
        if user:
            return jsonify({'message': 'User already exists'}), 400
        elif len(email) < 4:
            return jsonify({'message': 'Email must be greater than 3 characters.'}), 400
        elif len(username) < 2:
            return jsonify({'message': 'Name must be greater than 1 character.'}), 400
        elif password1 != password2:
            return jsonify({'message': 'Passwords don\'t match.'}), 400
        elif len(password1) < 7:
            return jsonify({'message': 'Password must be at least 7 characters.'}), 400
        elif not is_cpf(document_number) and not is_cnpj(document_number):
            return jsonify({'message': 'Invalid CPF or CNPJ.'}), 400

        # Criar novo usuário
        new_user = User(username=username, email=email, password=password1, document_number=document_number)
        db.session.add(new_user)
        db.session.flush()  # Obter ID do usuário sem fazer commit ainda

        # Determinar se é CPF ou CNPJ e criar o registro correspondente
        if is_cpf(document_number):
            date_of_birth = data.get('date_of_birth')
            if not date_of_birth:
                return jsonify({'message': 'Date of Birth is required for CPF.'}), 400
            user_cpf = UserCPF(user_id=new_user.id, name=username, date_of_birth=date_of_birth)
            db.session.add(user_cpf)
        elif is_cnpj(document_number):
            company_name = data.get('company_name')
            date_of_foundation = data.get('date_of_foundation')
            if not company_name or not date_of_foundation:
                return jsonify({'message': 'Company Name and Date of Foundation are required for CNPJ.'}), 400
            user_cnpj = UserCNPJ(user_id=new_user.id, company_name=company_name, date_of_foundation=date_of_foundation)
            db.session.add(user_cnpj)
        
        # Commit das mudanças
        db.session.commit()
        
        return jsonify({'message': 'User created successfully'}), 201

    return render_template('auth/register.html')
@auth_bp.route('/login', methods=['GET', 'POST'])

def login():
    return render_template('auth/login.html')