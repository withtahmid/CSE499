export interface DemoInfo{
    type: "radio" | "check";
    key: string;
    question: string;
    options: string[];
}

export const OTHER = "Other";
export const NOT_TO_SAY = "Prefer not to say";
export const NOT_APPLICAPLE = "Not applicable";

export const age:DemoInfo = {
    type: "radio",
    key: "Age",
    question: "What is your age?",
    options: [ "Under 18", "18 - 20", "21 - 24", "25 - 30", "Over 30" ]
};

export const gender: DemoInfo = {
    type: "radio",
    key: "Gender",
    question: "What is your gender?",
    options: [ "Male", "Female", "Non-binary" ]

}

export const studyLevel: DemoInfo = {
    type: "radio",
    key: "studyLevel",
    question: "What is your current level of study?",
    options: [ "Undergraduate", "Graduate", "Postgraduate", OTHER ]
}

export const fieldOfStudy: DemoInfo = {
    type: "radio",
    key: "fieldOfStudy",
    question: "What is your major or field of study?",
    options: [ "Arts and Humanities", "Social Sciences", "Natural Sciences", "Engineering and Technology", "Business and Economics", "Health Sciences", OTHER ]
}

export const universityType: DemoInfo = {
    type: "radio",
    key: "universityType",
    question: "Which type of university do you attend?",
    options: [ "Public", "Private", OTHER ],
}

export const enrollmentStatus: DemoInfo = {
    type: "radio",
    key: "enrollmentStatus",
    question: "What is your current enrollment status?",
    options: [ "Full-time", "Part-time", "Not currently enrolled", OTHER ],
}

export const residentialSituation: DemoInfo = {
    type: "radio",
    key: "residentialSituation",
    question: "What is your current residential situation?",
    options: [ "On-campus student housing", "Off-campus student housing", "Living with family", OTHER ],
}

export const studyExpenceSource: DemoInfo = {
    type: "radio",
    key: "studyExpenceSource",
    question: "What is your primary source of financial support for your studies?",
    options: [ "Personal savings", "Family support", "Scholarships",  "Student loans", "Part-time job", OTHER ],
}

export const hasDisability: DemoInfo = {
    type: "radio",
    key: "hasDisability",
    question: "Do you have any disabilities?",
    options: [ "Yes", "No" ],

}

export const householdIncome: DemoInfo = {
    type: "radio", 
    key: "householdIncome",
    question: "What is your household's monthly income?",
    options: [ "Less than Tk. 50,000", "Tk. 50,000 - Tk. 100,000", "Tk. 100,000 - Tk. 300,000", "More than 300,000"  ],
}

export const firstToUniversity: DemoInfo = { 
    type: "radio",
    key: "firstToUniversity", 
    question: "Are you the first in your family to attend university?",
    options: [ "Yes", "No" ],
}

export const guardianEmployment: DemoInfo = {
    type: "radio",
    key: "guardianEmployment",
    question: "What are your parents’ or guardians' employment status?",
    options: [ 
        "Both parents/guardians employed full-time", 
        "One parent/guardian employed full-time",
        "Both parents/guardians employed part-time",
        "Both parents/guardians retired",
        "One or both parents/guardians unemployed",
        OTHER  
     ],    
}

export const peopleInHousehold: DemoInfo = {
    type: "radio",
    key: "peopleInHousehold",
    question: "How many people, including yourself, live in your household?",
    options: [ "1", "2 - 3", "4 - 5", "6 - 7", "8 or more"]

}

export const hasDependents: DemoInfo = {
    type: "radio",
    key: "hasDependents",
    question: "Do you have any dependents (children or others you support financially)?",
    options: [ "Yes", "No" ],
}

export const growingArea:DemoInfo = {
    type: "radio",
    key: "growingArea",
    question: "Which type of area did you grow up in?",
    options: [ "Urban (city)", "Suburban (town/mufassil)", "Rural (village)" ],
}

export const parentsMaritialStatus: DemoInfo = {
    type: "radio",
    key: "parentsMaritialStatus",
    question: "What is your parents' or guardians' marital status?",
    options: [ "Married", "Divorced", "Separated",  "Widowed" ],
}


export const demographicInfoList = [
    age,
    gender,
    studyLevel,
    fieldOfStudy,
    universityType,
    enrollmentStatus,
    residentialSituation,
    studyExpenceSource,
    hasDisability,
    householdIncome,
    firstToUniversity,
    guardianEmployment,
    peopleInHousehold,
    hasDependents,
    growingArea,
    parentsMaritialStatus,
]