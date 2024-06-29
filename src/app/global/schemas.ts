

export const User_Name_Schema = {
    f_name: {
        type: String,
        required: [true, "Provide your First Name *"]
    },
    m_name: {
        type: String,
    },
    l_name: {
        type: String,
        required: [true, "Provide your Last Name *"]
    }
}


export const User_Contact_Schema = {
    studentProtal: {
        type: String,
    },
    telegram: {
        type: String,
    },
    github: {
        type: String,
    },
    stackOverflow: {
        type: String,
    },
    codeForces: {
        type: String,
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
}

