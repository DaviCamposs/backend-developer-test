import 'reflect-metadata';
import { DataSource } from 'typeorm';

import * as dotenv from 'dotenv';
dotenv.config();

const connectionDB = new DataSource({
    type: 'postgres',
    entities: [__dirname + '/../../infrastructure/entities/**/*.entity.{ts,js}'],
    synchronize: false,
    host: process.env.DATABASE_HOST,
    port:Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
});

export default connectionDB;