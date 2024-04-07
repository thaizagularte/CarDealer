from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
Cors = CORS(app)
CORS(app, resources={r'/*': {'origins': '*'}},CORS_SUPPORTS_CREDENTIALS = True)
app.config['CORS_HEADERS'] = 'Content-Type'
app.secret_key = 'secret'

@app.route('/api', methods=['POST'])
def hello():
    return jsonify({'message': 'Hello, World!'})

if __name__ == 'main':
    app.run(debug=True)