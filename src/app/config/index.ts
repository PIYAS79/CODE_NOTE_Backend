

import dotenv from 'dotenv';
import path from 'path';

dotenv.config({path:path.join(process.cwd(),'.env')});


export default {
    server_port : process.env.PORT,
    db_url : process.env.DB_URL,
    developement_status : process.env.DEVELOPMENT_STATUS,
    salt_round:process.env.SALT_ROUND,
    jwt_secret:process.env.JWT_SECRET,
    client_url:process.env.CLIENT_URL,
    mail_secret:process.env.MAIL_SECRET
}