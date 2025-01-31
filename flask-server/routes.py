from flask import Blueprint, request, jsonify
from models import db, Job, Application
from flask_jwt_extended import jwt_required, get_jwt_identity

job_routes = Blueprint("job_routes", __name__)
application_routes = Blueprint("application_routes", __name__)

# 📌 Create Job
@job_routes.route("/", methods=["POST"])
@jwt_required()
def create_job():
    data = request.get_json()

    if not data or not all(key in data for key in ["title", "company", "description"]):
        return jsonify({"message": "Missing data in request!"}), 400

    current_user_id = get_jwt_identity()

    new_job = Job(
        title=data["title"],
        company=data["company"],
        description=data["description"],
        user_id=current_user_id
    )
    
    db.session.add(new_job)
    db.session.commit()

    return jsonify({"message": "Job created successfully"}), 201

# 📌 Get All Jobs
@job_routes.route("/", methods=["GET"])
def get_jobs():
    jobs = Job.query.all()

    if not jobs:
        return jsonify({"message": "No jobs found!"}), 404

    return jsonify([{
        "id": job.id,
        "title": job.title,
        "company": job.company,
        "description": job.description
    } for job in jobs])

# 📌 Apply for a Job
@application_routes.route("/", methods=["POST"])
@jwt_required()
def apply_for_job():
    data = request.get_json()

    if not data or "job_id" not in data:
        return jsonify({"message": "Missing required data!"}), 400

    current_student_id = get_jwt_identity()

    new_application = Application(
        student_id=current_student_id,
        job_id=data["job_id"]
    )
    
    db.session.add(new_application)
    db.session.commit()

    return jsonify({"message": "Application submitted successfully"}), 201
