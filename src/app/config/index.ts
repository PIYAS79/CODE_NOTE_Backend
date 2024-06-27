

import dotenv from 'dotenv';
import path from 'path';

dotenv.config({path:path.join(process.cwd(),'.env')});


export default {
    server_port : process.env.PORT,
    db_url : process.env.DB_URL,
    developement_status : process.env.DEVELOPMENT_STATUS,
}