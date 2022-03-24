import {TypeOrmModuleOptions} from "@nestjs/typeorm";

export const typeormConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'Tikunia19',
    database: 'report',
    entities: [
        __dirname + '/../**/*.entity{.ts,.js}',
    ],
    autoLoadEntities: true,
    synchronize: true,
}
