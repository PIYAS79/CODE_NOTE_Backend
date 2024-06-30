



export type Create_Token_Data_Type= {
    password:string,
    email:string
}

export type Change_Password_Data_Type={
    oldPassword:string,
    newPassword:string
}

export type Reset_Password_Type = {
    email:string,
    newPassword:string
}