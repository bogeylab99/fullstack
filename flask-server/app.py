from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from models import db, Student, Job, Application
from config import Config
from routes import job_routes, application_routes 

app = Flask(__name__)
app.config.from_object(Config)
app.config['JWT_SECRET_KEY'] = 'your_secret_key'  

# Initialize CORS
CORS(app, origins=["http://localhost:3000"], supports_credentials=True)

db.init_app(app)
migrate = Migrate(app, db)

jwt = JWTManager(app)

app.register_blueprint(job_routes, url_prefix="/jobs")
app.register_blueprint(application_routes, url_prefix="/applications")

@app.route("/")
def home():
    return jsonify({"message": "Welcome to the Job Portal API!"})

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    print("Received login data:", data)

    user = Student.query.filter_by(email=data.get("email")).first()

    if user and check_password_hash(user.password_hash, data.get("password")):
        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token), 200
    
    return jsonify({"message": "Invalid email or password"}), 401

@app.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
