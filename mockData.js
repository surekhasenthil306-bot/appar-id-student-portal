export const studentProfileData = {
  login: {
    email: "karthik001cs@gmail.com",
    collegeEmail: "karthik.r22cse@skcet.ac.in",
    mobile: "9842176540",
    password: "password123",
    role: "student"
  },
  personal: {
    fullName: "R. Karthik",
    initial: "R",
    dob: "18-05-2003",
    gender: "Male",
    bloodGroup: "B +ve",
    category: "BC / General",
    community: "BC",
    differentlyAbled: "No",
    nationality: "Indian",
    domicileState: "Tamil Nadu",
    motherTongue: "Tamil",
    religion: "Hindu",
    fatherName: "K. Ramanathan",
    fatherOccupation: "Senior Accountant",
    motherName: "R. Meenakshi",
    motherOccupation: "Homemaker",
    guardianMobile: "+91 94432 18765",
    email: "karthik.r22cse@skcet.ac.in",
    alternateEmail: "karthik001cs@gmail.com",
    mobile: "+91 98421 76540",
    aadhaarNumberMasked: "XXXX-XXXX-4921",
    aadhaarStatus: "e-KYC Verified (UIDAI OTP Seeded)",
    permanentAddress: "No. 42, Bharathiar Street, RS Puram, Coimbatore - 641002, Tamil Nadu",
    correspondenceAddress: "No. 42, Bharathiar Street, RS Puram, Coimbatore - 641002, Tamil Nadu",
    district: "Coimbatore",
    pincode: "641002",
  },
  academic: {
    apaarId: "4829-1058-3921",
    abcId: "ABC-784-219-042",
    collegeName: "Sri Krishna College of Engineering and Technology, Coimbatore",
    collegeShort: "SKCET Coimbatore",
    collegeCode: "SKCET-7135",
    annaUnivCode: "7135",
    aictePermanentId: "1-45629108",
    aicteApprovalYear: "Approved by AICTE, New Delhi & Affiliated to Anna University, Chennai",
    department: "Computer Science & Engineering",
    degree: "B.E. (Computer Science & Engineering)",
    academicYear: "2024 - 2025",
    currentYear: "3rd Year",
    currentSemester: "Semester VI",
    admissionType: "Single Window Counselling (TNEA 2022)",
    enrollmentNo: "22CSE104",
    registerNo: "713522104084",
    rollNo: "22CS104",
    cgpa: "8.78",
    creditsCompleted: 138,
    totalCreditsRequired: 165,
    academicStatus: "Regular / In Good Standing",
    admissionDate: "24-Aug-2022",
    expectedGraduation: "May 2026",
    mentorFaculty: "Dr. K. Senthil Kumar (Associate Professor, CSE)",
    hodName: "Dr. N. Susila (Prof. & HoD, CSE)",
  },
  verification: {
    overallStatus: "Verified",
    issuedDate: "14-Sep-2023",
    lastSyncedDate: "02-Nov-2024, 02:45 PM",
    nodalOfficer: "Dr. P. Ashoka Varthanan (AICTE Nodal Officer & Registrar, SKCET)",
    digiLockerStatus: "Active & Linked (Consent ID: DL-TN-2023-8841)",
    aadhaarKycStatus: "Completed via UIDAI OTP Authentication",
    steps: [
      { id: 1, title: "1. Institute Admission Registry", desc: "Admission verification under Anna University TNEA Quota", status: "completed", date: "24-Aug-2022" },
      { id: 2, title: "2. UIDAI Aadhaar e-KYC Verification", desc: "Demographic name & biometric match with Aadhaar registry", status: "completed", date: "14-Sep-2023" },
      { id: 3, title: "3. SKCET College Nodal Officer Endorsement", desc: "Approved by Head of Institution & AICTE Liaison Officer", status: "completed", date: "16-Sep-2023" },
      { id: 4, title: "4. AICTE & ABC Central Portal Synchronization", desc: "National Academic Depository (NAD) ledger mapping", status: "completed", date: "18-Sep-2023" },
      { id: 5, title: "5. Official 12-Digit APAAR ID Allotment", desc: "Permanent Academic Registry ID 4829-1058-3921 issued", status: "completed", date: "20-Sep-2023" },
    ],
    pendingItems: [
      {
        id: "PEND-01",
        title: "Semester 5 DigiLocker Mark Sheet",
        requestedBy: "AICTE Academic Depository & Anna University Cell",
        dueDate: "15-Nov-2024",
        severity: "high",
        message: "AICTE Admin requires upload of your official 5th Semester Mark Sheet bearing DigiLocker verification hash for ABC credit transfer reconciliation.",
      },
    ],
    duplicateRecords: [
      {
        id: "DUP-SCAN-TN-401",
        scanDate: "01-Nov-2024",
        legacyBoard: "Tamil Nadu State Board HSC (+2 Examination, Reg: 418290, March 2021)",
        provisionalId: "PROV-TN-88214",
        status: "Auto-De-duplicated & Unified",
        resolutionNotes: "System cross-verified Aadhaar token. The previous State Board provisional registration was cleanly merged into permanent APAAR 4829-1058-3921. 0 duplicate records exist.",
      },
    ],
  },
  abcBank: {
    creditsTotal: 138,
    creditsApproved: 124,
    creditsInReview: 14,
    semesters: [
      { sem: "Semester I (Nov 2022)", credits: 23, sgpa: "8.65", status: "Approved & Deposited", result: "PASS" },
      { sem: "Semester II (May 2023)", credits: 24, sgpa: "8.82", status: "Approved & Deposited", result: "PASS" },
      { sem: "Semester III (Nov 2023)", credits: 25, sgpa: "8.90", status: "Approved & Deposited", result: "PASS" },
      { sem: "Semester IV (May 2024)", credits: 26, sgpa: "8.75", status: "Approved & Deposited", result: "PASS" },
      { sem: "Semester V (Nov 2024)", credits: 26, sgpa: "8.80", status: "Pending DigiLocker Hash", result: "PASS" },
      { sem: "SWAYAM / NPTEL (Elective)", credits: 14, sgpa: "Elite Gold", status: "Awaiting Dean Credit Approval", result: "COMPLETED" },
    ]
  }
};

export const studentPavithraData = {
  login: {
    email: "pavithra.cit@gmail.com",
    collegeEmail: "pavithra.s@cit.edu.in",
    alternateEmails: ["pavithra.s@gmail.com", "pavithra@gmail.com"],
    mobile: "9442188201",
    password: "pavi@123",
    role: "student"
  },
  personal: {
    fullName: "S. Pavithra",
    initial: "S",
    dob: "12-11-2002",
    gender: "Female",
    bloodGroup: "O +ve",
    category: "OBC / General",
    community: "BC",
    differentlyAbled: "No",
    nationality: "Indian",
    domicileState: "Tamil Nadu",
    motherTongue: "Tamil",
    religion: "Hindu",
    fatherName: "M. Shanmugam",
    fatherOccupation: "Assistant Director, Highways",
    motherName: "S. Shanthi",
    motherOccupation: "Teacher",
    guardianMobile: "+91 94433 99120",
    email: "pavithra.s@cit.edu.in",
    alternateEmail: "pavithra.cit@gmail.com",
    mobile: "+91 94421 88201",
    aadhaarNumberMasked: "XXXX-XXXX-8201",
    aadhaarStatus: "e-KYC Verified (UIDAI OTP Seeded)",
    permanentAddress: "No. 18, Avinashi Road, Peelamedu, Coimbatore - 641014, Tamil Nadu",
    correspondenceAddress: "No. 18, Avinashi Road, Peelamedu, Coimbatore - 641014, Tamil Nadu",
    district: "Coimbatore",
    pincode: "641014",
  },
  academic: {
    apaarId: "6194-8201-3475",
    abcId: "ABC-512-904-811",
    collegeName: "Coimbatore Institute of Technology (CIT), Coimbatore",
    collegeShort: "CIT Coimbatore",
    collegeCode: "CIT-7176",
    annaUnivCode: "7176",
    aictePermanentId: "1-32918402",
    aicteApprovalYear: "Approved by AICTE, New Delhi & Autonomous Institution Affiliated to Anna University",
    department: "Electronics & Communication Engineering",
    degree: "B.E. (Electronics & Communication Engineering)",
    academicYear: "2024 - 2025",
    currentYear: "4th Year",
    currentSemester: "Semester VIII",
    admissionType: "TNEA Merit Quota (TNEA 2021)",
    enrollmentNo: "21ECE042",
    registerNo: "717621105042",
    rollNo: "21EC042",
    cgpa: "9.12",
    creditsCompleted: 154,
    totalCreditsRequired: 165,
    academicStatus: "Regular / First Class with Distinction",
    admissionDate: "18-Aug-2021",
    expectedGraduation: "May 2025",
    mentorFaculty: "Dr. A. Rajeshwari (Professor, ECE)",
    hodName: "Dr. S. Uma (Prof. & HoD, ECE)",
  },
  verification: {
    overallStatus: "Verified",
    issuedDate: "12-Oct-2023",
    lastSyncedDate: "05-Nov-2024, 11:30 AM",
    nodalOfficer: "Dr. V. Selladurai (Principal & AICTE Nodal Liaison, CIT)",
    digiLockerStatus: "Active & Linked (Consent ID: DL-TN-2023-4190)",
    aadhaarKycStatus: "Completed via UIDAI OTP Authentication",
    steps: [
      { id: 1, title: "1. Institute Admission Registry", desc: "Admission verification under Anna University CIT Quota", status: "completed", date: "18-Aug-2021" },
      { id: 2, title: "2. UIDAI Aadhaar e-KYC Verification", desc: "Demographic name & biometric match with Aadhaar registry", status: "completed", date: "12-Oct-2023" },
      { id: 3, title: "3. CIT College Nodal Officer Endorsement", desc: "Approved by Principal & Nodal Officer", status: "completed", date: "14-Oct-2023" },
      { id: 4, title: "4. AICTE & ABC Central Portal Synchronization", desc: "National Academic Depository (NAD) ledger mapping", status: "completed", date: "15-Oct-2023" },
      { id: 5, title: "5. Official 12-Digit APAAR ID Allotment", desc: "Permanent Academic Registry ID 6194-8201-3475 issued", status: "completed", date: "16-Oct-2023" },
    ],
    pendingItems: [],
    duplicateRecords: [
      {
        id: "DUP-SCAN-TN-202",
        scanDate: "02-Nov-2024",
        legacyBoard: "Tamil Nadu State Board HSC (+2 Examination, Reg: 512901, March 2021)",
        provisionalId: "PROV-TN-41902",
        status: "Auto-De-duplicated & Unified",
        resolutionNotes: "System cross-verified Aadhaar token. 0 duplicate records exist.",
      },
    ],
  },
  abcBank: {
    creditsTotal: 154,
    creditsApproved: 154,
    creditsInReview: 0,
    semesters: [
      { sem: "Semester I (Nov 2021)", credits: 23, sgpa: "9.05", status: "Approved & Deposited", result: "PASS" },
      { sem: "Semester II (May 2022)", credits: 24, sgpa: "9.18", status: "Approved & Deposited", result: "PASS" },
      { sem: "Semester III (Nov 2022)", credits: 25, sgpa: "9.20", status: "Approved & Deposited", result: "PASS" },
      { sem: "Semester IV (May 2023)", credits: 26, sgpa: "9.10", status: "Approved & Deposited", result: "PASS" },
      { sem: "Semester V (Nov 2023)", credits: 26, sgpa: "9.15", status: "Approved & Deposited", result: "PASS" },
      { sem: "Semester VI (May 2024)", credits: 30, sgpa: "9.05", status: "Approved & Deposited", result: "PASS" },
    ]
  }
};

export const studentVigneshData = {
  login: {
    email: "vignesh.gct@gmail.com",
    collegeEmail: "vignesh.m@gct.ac.in",
    mobile: "9843317409",
    password: "vignesh@123",
    role: "student"
  },
  personal: {
    fullName: "M. Vigneshwaran",
    initial: "M",
    dob: "05-02-2004",
    gender: "Male",
    bloodGroup: "A +ve",
    category: "MBC / DNC",
    community: "MBC",
    differentlyAbled: "No",
    nationality: "Indian",
    domicileState: "Tamil Nadu",
    motherTongue: "Tamil",
    religion: "Hindu",
    fatherName: "P. Murugan",
    fatherOccupation: "Agriculture & Enterprise",
    motherName: "M. Parvathi",
    motherOccupation: "Homemaker",
    guardianMobile: "+91 94431 82190",
    email: "vignesh.m@gct.ac.in",
    alternateEmail: "vignesh.gct@gmail.com",
    mobile: "+91 98433 17409",
    aadhaarNumberMasked: "XXXX-XXXX-9281",
    aadhaarStatus: "e-KYC Verified (UIDAI OTP Seeded)",
    permanentAddress: "No. 12, Gandhi Nagar, Thudiyalur, Coimbatore - 641034, Tamil Nadu",
    correspondenceAddress: "No. 12, Gandhi Nagar, Thudiyalur, Coimbatore - 641034, Tamil Nadu",
    district: "Coimbatore",
    pincode: "641034",
  },
  academic: {
    apaarId: "8392-1740-9281",
    abcId: "ABC-631-409-172",
    collegeName: "Government College of Technology (GCT), Coimbatore",
    collegeShort: "GCT Coimbatore",
    collegeCode: "GCT-7100",
    annaUnivCode: "7100",
    aictePermanentId: "1-10294819",
    aicteApprovalYear: "Approved by AICTE, New Delhi & Government Autonomous Institution",
    department: "Mechanical Engineering",
    degree: "B.E. (Mechanical Engineering)",
    academicYear: "2024 - 2025",
    currentYear: "2nd Year",
    currentSemester: "Semester IV",
    admissionType: "Single Window Counselling (TNEA 2023)",
    enrollmentNo: "23MECH061",
    registerNo: "710023102061",
    rollNo: "23ME061",
    cgpa: "8.42",
    creditsCompleted: 76,
    totalCreditsRequired: 165,
    academicStatus: "Regular / In Good Standing",
    admissionDate: "20-Aug-2023",
    expectedGraduation: "May 2027",
    mentorFaculty: "Dr. K. Ramesh (Associate Professor, Mechanical)",
    hodName: "Dr. P. K. Palani (Prof. & HoD, Mechanical)",
  },
  verification: {
    overallStatus: "Verified",
    issuedDate: "10-Nov-2023",
    lastSyncedDate: "04-Nov-2024, 03:15 PM",
    nodalOfficer: "Dr. K. Manonmani (Principal & AICTE Coordinator, GCT)",
    digiLockerStatus: "Active & Linked (Consent ID: DL-TN-2023-7182)",
    aadhaarKycStatus: "Completed via UIDAI OTP Authentication",
    steps: [
      { id: 1, title: "1. Institute Admission Registry", desc: "Admission verification under Anna University GCT Quota", status: "completed", date: "20-Aug-2023" },
      { id: 2, title: "2. UIDAI Aadhaar e-KYC Verification", desc: "Demographic name & biometric match with Aadhaar registry", status: "completed", date: "10-Nov-2023" },
      { id: 3, title: "3. GCT College Nodal Officer Endorsement", desc: "Approved by Principal & Nodal Officer", status: "completed", date: "12-Nov-2023" },
      { id: 4, title: "4. AICTE & ABC Central Portal Synchronization", desc: "National Academic Depository (NAD) ledger mapping", status: "completed", date: "14-Nov-2023" },
      { id: 5, title: "5. Official 12-Digit APAAR ID Allotment", desc: "Permanent Academic Registry ID 8392-1740-9281 issued", status: "completed", date: "15-Nov-2023" },
    ],
    pendingItems: [],
    duplicateRecords: [],
  },
  abcBank: {
    creditsTotal: 76,
    creditsApproved: 76,
    creditsInReview: 0,
    semesters: [
      { sem: "Semester I (Nov 2023)", credits: 24, sgpa: "8.35", status: "Approved & Deposited", result: "PASS" },
      { sem: "Semester II (May 2024)", credits: 26, sgpa: "8.50", status: "Approved & Deposited", result: "PASS" },
      { sem: "Semester III (Nov 2024)", credits: 26, sgpa: "8.40", status: "Approved & Deposited", result: "PASS" },
    ]
  }
};

export const studentSnehaData = {
  login: {
    email: "sneha.annauniv@gmail.com",
    collegeEmail: "sneha.reddy@annauniv.edu",
    mobile: "9840193046",
    password: "sneha@123",
    role: "student"
  },
  personal: {
    fullName: "Sneha Reddy",
    initial: "K",
    dob: "22-09-2003",
    gender: "Female",
    bloodGroup: "AB +ve",
    category: "General / OC",
    community: "OC",
    differentlyAbled: "No",
    nationality: "Indian",
    domicileState: "Tamil Nadu",
    motherTongue: "Telugu",
    religion: "Hindu",
    fatherName: "K. Venkat Reddy",
    fatherOccupation: "Chief Software Architect",
    motherName: "K. Sunitha",
    motherOccupation: "Medical Officer",
    guardianMobile: "+91 94440 18293",
    email: "sneha.reddy@annauniv.edu",
    alternateEmail: "sneha.annauniv@gmail.com",
    mobile: "+91 98401 93046",
    aadhaarNumberMasked: "XXXX-XXXX-6182",
    aadhaarStatus: "e-KYC Verified (UIDAI OTP Seeded)",
    permanentAddress: "Flat 4B, Emerald Towers, Sardar Patel Road, Guindy, Chennai - 600025",
    correspondenceAddress: "Flat 4B, Emerald Towers, Sardar Patel Road, Guindy, Chennai - 600025",
    district: "Chennai",
    pincode: "600025",
  },
  academic: {
    apaarId: "7215-9304-6182",
    abcId: "ABC-918-204-619",
    collegeName: "College of Engineering, Guindy (CEG), Anna University, Chennai",
    collegeShort: "CEG Anna University",
    collegeCode: "CEG-0001",
    annaUnivCode: "0001",
    aictePermanentId: "1-00018274",
    aicteApprovalYear: "Approved by AICTE, New Delhi & University Department, Anna University",
    department: "Information Technology",
    degree: "B.Tech. (Information Technology)",
    academicYear: "2024 - 2025",
    currentYear: "3rd Year",
    currentSemester: "Semester VI",
    admissionType: "TNEA State Rank 14 (TNEA 2022)",
    enrollmentNo: "22IT015",
    registerNo: "710122108015",
    rollNo: "22IT015",
    cgpa: "9.45",
    creditsCompleted: 142,
    totalCreditsRequired: 165,
    academicStatus: "Regular / University Rank Holder",
    admissionDate: "20-Aug-2022",
    expectedGraduation: "May 2026",
    mentorFaculty: "Dr. T. Mala (Professor, IT)",
    hodName: "Dr. S. Sridhar (Prof. & HoD, IT)",
  },
  verification: {
    overallStatus: "Verified",
    issuedDate: "05-Sep-2023",
    lastSyncedDate: "06-Nov-2024, 04:00 PM",
    nodalOfficer: "Dr. J. Kumar (Dean & AICTE Academic Head, CEG Anna University)",
    digiLockerStatus: "Active & Linked (Consent ID: DL-TN-2023-9912)",
    aadhaarKycStatus: "Completed via UIDAI OTP Authentication",
    steps: [
      { id: 1, title: "1. Institute Admission Registry", desc: "Admission verification under Anna University Campus Quota", status: "completed", date: "20-Aug-2022" },
      { id: 2, title: "2. UIDAI Aadhaar e-KYC Verification", desc: "Demographic name & biometric match with Aadhaar registry", status: "completed", date: "05-Sep-2023" },
      { id: 3, title: "3. CEG Dean & AICTE Nodal Endorsement", desc: "Approved by University Registrar & AICTE Nodal Cell", status: "completed", date: "07-Sep-2023" },
      { id: 4, title: "4. AICTE & ABC Central Portal Synchronization", desc: "National Academic Depository (NAD) ledger mapping", status: "completed", date: "08-Sep-2023" },
      { id: 5, title: "5. Official 12-Digit APAAR ID Allotment", desc: "Permanent Academic Registry ID 7215-9304-6182 issued", status: "completed", date: "10-Sep-2023" },
    ],
    pendingItems: [],
    duplicateRecords: [],
  },
  abcBank: {
    creditsTotal: 142,
    creditsApproved: 142,
    creditsInReview: 0,
    semesters: [
      { sem: "Semester I (Nov 2022)", credits: 23, sgpa: "9.30", status: "Approved & Deposited", result: "PASS" },
      { sem: "Semester II (May 2023)", credits: 24, sgpa: "9.50", status: "Approved & Deposited", result: "PASS" },
      { sem: "Semester III (Nov 2023)", credits: 25, sgpa: "9.45", status: "Approved & Deposited", result: "PASS" },
      { sem: "Semester IV (May 2024)", credits: 26, sgpa: "9.60", status: "Approved & Deposited", result: "PASS" },
      { sem: "Semester V (Nov 2024)", credits: 26, sgpa: "9.40", status: "Approved & Deposited", result: "PASS" },
      { sem: "SWAYAM / NPTEL (Elective)", credits: 18, sgpa: "Elite Plus", status: "Approved & Deposited", result: "COMPLETED" },
    ]
  }
};

export const allStudentAccounts = [
  studentProfileData,
  studentPavithraData,
  studentVigneshData,
  studentSnehaData
];

export const demoAccountsList = [
  {
    role: "student",
    name: "R. Karthik",
    email: "karthik001cs@gmail.com",
    collegeEmail: "karthik.r22cse@skcet.ac.in",
    mobile: "9842176540",
    password: "password123",
    college: "SKCET Coimbatore",
    apaarId: "4829-1058-3921"
  },
  {
    role: "student",
    name: "S. Pavithra",
    email: "pavithra.cit@gmail.com",
    collegeEmail: "pavithra.s@cit.edu.in",
    mobile: "9442188201",
    password: "pavi@123",
    college: "CIT Coimbatore",
    apaarId: "6194-8201-3475"
  },
  {
    role: "student",
    name: "M. Vigneshwaran",
    email: "vignesh.gct@gmail.com",
    collegeEmail: "vignesh.m@gct.ac.in",
    mobile: "9843317409",
    password: "vignesh@123",
    college: "GCT Coimbatore",
    apaarId: "8392-1740-9281"
  },
  {
    role: "student",
    name: "Sneha Reddy",
    email: "sneha.annauniv@gmail.com",
    collegeEmail: "sneha.reddy@annauniv.edu",
    mobile: "9840193046",
    password: "sneha@123",
    college: "CEG Anna University, Chennai",
    apaarId: "7215-9304-6182"
  },
  {
    role: "admin",
    name: "AICTE / Nodal Administrator",
    email: "admin@aicte.gov.in",
    collegeEmail: "SKCET-NODAL-7135",
    mobile: "9840000001",
    password: "admin123",
    college: "Ministry of Education & AICTE Nodal Desk",
    apaarId: "AICTE-NODAL-ADMIN"
  }
];

export function findStudentAccount(identifier, password) {
  const cleanId = (identifier || '').trim().toLowerCase();
  const cleanPass = (password || '').trim();

  // Match by email, alternateEmails, collegeEmail, personal.email, alternateEmail, or mobile
  for (const s of allStudentAccounts) {
    const emailMatch =
      s.login.email.toLowerCase() === cleanId ||
      s.login.collegeEmail.toLowerCase() === cleanId ||
      (s.login.alternateEmails || []).some(e => e.toLowerCase() === cleanId) ||
      (s.personal.email || '').toLowerCase() === cleanId ||
      (s.personal.alternateEmail || '').toLowerCase() === cleanId;

    const mobileMatch =
      s.login.mobile === cleanId ||
      s.personal.mobile.replace(/\D/g, '').endsWith(cleanId);

    if (emailMatch || mobileMatch) {
      // Accept correct password, or common demo passwords for convenience
      if (!cleanPass || cleanPass === s.login.password || cleanPass === "123456" || cleanPass === "password123") {
        // Load any saved edits from localStorage
        const savedKey = `apaar_student_${s.academic.apaarId}`;
        const savedPersonal = localStorage.getItem(savedKey);
        if (savedPersonal) {
          try {
            const parsed = JSON.parse(savedPersonal);
            return { ...s, personal: { ...s.personal, ...parsed } };
          } catch (_) {}
        }
        return s;
      }
    }
  }

  // No matching account found
  return null;
}

export const sampleAparIds = [
  {
    apaarId: "4829-1058-3921",
    name: "R. Karthik",
    college: "Sri Krishna College of Engineering and Technology, Coimbatore",
    department: "Computer Science & Engineering",
    academicYear: "2024 - 2025 (3rd Year, Sem VI)",
    registerNo: "713522104084",
    status: "Verified",
    aadhaarStatus: "e-KYC Verified",
    abcCredits: 138,
    issuedOn: "20-Sep-2023",
    aicteId: "1-45629108",
    notes: "Active official record. Fully verified with DigiLocker and Anna University."
  },
  {
    apaarId: "6194-8201-3475",
    name: "S. Pavithra",
    college: "Coimbatore Institute of Technology (CIT), Coimbatore",
    department: "Electronics & Communication Engineering",
    academicYear: "2024 - 2025 (4th Year, Sem VIII)",
    registerNo: "717621105042",
    status: "Verified",
    aadhaarStatus: "e-KYC Verified",
    abcCredits: 154,
    issuedOn: "12-Oct-2023",
    aicteId: "1-32918402",
    notes: "Full credit reconciliation completed. AICTE Pragati Scholarship awardee."
  },
  {
    apaarId: "8392-1740-9281",
    name: "M. Vigneshwaran",
    college: "Government College of Technology (GCT), Coimbatore",
    department: "Mechanical Engineering",
    academicYear: "2024 - 2025 (2nd Year, Sem IV)",
    registerNo: "710023102061",
    status: "Pending Institute Verification",
    aadhaarStatus: "e-KYC Verified",
    abcCredits: 76,
    issuedOn: "Pending Final Nodal Approval",
    aicteId: "1-10294819",
    notes: "Student uploaded grade sheets; awaiting Principal / Nodal Officer digital signature."
  },
  {
    apaarId: "3310-9482-1527",
    name: "K. Deepa",
    college: "PSG College of Technology, Coimbatore",
    department: "Information Technology",
    academicYear: "2024 - 2025 (3rd Year, Sem VI)",
    registerNo: "713322108033",
    status: "Duplicate Flagged / Mismatch",
    aadhaarStatus: "Initial Expansion Discrepancy",
    abcCredits: 98,
    issuedOn: "On Hold",
    aicteId: "1-44910284",
    notes: "Name expanded discrepancy between Aadhaar and HSC 10th mark sheet. Verification ticket open."
  },
  {
    apaarId: "9942-0184-7731",
    name: "A. Mohammed Riyaz",
    college: "Kumaraguru College of Technology, Coimbatore",
    department: "Electrical & Electronics Engineering",
    academicYear: "2024 - 2025 (1st Year, Sem II)",
    registerNo: "713624103019",
    status: "Under Review by AICTE",
    aadhaarStatus: "e-KYC OTP Pending",
    abcCredits: 23,
    issuedOn: "Under Processing",
    aicteId: "1-55829104",
    notes: "Provisional APAAR generated. Migration certificate verification pending from Board."
  },
  {
    apaarId: "7215-9304-6182",
    name: "Sneha Reddy",
    college: "College of Engineering, Guindy (CEG), Anna University, Chennai",
    department: "Information Technology",
    academicYear: "2024 - 2025 (3rd Year, Sem VI)",
    registerNo: "710122108015",
    status: "Verified",
    aadhaarStatus: "e-KYC Verified",
    abcCredits: 142,
    issuedOn: "10-Sep-2023",
    aicteId: "1-00018274",
    notes: "Academic rank holder. Full credit reconciliation completed."
  }
];

export const initialStudentDocuments = [
  {
    id: "DOC-101",
    title: "Parental Consent & APAAR Authorization Form",
    category: "Identity & Consent",
    mandatory: true,
    status: "Verified",
    uploadedDate: "14-Sep-2023",
    fileSize: "1.2 MB",
    fileName: "SKCET_Parent_Consent_Signed.pdf",
    adminRemarks: "Verified by SKCET Academic Section. Stored in institutional depository.",
    source: "Student Upload"
  },
  {
    id: "DOC-102",
    title: "Masked e-Aadhaar Card",
    category: "Identity & Consent",
    mandatory: true,
    status: "Verified",
    uploadedDate: "14-Sep-2023",
    fileSize: "750 KB",
    fileName: "Masked_eAadhaar_UIDAI.pdf",
    adminRemarks: "Authenticated using UIDAI OTP gateway.",
    source: "DigiLocker Sync"
  },
  {
    id: "DOC-103",
    title: "10th Standard (SSLC) Mark Sheet",
    category: "Academic Records",
    mandatory: true,
    status: "Verified",
    uploadedDate: "24-Aug-2022",
    fileSize: "1.8 MB",
    fileName: "TN_SSLC_MarkSheet_2019.pdf",
    adminRemarks: "Date of Birth and Candidate Name verified against TN State Board.",
    source: "DigiLocker Sync"
  },
  {
    id: "DOC-104",
    title: "12th Standard (HSC) Mark Sheet",
    category: "Academic Records",
    mandatory: true,
    status: "Verified",
    uploadedDate: "24-Aug-2022",
    fileSize: "1.9 MB",
    fileName: "TN_HSC_MarkSheet_2021.pdf",
    adminRemarks: "Cut-off marks and eligibility verified under Anna University TNEA.",
    source: "DigiLocker Sync"
  },
  {
    id: "DOC-105",
    title: "Semester 5 Official Mark Sheet (with DigiLocker QR Hash)",
    category: "Academic Records",
    mandatory: true,
    status: "Action Required",
    uploadedDate: "Pending Upload",
    fileSize: "--",
    fileName: "Not Uploaded",
    adminRemarks: "Admin Notice: Please upload Semester 5 mark sheet containing the DigiLocker cryptographic signature hash.",
    source: "Admin Request"
  },
  {
    id: "DOC-106",
    title: "NPTEL Online Course Certificate: Cloud Computing",
    category: "Credit Transfer",
    mandatory: false,
    status: "Under Verification",
    uploadedDate: "28-Oct-2024",
    fileSize: "2.1 MB",
    fileName: "NPTEL_Cloud_Computing_Elite.pdf",
    adminRemarks: "Submitted for 3 academic credits transfer into ABC portal.",
    source: "Student Upload"
  },
  {
    id: "DOC-107",
    title: "SKCET Student Identity Card",
    category: "Institute Endorsement",
    mandatory: true,
    status: "Verified",
    uploadedDate: "26-Aug-2022",
    fileSize: "680 KB",
    fileName: "SKCET_College_ID_Card.pdf",
    adminRemarks: "Valid through May 2026. Autonomous institution affiliated to Anna University.",
    source: "Student Upload"
  }
];

export const aicteNotificationsList = [
  {
    id: "CIR-2024-1102",
    refNumber: "F.No. AICTE/AB/Academic/2024-25/1102",
    title: "Mandatory Seeding of APAAR ID with ABC Portal for 2024-25 Semester Examinations",
    date: "02-Nov-2024",
    category: "Action Required",
    priority: "Urgent",
    read: false,
    summary: "All technical institutions affiliated to Anna University and approved by AICTE are directed to ensure 100% seeding of 12-digit APAAR ID with Academic Bank of Credits (ABC) for candidates appearing in the November/December 2024 end semester examinations. Hall tickets without verified APAAR QR code shall not be entertained.",
    issuingOfficer: "Prof. Rajive Kumar, Member Secretary, AICTE New Delhi",
    actionUrl: "#verification",
    actionText: "Verify APAAR Seeding"
  },
  {
    id: "CIR-2024-1094",
    refNumber: "F.No. AICTE/Admin/TN-RO/2024/89",
    title: "Notice to Autonomous Colleges: Submission of 5th Semester Digital Mark Sheets with DigiLocker Hash",
    date: "30-Oct-2024",
    category: "Admin Request",
    priority: "High",
    read: false,
    summary: "Students belonging to the 2022–2026 batch of autonomous technical institutions are instructed to download and upload their 5th semester mark sheet bearing the DigiLocker cryptographic signature hash before 15-Nov-2024 for central credit repository reconciliation.",
    issuingOfficer: "Regional Officer, AICTE Southern Regional Office, Chennai",
    actionUrl: "#upload",
    actionText: "Upload Mark Sheet"
  },
  {
    id: "CIR-2024-1065",
    refNumber: "F.No. AU/COE/2024/Cir-34",
    title: "Anna University Notification: National Education Policy (NEP 2020) Credit Transfer Guidelines",
    date: "22-Oct-2024",
    category: "Circular",
    priority: "Standard",
    read: true,
    summary: "As per the UGC and AICTE National Credit Framework (NCrF), students may earn up to 40% course credits through approved SWAYAM/NPTEL MOOC courses. All earned credits will be directly deposited into the student's ABC account via APAAR registry without physical paper submissions.",
    issuingOfficer: "Controller of Examinations, Anna University, Chennai",
    actionUrl: "#reports",
    actionText: "View ABC Bank"
  },
  {
    id: "CIR-2024-1021",
    refNumber: "F.No. AICTE/Fin/Pragati-Saksham/2024/18",
    title: "Disbursement of AICTE Pragati & Saksham Scholarship through Direct Benefit Transfer (DBT)",
    date: "14-Oct-2024",
    category: "Scholarships",
    priority: "Standard",
    read: true,
    summary: "Eligible students receiving AICTE merit and category scholarships are advised to ensure that their savings bank account is seeded with Aadhaar and mapped with their 12-digit APAAR ID for immediate release of monthly scholarship installments.",
    issuingOfficer: "Director (Student Development Cell), AICTE",
    actionUrl: "#verification",
    actionText: "Check DBT Mapping"
  }
];

export const faqList = [
  {
    q: "What is APAAR ID and why is it mandatory for students?",
    a: "APAAR (Automated Permanent Academic Account Registry) is a 12-digit unique digital student identification number created by the Ministry of Education, Government of India. Under the National Education Policy (NEP 2020) and AICTE guidelines, it acts as 'One Nation, One Student ID', storing all mark sheets, credit awards, and degrees in a unified digital registry."
  },
  {
    q: "How is APAAR linked with my College and Anna University?",
    a: "Your college (Sri Krishna College of Engineering and Technology) endorses your academic records through the AICTE Nodal Cell. The records are mapped to Anna University exam registers and synced with DigiLocker and the Academic Bank of Credits (ABC)."
  },
  {
    q: "What should I do if the AICTE Admin asks for Semester 5 mark sheet?",
    a: "Go to the 'Student Upload' section. Download your 5th semester mark sheet from your DigiLocker app (which contains the digital verification QR hash) and upload the PDF. Once submitted, your college Nodal Officer verifies and clears the pending alert."
  },
  {
    q: "What if there is a duplicate record or spelling mismatch?",
    a: "The system runs an automated Aadhaar-based de-duplication check. If any mismatch in initials, name, or date of birth exists between school board records and Aadhaar, you can submit a grievance ticket in the 'Help & Support' section for your college Nodal Officer to resolve."
  },
  {
    q: "How can anyone verify my APAAR ID?",
    a: "Employers, educational institutions, and government agencies can verify your credentials by entering your 12-digit APAAR ID in the 'Verification Status' section of this portal or by scanning the official QR code."
  }
];
