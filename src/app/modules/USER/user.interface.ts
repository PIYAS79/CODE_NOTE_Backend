// user type 
export type User_Name_Type = {
    f_name: string,
    m_name?: string,
    l_name: string
}
// user type
export type User_Type = {
    email: string,
    status: "ACTIVE" | "BLOCK",
    role: "STUDENT" | "TEACHER" | "ADMIN" | "SUPER",
    userId: string,
    password: string,
    passwordChangeAt?: Date,
    profileImage?: string,
}







