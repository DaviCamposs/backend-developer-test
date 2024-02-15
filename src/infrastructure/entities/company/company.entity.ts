import { EntitySchema } from "typeorm";
import { ICompanyEntity } from "./company.entity.interface";

export const CompanyEntity = new EntitySchema<ICompanyEntity>({
    name: 'companies',
    tableName: 'companies',
    columns: {
        id: {
            type: "uuid",
            generated: 'uuid',
            primary: true,
        },
        name: {
            type: String,
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