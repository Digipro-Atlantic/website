import { site } from './site'

export const contact = {
    hero: {
        label: 'Contact Zebul',
        title: 'Connect with our Team',
        description:
            'We will help you take your property management to the next level.',
    },
    formTitle: 'Contact Us',
    subjects: [
        'General enquiry',
        'Sales and demos',
        'Partnerships',
        'Support',
        'Press',
        'Other',
    ],
    messageHint: 'Up to 5,000 characters.',
    messageMax: 5000,
    newsletterLabel:
        'Send me the Zebul newsletter with product news and guides (optional). You can unsubscribe at any time.',
    submitLabel: 'Send Message',
    emailSubjectPrefix: 'Website enquiry',
    successTitle: 'Message sent',
    successBody:
        'Thank you for getting in touch. A member of the team will reply shortly.',
    infoTitle: 'More ways to reach us',
    info: {
        correspondence: {
            title: 'Correspondence',
            address: site.contact.address,
        },
        phone: {
            title: 'Phone Contact',
            display: site.contact.phoneDisplay,
            href: `tel:${site.contact.phone}`,
        },
        email: {
            title: 'Email Us',
            addresses: [site.contact.email, site.contact.parentEmail],
        },
        faq: {
            title: 'Quick Answers',
            link: { label: 'FAQs', to: '/faq' },
        },
        sales: {
            title: 'Sales and Enterprise',
            link: { label: 'Book a Demo', to: '/demo' },
        },
    },
} as const
