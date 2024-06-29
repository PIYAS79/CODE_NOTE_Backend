import bcrypt from 'bcrypt';
import config from '../config';


export const Encrypt_Password = async(solidData:string)=>{
    const encryptedData = await bcrypt.hash(solidData,Number(config.salt_round))
    return encryptedData;
}

export const Decrypt_Password = async(plainPass:string,encryptedPass:string)=>{
    const decryptedData = await bcrypt.compare(plainPass,encryptedPass)
    return decryptedData;
}

