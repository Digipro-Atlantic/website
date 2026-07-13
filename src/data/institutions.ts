import type { SecGridItem } from './types'

export const institutionsSection = {
    eyebrow: 'Bulk and institutional housing',
    title: 'For organisations that house people at scale.',
    description:
        'Some bodies do not let property, they allocate it. Government and military quarters, university and hospital accommodation, corporate and embassy housing, traditional markets. Billing runs by allocation and by session rather than by ordinary lease, and Zebul handles all of it on a fixed annual licence.',
} as const

export const institutionItems: readonly SecGridItem[] = [
    {
        id: 'allocation',
        tag: 'Allocation',
        title: 'Allocation workflows',
        description:
            'Allocate and reallocate staff quarters, student rooms or market stalls through configurable approval chains, with full occupancy tracking.',
    },
    {
        id: 'student-housing',
        tag: 'Student housing',
        title: 'Academic-calendar billing',
        description:
            "Hostels bill by semester or session. Zebul holds each institution's academic calendar and prompts students before resumption, not after they arrive.",
    },
    {
        id: 'multi-institution',
        tag: 'Multi-institution',
        title: 'Several institutions, one hostel',
        description:
            'A private hostel near a university cluster can house students from several institutions, each billed to its own academic calendar.',
    },
    {
        id: 'guardian',
        tag: 'Guardian access',
        title: 'Guardian portal',
        description:
            "Parents and guardians see a student's accommodation status and payment record, and receive notices, on read-only access only.",
    },
    {
        id: 'markets',
        tag: 'Markets',
        title: 'Stalls and plazas',
        description:
            'Market administrators track stall allocation and rotation, run daily and weekly collection patterns, and move traders from cash to digital.',
    },
    {
        id: 'compliance',
        tag: 'Compliance',
        title: 'Audit and transparency',
        description:
            'Public asset transparency dashboards and audit-ready records for government, military, corporate and international housing portfolios.',
    },
]
