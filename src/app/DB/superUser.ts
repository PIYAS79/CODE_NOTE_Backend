import { Role_Types } from "../global/global.constant"
import { User_Model } from "../modules/USER/user.model"
import { Encrypt_Password } from "../utils/bcrypt.operation";


let superUser = {
    email: "admin@gmail.com",
    status: "ACTIVE",
    role: Role_Types.Super,
    password: 'admin01',
}

export const seedSuperUser = async () => {
    const isSuperUserExist = await User_Model.findOne({ role: Role_Types.Super });
    if (!isSuperUserExist) {
        const encryptedPass = await Encrypt_Password(superUser.password);
        superUser.password = encryptedPass;
        await User_Model.create(superUser);
    }
}
