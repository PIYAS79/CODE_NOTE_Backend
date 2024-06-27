import mongoose from "mongoose";
import app from "./App";
import {Server} from 'http';
import config from "./config";


let server:Server;

function main(){
    mongoose.connect(config.db_url as string);
    server =app.listen(config.server_port,()=>{
        console.log(`Server is running on http://localhost:${config.server_port}`);
    }) 
}

main();