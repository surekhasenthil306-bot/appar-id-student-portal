"""
seed_data.py — Pre-populates the SQLite database with realistic Indian student records
=====================================================================================
BEGINNER EXPLANATION:
  When you create a brand new database, it starts completely empty.
  This script fills it with realistic sample data that matches your React frontend:
    - Colleges: SKCET Coimbatore, CIT Coimbatore, GCT Coimbatore
    - Students: R. Karthik (CSE 3rd Year), S. Pavithra, M. Vigneshwaran
    - User Accounts:
        * Student: karthik001cs@gmail.com / password: "123456"
        * Student: karthik.r22cse@skcet.ac.in / password: "123456"
        * Admin: admin@aicte.gov.in / password: "admin123"
        * Nodal: nodal.skcet@skcet.ac.in / password: "nodal123"
    - Official 12-digit APAAR IDs, DigiLocker marksheet records, AICTE circulars,
      5-step institutional verification roadmap, and sample grievance tickets.

HOW TO RUN:
  python seed_data.py
"""

from database import SessionLocal, engine, Base
from models import (
    Institution,
    Student,
    UserAccount,
    Document,
    Notification,
    VerificationStatus,
    VerificationStep,
    GrievanceTicket
)
from auth.hashing import hash_password


def seed_database():
    # 1. Re-create tables
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()

    print("[*] Starting database seeding with realistic APAAR portal data...")

    # Avoid duplicate seeding if data already exists
    if db.query(Institution).first():
        print("[!] Database already populated. Skipping duplicate seeding.")
        db.close()
        return

    # ─────────────────────────────────────────────────────────────
    # 1. Institutions
    # ─────────────────────────────────────────────────────────────
    skcet = Institution(
        name="Sri Krishna College of Engineering and Technology, Coimbatore",
        short_name="SKCET Coimbatore",
        anna_univ_code="7135",
        aicte_id="1-45629108",
        city="Coimbatore",
        state="Tamil Nadu",
        address="BK Pudur, Sugunapuram East, Kuniyamuthur, Coimbatore - 641008, Tamil Nadu",
        affiliation="Anna University, Chennai (Autonomous Institution • Approved by AICTE)"
    )

    cit = Institution(
        name="Coimbatore Institute of Technology (CIT), Coimbatore",
        short_name="CIT Coimbatore",
        anna_univ_code="7176",
        aicte_id="1-32918402",
        city="Coimbatore",
        state="Tamil Nadu",
        address="Civil Aerodrome Post, Peelamedu, Coimbatore - 641014, Tamil Nadu",
        affiliation="Anna University, Chennai (Government Aided Autonomous Institution)"
    )

    gct = Institution(
        name="Government College of Technology (GCT), Coimbatore",
        short_name="GCT Coimbatore",
        anna_univ_code="7100",
        aicte_id="1-10294819",
        city="Coimbatore",
        state="Tamil Nadu",
        address="Thadagam Road, Coimbatore - 641013, Tamil Nadu",
        affiliation="Anna University, Chennai (State Government Autonomous Institution)"
    )

    db.add_all([skcet, cit, gct])
    db.commit()
    print("  [+] Inserted 3 Tamil Nadu Higher Technical Institutions.")

    # ─────────────────────────────────────────────────────────────
    # 2. Primary Student: R. Karthik (Matching React Frontend)
    # ─────────────────────────────────────────────────────────────
    karthik = Student(
        institution_id=skcet.id,
        apaar_id="4829-1058-3921",
        abc_id="ABC-784-219-042",
        aicte_permanent_id="1-45629108",
        full_name="R. Karthik",
        dob="18-05-2003",
        gender="Male",
        blood_group="B +ve",
        category="BC / General",
        community="BC",
        nationality="Indian",
        domicile_state="Tamil Nadu",
        mother_tongue="Tamil",
        religion="Hindu",
        differently_abled="No",
        aadhaar_masked="XXXX-XXXX-4921",
        aadhaar_kyc_status="e-KYC Verified (UIDAI OTP Seeded)",
        father_name="K. Ramanathan",
        father_occupation="Senior Accountant",
        mother_name="R. Meenakshi",
        mother_occupation="Homemaker",
        guardian_mobile="+91 94432 18765",
        email="karthik001cs@gmail.com",
        alternate_email="karthik.r22cse@skcet.ac.in",
        mobile="+91 98421 76540",
        permanent_address="No. 42, Bharathiar Street, RS Puram, Coimbatore - 641002, Tamil Nadu",
        correspondence_address="No. 42, Bharathiar Street, RS Puram, Coimbatore - 641002, Tamil Nadu",
        district="Coimbatore",
        pincode="641002",
        department="Computer Science & Engineering",
        degree="B.E. (Computer Science & Engineering)",
        academic_year="2024 - 2025",
        current_year="3rd Year",
        current_semester="Semester VI",
        admission_type="Single Window Counselling (TNEA 2022)",
        enrollment_no="22CSE104",
        register_no="713522104084",
        roll_no="22CS104",
        cgpa=8.78,
        credits_completed=138,
        total_credits_required=165,
        academic_status="Regular / In Good Standing",
        admission_date="24-Aug-2022",
        expected_graduation="May 2026",
        mentor_faculty="Dr. K. Senthil Kumar (Associate Professor, CSE)",
        hod_name="Dr. N. Susila (Prof. & HoD, CSE)"
    )

    pavithra = Student(
        institution_id=cit.id,
        apaar_id="6194-8201-3475",
        abc_id="ABC-512-904-118",
        aicte_permanent_id="1-32918402",
        full_name="S. Pavithra",
        dob="05-11-2002",
        gender="Female",
        blood_group="O +ve",
        category="BC",
        community="BC",
        nationality="Indian",
        domicile_state="Tamil Nadu",
        mother_tongue="Tamil",
        religion="Hindu",
        differently_abled="No",
        aadhaar_masked="XXXX-XXXX-8114",
        aadhaar_kyc_status="e-KYC Verified",
        father_name="M. Sivakumar",
        mother_name="S. Gomathi",
        email="pavithra.s@cit.edu.in",
        mobile="+91 97890 12345",
        register_no="717621105042",
        department="Electronics & Communication Engineering",
        degree="B.E. (ECE)",
        academic_year="2024 - 2025",
        current_year="4th Year",
        current_semester="Semester VIII",
        cgpa=9.12,
        credits_completed=154
    )

    vignesh = Student(
        institution_id=gct.id,
        apaar_id="8392-1740-9281",
        abc_id="ABC-331-409-772",
        aicte_permanent_id="1-10294819",
        full_name="M. Vigneshwaran",
        dob="12-07-2004",
        gender="Male",
        blood_group="A +ve",
        category="MBC",
        community="MBC",
        nationality="Indian",
        domicile_state="Tamil Nadu",
        mother_tongue="Tamil",
        religion="Hindu",
        differently_abled="No",
        aadhaar_masked="XXXX-XXXX-9281",
        aadhaar_kyc_status="e-KYC Verified",
        father_name="P. Murugesan",
        mother_name="M. Shanthi",
        email="vignesh.m@gct.ac.in",
        mobile="+91 94421 88990",
        register_no="710023102061",
        department="Mechanical Engineering",
        degree="B.E. (Mechanical)",
        academic_year="2024 - 2025",
        current_year="2nd Year",
        current_semester="Semester IV",
        cgpa=8.24,
        credits_completed=76
    )

    db.add_all([karthik, pavithra, vignesh])
    db.commit()
    print("  [+] Inserted 3 student records (R. Karthik, S. Pavithra, M. Vigneshwaran).")

    # ─────────────────────────────────────────────────────────────
    # 3. User Accounts (for logging into the portal)
    # ─────────────────────────────────────────────────────────────
    # Password for testing: "123456" for student, "admin123" for admin
    student_pw_hash = hash_password("123456")
    admin_pw_hash = hash_password("admin123")
    nodal_pw_hash = hash_password("nodal123")

    user_karthik = UserAccount(
        email="karthik001cs@gmail.com",
        mobile="+91 98421 76540",
        hashed_password=student_pw_hash,
        role="student",
        is_active=True,
        student_id=karthik.id
    )

    user_admin = UserAccount(
        email="admin@aicte.gov.in",
        mobile="9876543210",
        hashed_password=admin_pw_hash,
        role="admin",
        is_active=True,
        student_id=None
    )

    user_nodal = UserAccount(
        email="nodal.skcet@skcet.ac.in",
        mobile="9443210000",
        hashed_password=nodal_pw_hash,
        role="nodal_officer",
        is_active=True,
        student_id=None
    )

    db.add_all([user_karthik, user_admin, user_nodal])
    db.commit()
    print("  [+] Inserted user login credentials (Student, Admin, Nodal Officer).")

    # ─────────────────────────────────────────────────────────────
    # 4. Student Documents
    # ─────────────────────────────────────────────────────────────
    docs = [
        Document(
            student_id=karthik.id,
            doc_ref_id="DOC-101",
            title="Parental Consent & APAAR Authorization Form",
            category="Identity & Consent",
            is_mandatory=True,
            status="Verified",
            uploaded_date="14-Sep-2023",
            file_name="SKCET_Parent_Consent_Signed.pdf",
            file_size="1.2 MB",
            source="Student Upload",
            admin_remarks="Verified by SKCET Academic Section. Stored in institutional depository."
        ),
        Document(
            student_id=karthik.id,
            doc_ref_id="DOC-102",
            title="Masked e-Aadhaar Card",
            category="Identity & Consent",
            is_mandatory=True,
            status="Verified",
            uploaded_date="14-Sep-2023",
            file_name="Masked_eAadhaar_UIDAI.pdf",
            file_size="750 KB",
            source="DigiLocker Sync",
            admin_remarks="Authenticated using UIDAI OTP gateway."
        ),
        Document(
            student_id=karthik.id,
            doc_ref_id="DOC-103",
            title="10th Standard (SSLC) Mark Sheet",
            category="Academic Records",
            is_mandatory=True,
            status="Verified",
            uploaded_date="24-Aug-2022",
            file_name="TN_SSLC_MarkSheet_2019.pdf",
            file_size="1.8 MB",
            source="DigiLocker Sync",
            admin_remarks="Date of Birth and Candidate Name verified against TN State Board."
        ),
        Document(
            student_id=karthik.id,
            doc_ref_id="DOC-104",
            title="12th Standard (HSC) Mark Sheet",
            category="Academic Records",
            is_mandatory=True,
            status="Verified",
            uploaded_date="24-Aug-2022",
            file_name="TN_HSC_MarkSheet_2021.pdf",
            file_size="1.9 MB",
            source="DigiLocker Sync",
            admin_remarks="Cut-off marks and eligibility verified under Anna University TNEA."
        ),
        Document(
            student_id=karthik.id,
            doc_ref_id="DOC-105",
            title="Semester 5 Official Mark Sheet (with DigiLocker QR Hash)",
            category="Academic Records",
            is_mandatory=True,
            status="Action Required",
            uploaded_date="Pending Upload",
            file_name="Not Uploaded",
            file_size="--",
            source="Admin Request",
            admin_remarks="Admin Notice: Please upload Semester 5 mark sheet containing the DigiLocker cryptographic signature hash."
        ),
        Document(
            student_id=karthik.id,
            doc_ref_id="DOC-106",
            title="NPTEL Online Course Certificate: Cloud Computing",
            category="Credit Transfer",
            is_mandatory=False,
            status="Under Verification",
            uploaded_date="28-Oct-2024",
            file_name="NPTEL_Cloud_Computing_Elite.pdf",
            file_size="2.1 MB",
            source="Student Upload",
            admin_remarks="Submitted for 3 academic credits transfer into ABC portal."
        ),
        Document(
            student_id=karthik.id,
            doc_ref_id="DOC-107",
            title="SKCET Student Identity Card",
            category="Institute Endorsement",
            is_mandatory=True,
            status="Verified",
            uploaded_date="26-Aug-2022",
            file_name="SKCET_College_ID_Card.pdf",
            file_size="680 KB",
            source="Student Upload",
            admin_remarks="Valid through May 2026. Autonomous institution affiliated to Anna University."
        )
    ]
    db.add_all(docs)
    db.commit()
    print("  [+] Inserted 7 student verification and academic documents.")

    # ─────────────────────────────────────────────────────────────
    # 5. AICTE Circulars & Notifications
    # ─────────────────────────────────────────────────────────────
    notifs = [
        Notification(
            ref_number="F.No. AICTE/AB/Academic/2024-25/1102",
            title="Mandatory Seeding of APAAR ID with ABC Portal for 2024-25 Semester Examinations",
            date_issued="02-Nov-2024",
            category="Action Required",
            priority="Urgent",
            is_read=False,
            summary=(
                "All technical institutions affiliated to Anna University and approved by AICTE are directed to ensure "
                "100% seeding of 12-digit APAAR ID with Academic Bank of Credits (ABC) for candidates appearing in the "
                "November/December 2024 end semester examinations. Hall tickets without verified APAAR QR code shall not be entertained."
            ),
            issuing_officer="Prof. Rajive Kumar, Member Secretary, AICTE New Delhi",
            target_role="all",
            action_url="#verification",
            action_text="Verify APAAR Seeding"
        ),
        Notification(
            ref_number="F.No. AICTE/Admin/TN-RO/2024/89",
            title="Notice to Autonomous Colleges: Submission of 5th Semester Digital Mark Sheets with DigiLocker Hash",
            date_issued="30-Oct-2024",
            category="Admin Request",
            priority="High",
            is_read=False,
            summary=(
                "Students belonging to the 2022–2026 batch of autonomous technical institutions are instructed to download "
                "and upload their 5th semester mark sheet bearing the DigiLocker cryptographic signature hash before "
                "15-Nov-2024 for central credit repository reconciliation."
            ),
            issuing_officer="Regional Officer, AICTE Southern Regional Office, Chennai",
            target_role="student",
            action_url="#upload",
            action_text="Upload Mark Sheet"
        ),
        Notification(
            ref_number="F.No. AU/COE/2024/Cir-34",
            title="Anna University Notification: National Education Policy (NEP 2020) Credit Transfer Guidelines",
            date_issued="22-Oct-2024",
            category="Circular",
            priority="Standard",
            is_read=True,
            summary=(
                "As per UGC and AICTE National Credit Framework (NCrF), students may earn up to 40% course credits through "
                "approved SWAYAM/NPTEL MOOC courses. All earned credits will be directly deposited into the student's ABC account "
                "via APAAR registry without physical paper submissions."
            ),
            issuing_officer="Controller of Examinations, Anna University, Chennai",
            target_role="all",
            action_url="#reports",
            action_text="View ABC Bank"
        ),
        Notification(
            ref_number="F.No. AICTE/Fin/Pragati-Saksham/2024/18",
            title="Disbursement of AICTE Pragati & Saksham Scholarship through Direct Benefit Transfer (DBT)",
            date_issued="14-Oct-2024",
            category="Scholarships",
            priority="Standard",
            is_read=True,
            summary=(
                "Eligible students receiving AICTE merit and category scholarships are advised to ensure that their savings "
                "bank account is seeded with Aadhaar and mapped with their 12-digit APAAR ID for immediate release of monthly installments."
            ),
            issuing_officer="Director (Student Development Cell), AICTE",
            target_role="student",
            action_url="#verification",
            action_text="Check DBT Mapping"
        )
    ]
    db.add_all(notifs)
    db.commit()
    print("  [+] Inserted 4 AICTE gazette notifications & circulars.")

    # ─────────────────────────────────────────────────────────────
    # 6. Verification Status & 5-Step Institutional Roadmap
    # ─────────────────────────────────────────────────────────────
    v_status = VerificationStatus(
        student_id=karthik.id,
        overall_status="Verified",
        issued_date="20-Sep-2023",
        last_synced="02-Nov-2024, 02:45 PM",
        nodal_officer="Dr. P. Ashoka Varthanan (AICTE Nodal Officer & Registrar, SKCET)",
        digilocker_status="Active & Linked (Consent ID: DL-TN-2023-8841)",
        aadhaar_kyc_status="Completed via UIDAI OTP Authentication"
    )
    db.add(v_status)
    db.commit()

    steps = [
        VerificationStep(
            verification_status_id=v_status.id,
            step_number=1,
            step_title="1. Institute Admission Registry",
            step_desc="Admission verification under Anna University TNEA Quota",
            step_status="completed",
            step_date="24-Aug-2022"
        ),
        VerificationStep(
            verification_status_id=v_status.id,
            step_number=2,
            step_title="2. UIDAI Aadhaar e-KYC Verification",
            step_desc="Demographic name & biometric match with Aadhaar registry",
            step_status="completed",
            step_date="14-Sep-2023"
        ),
        VerificationStep(
            verification_status_id=v_status.id,
            step_number=3,
            step_title="3. SKCET College Nodal Officer Endorsement",
            step_desc="Approved by Head of Institution & AICTE Liaison Officer",
            step_status="completed",
            step_date="16-Sep-2023"
        ),
        VerificationStep(
            verification_status_id=v_status.id,
            step_number=4,
            step_title="4. AICTE & ABC Central Portal Synchronization",
            step_desc="National Academic Depository (NAD) ledger mapping",
            step_status="completed",
            step_date="18-Sep-2023"
        ),
        VerificationStep(
            verification_status_id=v_status.id,
            step_number=5,
            step_title="5. Official 12-Digit APAAR ID Allotment",
            step_desc="Permanent Academic Registry ID 4829-1058-3921 issued",
            step_status="completed",
            step_date="20-Sep-2023"
        )
    ]
    db.add_all(steps)
    db.commit()
    print("  [+] Inserted 5-step institutional multi-tier verification roadmap.")

    # ─────────────────────────────────────────────────────────────
    # 7. Grievance Tickets
    # ─────────────────────────────────────────────────────────────
    grievances = [
        GrievanceTicket(
            student_id=karthik.id,
            ticket_id="GRV-SKCET-7819",
            category="Credit Transfer Missing",
            subject="Inclusion of NPTEL Cloud Computing course (3 credits)",
            description="Submitted course certificate for 3 credits under Anna University R-2022 elective category.",
            status="Resolved",
            admin_response="Credits verified by Controller of Examinations and mapped to ABC ledger under Anna University R-2022."
        ),
        GrievanceTicket(
            student_id=karthik.id,
            ticket_id="GRV-SKCET-6902",
            category="Aadhaar Demographic Match",
            subject="Alignment of candidate initials with Class 10 SSLC mark sheet",
            description="Request to verify full initials match between UIDAI Aadhaar token and matriculation records.",
            status="Resolved",
            admin_response="Name confirmed as R. Karthik matching UIDAI token and college admission register."
        )
    ]
    db.add_all(grievances)
    db.commit()
    print("  [+] Inserted 2 grievance tickets for Help & Support.")

    db.close()
    print("\n[SUCCESS] SQLite database successfully seeded! Ready for FastAPI operations.\n")


if __name__ == "__main__":
    seed_database()
