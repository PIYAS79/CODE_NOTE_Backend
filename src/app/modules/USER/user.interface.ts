export type Code_Type = {
    title: string,
    courseCode?: string,
    language?: string,
    submitAt?: Date,
    code: string,
    isStar: boolean,
}

export type Social_Types = {
    studentProtal?: string,
    telegram: string,
    github: string,
    stackOverflow: string,
    codeForces: string,
}

export type User_Name_Type = {
    f_name: string,
    m_name?: string,
    l_name: string
}

export type User_Contact_Type = {
    phone?: string,
    address?: string,
    socials?: Social_Types[]
}

export type User_Type = {
    email: string,
    status: "ACTIVE" | "BLOCK",
    role: "STUDENT" | "TEACHER" | "ADMIN" | "SUPER",
    isDeleted: boolean,
    userId: string,
    password: string,
    passwordChangeAt?: Date,
    profileImage?: string,
}



export type Get_Teacher_Type = {
    user: User_Type,
    name: User_Name_Type,
    teacherId: string,
    department: string,
    skills?: string[],
    contact?: User_Contact_Type
    codes?: string[]
}