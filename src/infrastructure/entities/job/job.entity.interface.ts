import { JobStatus } from "../../../domain/entities/enums"

export interface IJobEntity {
    id: string
    title: string
    description: string
    location: string
    notes: string | null
    status: JobStatus
    company_id: string
    created_at: string
    updated_at: string
}

