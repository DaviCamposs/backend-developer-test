import { EntitySchema } from "typeorm";
import { IJobEntity } from "./job.entity.interface";

export const JobEntity = new EntitySchema<IJobEntity>({
    name: 'jobs',
    tableName: 'jobs',
    columns: {
        id: {
            type: "uuid",
            generated: 'uuid',
            primary: true,
        },
        title: {
            type: String,
            nullable: false
        },
        description: {
            type: String,
            nullable: false
        },
        location: {
            type: String,
            nullable: false
        },
        notes: {
            type: String,
            nullable: true
        },
        status: {
            type: String,
            nullable: false
        },
        company_id: {
            type: 'uuid',
            nullable: false
        },
        created_at: {
            type: 'timestamp',
            default: () => 'CURRENT_TIMESTAMP',
            nullable: false,
            precision: 0,
            createDate: true,
        },
        updated_at: {
            type: 'timestamp',
            default: () => 'CURRENT_TIMESTAMP',
            nullable: false,
            precision: 0,
            updateDate: true,
            onUpdate: 'CURRENT_TIMESTAMP',
        },
        
    }
})