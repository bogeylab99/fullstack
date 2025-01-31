from app import app, db
from models import Student, Job, Application

with app.app_context():
    db.create_all()

    # Add sample students
    student1 = Student(name="Alice", email="alice@example.com")
    student2 = Student(name="Bob", email="bob@example.com")

    # Add sample jobs
    job1 = Job(title="Software Engineer", company="Google", description="Develop web applications.")
    job2 = Job(title="Data Analyst", company="Amazon", description="Analyze business data.")

    db.session.add_all([student1, student2, job1, job2])
    db.session.commit()

    # Create sample job applications
    application1 = Application(student_id=student1.id, job_id=job1.id, status="pending")
    application2 = Application(student_id=student2.id, job_id=job2.id, status="accepted")

    db.session.add_all([application1, application2])
    db.session.commit()

    print("Database seeded successfully!")
