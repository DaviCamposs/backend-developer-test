export interface IJobEntity {
    id: string
    title: string
    description: string
    location: string
    notes: string | null
    status: 'draft' | 'published' | 'archived' | 'rejected'
    company_id: string
    created_at: string
    updated_at: string
}

