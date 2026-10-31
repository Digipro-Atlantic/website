// Legal copy transcribed from the Figma designs (Terms of Service, Privacy Policy).
// Inline markup inside text: **bold** and [label](href).

export type LegalBlock =
    | { type: 'p'; text: string; tight?: boolean }
    | { type: 'ul'; items: string[]; tight?: boolean }
    | { type: 'h3'; text: string }

export type LegalSection = {
    heading: string
    blocks: LegalBlock[]
}

export type LegalDoc = {
    title: string
    lastUpdated: string
    intro: LegalBlock[]
    sections: LegalSection[]
}

export const termsDoc: LegalDoc = {
    title: 'Terms of Service',
    lastUpdated: 'October 23, 2026',
    intro: [
        { type: 'p', text: 'Welcome to Zebul.' },
        {
            type: 'p',
            text: 'These Terms of Service ("Terms") govern your access to and use of the Zebul platform, website, applications, and related services (collectively, the "Platform").',
        },
        {
            type: 'p',
            text: 'By creating an account or using Zebul, you agree to these Terms. If you do not agree with them, you should not use the Platform.',
        },
    ],
    sections: [
        {
            heading: '1. About Zebul',
            blocks: [
                {
                    type: 'p',
                    text: 'Zebul is a property management platform designed to connect and support property owners, property management agencies, tenants, and financial institutions through a shared digital platform.',
                },
                {
                    type: 'p',
                    text: 'Depending on your role, Zebul may allow you to manage properties, communicate with other users, manage tenancy information, access financial or property-related information, make or receive payments, and use other services made available through the Platform.',
                },
            ],
        },
        {
            heading: '2. User Types',
            blocks: [
                {
                    type: 'p',
                    text: 'Zebul supports different categories of users:',
                },
                {
                    type: 'ul',
                    items: [
                        '**Property Owners:** individuals or entities that own or have an interest in one or more properties.',
                        '**Property Management Agencies:** businesses or professionals authorized to manage properties on behalf of property owners.',
                        '**Tenants:** individuals or entities occupying or seeking to occupy a property under a tenancy or rental arrangement.',
                        "**Financial Institutions:** banks, lenders, insurers, payment providers, or other authorized financial organizations using Zebul's services.",
                    ],
                    tight: true,
                },
                {
                    type: 'p',
                    text: 'Certain features, obligations, and permissions may differ depending on your user type.',
                },
            ],
        },
        {
            heading: '3. Your Account',
            blocks: [
                {
                    type: 'p',
                    text: 'You must provide accurate and complete information when creating your Zebul account.',
                },
                { type: 'p', text: 'You are responsible for:', tight: true },
                {
                    type: 'ul',
                    items: [
                        'keeping your login credentials secure;',
                        'maintaining accurate account information;',
                        'ensuring that you have authority to act on behalf of any organization you represent;',
                        'notifying Zebul if you believe your account has been compromised; and',
                        "all activity carried out through your account, except where caused by Zebul's failure to maintain appropriate security.",
                    ],
                    tight: true,
                },
                {
                    type: 'p',
                    text: 'You must not impersonate another person or organization or create an account using information that you do not have the right to use.',
                },
            ],
        },
        {
            heading: '4. Property Owners',
            blocks: [
                {
                    type: 'p',
                    text: 'Property Owners may use Zebul to manage information relating to properties they own or are authorized to manage.',
                },
                {
                    type: 'p',
                    text: 'You represent and warrant that you have the legal right or appropriate authorization to provide property information to Zebul.',
                },
                {
                    type: 'p',
                    text: 'You are responsible for ensuring that information you provide about your properties, tenants, leases, rental amounts, and other property-related matters is accurate.',
                },
            ],
        },
        {
            heading: '5. Property Management Agencies',
            blocks: [
                {
                    type: 'p',
                    text: 'Property Management Agencies may use Zebul to manage properties on behalf of Property Owners.',
                },
                {
                    type: 'p',
                    text: "An agency must have appropriate authorization from the relevant Property Owner before adding, modifying, or managing information relating to that owner's property.",
                },
                { type: 'p', text: 'Agencies are responsible for:' },
                {
                    type: 'ul',
                    items: [
                        'maintaining appropriate authorization from their clients;',
                        'ensuring that information entered into Zebul is accurate;',
                        'managing access for their employees and representatives; and',
                        'removing or updating access when an employee or representative no longer requires it.',
                    ],
                    tight: true,
                },
                {
                    type: 'p',
                    text: 'Zebul does not determine the legal relationship between an agency and a property owner.',
                },
            ],
        },
        {
            heading: '6. Tenants',
            blocks: [
                {
                    type: 'p',
                    text: 'Tenants may use Zebul to access services relating to their tenancy, communicate with property owners or managers, manage relevant documents, and use other tenant services made available through the Platform.',
                },
                {
                    type: 'p',
                    text: 'You are responsible for providing accurate personal and tenancy information.',
                },
                {
                    type: 'p',
                    text: 'Using Zebul does not by itself create, modify, renew, or terminate a tenancy agreement unless the relevant service expressly provides for this.',
                },
                {
                    type: 'p',
                    text: 'Nothing on the Platform should be interpreted as replacing a legally binding tenancy agreement between a tenant and property owner or manager.',
                },
            ],
        },
        {
            heading: '7. Financial Institutions',
            blocks: [
                {
                    type: 'p',
                    text: 'Financial Institutions may access Zebul through approved integrations, partnerships, or other authorized services.',
                },
                {
                    type: 'p',
                    text: 'Financial Institutions are responsible for complying with applicable laws and regulations governing their activities and for using information obtained through Zebul only for authorized purposes.',
                },
                {
                    type: 'p',
                    text: 'Additional agreements may apply to Financial Institutions, including data processing, integration, commercial, or service agreements.',
                },
                {
                    type: 'p',
                    text: 'Where there is a conflict between these Terms and a separate written agreement with a Financial Institution, the separate agreement will govern to the extent of that conflict.',
                },
            ],
        },
        {
            heading: '8. Payments and Financial Services',
            blocks: [
                {
                    type: 'p',
                    text: 'Certain features of Zebul may allow users to initiate, receive, track, or otherwise interact with payments or financial information.',
                },
                {
                    type: 'p',
                    text: 'Unless expressly stated otherwise, Zebul is not a bank, lender, insurer, or financial institution.',
                },
                {
                    type: 'p',
                    text: 'Third-party payment providers or financial institutions may process transactions made through the Platform. Their own terms and privacy policies may apply.',
                    tight: true,
                },
                {
                    type: 'p',
                    text: 'Zebul does not guarantee that a payment, transfer, financing application, or other financial transaction will be approved, completed, or available at all times.',
                },
            ],
        },
        {
            heading: '9. User Content',
            blocks: [
                {
                    type: 'p',
                    text: 'You may provide information, documents, photographs, property details, messages, payment information, or other content through Zebul ("User Content").',
                },
                {
                    type: 'p',
                    text: 'You retain ownership of your User Content.',
                },
                {
                    type: 'p',
                    text: 'By submitting User Content, you grant Zebul the limited rights necessary to host, store, process, display, transmit, and otherwise use that content to provide and improve the services.',
                },
                {
                    type: 'p',
                    text: 'You are responsible for ensuring that you have the right to provide any User Content you submit.',
                },
            ],
        },
        {
            heading: '10. Acceptable Use',
            blocks: [
                { type: 'p', text: 'You must not use Zebul to:' },
                {
                    type: 'ul',
                    items: [
                        'violate any applicable law or regulation;',
                        'provide false, misleading, or fraudulent information;',
                        'impersonate another person or organization;',
                        "access another user's account without authorization;",
                        'interfere with the operation or security of the Platform;',
                        'upload malicious software or harmful code;',
                        "misuse another user's personal information;",
                        "attempt to gain unauthorized access to Zebul's systems;",
                        'use the Platform to facilitate fraud or other unlawful activity; or',
                        'use the Platform for a purpose that is not permitted by these Terms.',
                    ],
                    tight: true,
                },
            ],
        },
        {
            heading: '11. Intellectual Property',
            blocks: [
                {
                    type: 'p',
                    text: 'Zebul and its licensors own all rights in the Platform, including its software, design, branding, logos, graphics, text, and other materials, except for User Content and third-party materials.',
                },
                {
                    type: 'p',
                    text: 'You may use the Platform only as permitted by these Terms.',
                },
                {
                    type: 'p',
                    text: 'You may not copy, modify, distribute, sell, reverse engineer, or create derivative works from the Platform unless permitted by applicable law or expressly authorized by Zebul.',
                },
            ],
        },
        {
            heading: '12. Third-Party Services',
            blocks: [
                {
                    type: 'p',
                    text: 'Zebul may integrate with third-party services, including payment providers, financial institutions, identity verification services, communication services, and other technology providers.',
                },
                {
                    type: 'p',
                    text: 'Zebul is not responsible for third-party services that it does not control.',
                },
                {
                    type: 'p',
                    text: 'Your use of those services may be subject to separate terms and privacy policies.',
                },
            ],
        },
        {
            heading: '13. Availability of the Platform',
            blocks: [
                {
                    type: 'p',
                    text: 'We aim to keep Zebul available and reliable, but we do not guarantee that the Platform will always be uninterrupted, secure, or error-free.',
                },
                {
                    type: 'p',
                    text: 'We may temporarily suspend or restrict access for maintenance, security, technical issues, legal requirements, or other legitimate reasons.',
                },
            ],
        },
        {
            heading: '14. Suspension and Termination',
            blocks: [
                { type: 'p', text: 'You may stop using Zebul at any time.' },
                {
                    type: 'p',
                    text: 'We may suspend or terminate your account if:',
                },
                {
                    type: 'ul',
                    items: [
                        'you breach these Terms;',
                        'your use of the Platform creates a security or legal risk;',
                        'we are required to do so by law;',
                        'you provide false or misleading information; or',
                        'we discontinue a service or the Platform.',
                    ],
                    tight: true,
                },
                {
                    type: 'p',
                    text: 'Where appropriate, we will provide notice before taking action.',
                },
                {
                    type: 'p',
                    text: 'Certain provisions of these Terms may continue to apply after termination, including provisions relating to intellectual property, liability, disputes, and information that we are legally required or permitted to retain.',
                },
            ],
        },
        {
            heading: '15. Disclaimers',
            blocks: [
                {
                    type: 'p',
                    text: 'Zebul provides technology and services to support property management and related activities.',
                },
                {
                    type: 'p',
                    text: 'Unless expressly stated otherwise, Zebul does not guarantee:',
                },
                {
                    type: 'ul',
                    items: [
                        'the accuracy of information provided by other users;',
                        'the condition, ownership, or legal status of a property;',
                        'the conduct of a property owner, tenant, agency, or financial institution;',
                        'the outcome of a financial application or transaction; or',
                        'that any property, tenancy, payment, or financial service will be available or suitable for you.',
                    ],
                    tight: true,
                },
                {
                    type: 'p',
                    text: 'You are responsible for independently verifying information and obtaining professional advice where appropriate.',
                },
            ],
        },
        {
            heading: '16. Limitation of Liability',
            blocks: [
                {
                    type: 'p',
                    text: 'To the maximum extent permitted by applicable law, Zebul will not be responsible for indirect, incidental, special, consequential, or punitive losses arising from your use of the Platform.',
                },
                {
                    type: 'p',
                    text: 'Nothing in these Terms excludes or limits liability that cannot legally be excluded or limited.',
                },
            ],
        },
        {
            heading: '17. Changes to These Terms',
            blocks: [
                {
                    type: 'p',
                    text: 'We may update these Terms from time to time.',
                },
                {
                    type: 'p',
                    text: 'If we make material changes, we will provide reasonable notice where required by applicable law.',
                },
                {
                    type: 'p',
                    text: 'Your continued use of Zebul after the updated Terms take effect means that you accept the revised Terms.',
                },
            ],
        },
        {
            heading: '18. Governing Law',
            blocks: [
                {
                    type: 'p',
                    text: 'These Terms are governed by the laws of [Jurisdiction], without regard to its conflict-of-law rules.',
                },
                {
                    type: 'p',
                    text: 'Any disputes will be subject to the courts of [Jurisdiction], unless applicable law requires otherwise.',
                },
            ],
        },
        {
            heading: '19. Contact Us',
            blocks: [
                {
                    type: 'p',
                    text: 'If you have questions about these Terms, contact us:',
                },
                { type: 'p', text: '**Zebul**', tight: false },
                {
                    type: 'p',
                    text: 'Email: [info@zebul.ng](mailto:info@zebul.ng)',
                    tight: true,
                },
                {
                    type: 'p',
                    text: 'Address: 6 Asabi Cole Street, Alausa Central Business District, Ikeja, Lagos',
                    tight: true,
                },
            ],
        },
    ],
}

export const privacyDoc: LegalDoc = {
    title: 'Zebul Privacy Policy',
    lastUpdated: 'October 23, 2026',
    intro: [
        { type: 'p', text: 'At Zebul, we take your privacy seriously.' },
        {
            type: 'p',
            text: 'This Privacy Policy explains how Zebul collects, uses, stores, shares, and protects personal information when you use our website, applications, platform, and related services.',
        },
        {
            type: 'p',
            text: 'It also explains how these practices may differ depending on whether you use Zebul as a Property Owner, Property Management Agency, Tenant, or Financial Institution.',
        },
    ],
    sections: [
        {
            heading: '1. Who We Are',
            blocks: [
                {
                    type: 'p',
                    text: 'Zebul ("Zebul", "we", "us", or "our") operates a property management technology platform that helps property owners, property management agencies, tenants, and financial institutions manage and exchange property-related information and services.',
                },
                { type: 'p', text: '**Company**: Zebul' },
                {
                    type: 'p',
                    text: '**Address**: 6 Asabi Cole Street, Alausa Central Business District, Ikeja, Lagos',
                    tight: true,
                },
                {
                    type: 'p',
                    text: '**Email**: [info@zebul.ng](mailto:info@zebul.ng)',
                    tight: true,
                },
            ],
        },
        {
            heading: '2. Information We Collect',
            blocks: [
                {
                    type: 'p',
                    text: 'Depending on how you use Zebul, we may collect the following categories of information.',
                },
                { type: 'h3', text: 'Account Information' },
                { type: 'p', text: 'This may include:' },
                {
                    type: 'ul',
                    items: [
                        'name;',
                        'email address;',
                        'phone number;',
                        'account credentials;',
                        'user type;',
                        'organization or company information; and',
                        'account preferences.',
                    ],
                },
                { type: 'h3', text: 'Identity Information' },
                {
                    type: 'p',
                    text: 'Where required for a particular service, we may collect information used to verify your identity, such as:',
                },
                {
                    type: 'ul',
                    items: [
                        'date of birth;',
                        'government-issued identification information;',
                        'verification results; and',
                        'information required to meet legal or regulatory requirements.',
                    ],
                },
                {
                    type: 'p',
                    text: 'We will only collect this information where necessary and permitted by applicable law.',
                },
                { type: 'h3', text: 'Property Information' },
                {
                    type: 'p',
                    text: 'For Property Owners and Property Management Agencies, this may include:',
                },
                {
                    type: 'ul',
                    items: [
                        'property addresses;',
                        'property details;',
                        'ownership or management information;',
                        'rental information;',
                        'lease information;',
                        'maintenance information;',
                        'property documents; and',
                        'communications relating to properties.',
                    ],
                },
                { type: 'h3', text: 'Tenancy Information' },
                { type: 'p', text: 'For Tenants, this may include:' },
                {
                    type: 'ul',
                    items: [
                        'tenancy details;',
                        'rental information;',
                        'lease or tenancy documents;',
                        'move-in or move-out information;',
                        'maintenance requests;',
                        'communications with property owners or managers; and',
                        'information necessary to provide tenant services.',
                    ],
                },
                { type: 'h3', text: 'Financial Information' },
                {
                    type: 'p',
                    text: 'Depending on the services you use, Zebul may process information relating to:',
                },
                {
                    type: 'ul',
                    items: [
                        'rent payments;',
                        'payment transactions;',
                        'account or transaction information;',
                        'payment status;',
                        'financial applications; and',
                        'other information required to provide financial or payment-related services.',
                    ],
                },
                {
                    type: 'p',
                    text: 'Where payments are processed by a third-party provider, that provider may collect and process payment information under its own privacy policy.',
                },
                // TODO(content): the Figma repeats the Terms "Payments" copy under this heading; confirm real text with the client.
                { type: 'h3', text: 'Device and Technical Information' },
                {
                    type: 'p',
                    text: 'Certain features of Zebul may allow users to initiate, receive, track, or otherwise interact with payments or financial information.',
                },
                {
                    type: 'p',
                    text: 'Unless expressly stated otherwise, Zebul is not a bank, lender, insurer, or financial institution.',
                },
                {
                    type: 'p',
                    text: 'Third-party payment providers or financial institutions may process transactions made through the Platform. Their own terms and privacy policies may apply.',
                    tight: true,
                },
                {
                    type: 'p',
                    text: 'Zebul does not guarantee that a payment, transfer, financing application, or other financial transaction will be approved, completed, or available at all times.',
                },
                { type: 'h3', text: 'Communications' },
                {
                    type: 'p',
                    text: 'We may collect information contained in communications you send through Zebul, including messages, support requests, and other correspondence.',
                },
            ],
        },
        {
            heading: '3. How We Use Your Information',
            blocks: [
                { type: 'p', text: 'We may use personal information to:' },
                {
                    type: 'ul',
                    items: [
                        'create and manage your account;',
                        'provide and operate Zebul services;',
                        'connect users with authorized parties;',
                        'manage properties and tenancy relationships;',
                        'process or facilitate payments;',
                        'provide customer support;',
                        'verify identity and prevent fraud;',
                        'maintain the security of the Platform;',
                        'communicate with you about your account or services;',
                        'improve our products and services;',
                        'analyze Platform usage;',
                        'comply with legal and regulatory obligations; and',
                        'enforce our Terms of Service.',
                    ],
                },
                {
                    type: 'p',
                    text: 'We will not use your personal information for purposes that are incompatible with the purposes described in this Privacy Policy unless permitted or required by law.',
                },
            ],
        },
        {
            heading: '4. How Information Is Shared',
            blocks: [
                { type: 'p', text: 'We may share information with:' },
                { type: 'h3', text: 'Other Zebul Users' },
                {
                    type: 'p',
                    text: 'Depending on the service and your relationship with another user, certain information may be shared with authorized Property Owners, Property Management Agencies, Tenants, or Financial Institutions.',
                },
                {
                    type: 'p',
                    text: 'For example, information relating to a tenancy may need to be accessible to the relevant property owner or authorized property manager.',
                },
                { type: 'h3', text: 'Service Providers' },
                {
                    type: 'p',
                    text: 'We may use third-party providers to help operate Zebul, including providers for:',
                },
                {
                    type: 'ul',
                    items: [
                        'hosting;',
                        'cloud storage;',
                        'payments;',
                        'identity verification;',
                        'communications;',
                        'analytics;',
                        'security; and',
                        'customer support.',
                    ],
                },
                {
                    type: 'p',
                    text: 'These providers may process information on our behalf and are expected to protect it appropriately.',
                },
                { type: 'h3', text: 'Financial Institutions' },
                {
                    type: 'p',
                    text: 'Where you use a service involving a Financial Institution, we may share information necessary to provide that service, subject to applicable law and any required consent or authorization.',
                },
                { type: 'h3', text: 'Legal and Regulatory Authorities' },
                {
                    type: 'p',
                    text: 'We may disclose information where required by law, legal process, court order, or regulatory requirement, or where necessary to protect the rights, safety, and security of Zebul, our users, or others.',
                },
            ],
        },
        {
            heading: '5. Information Sharing Between User Types',
            blocks: [
                {
                    type: 'p',
                    text: 'Zebul is designed to facilitate interactions between different types of users.',
                },
                { type: 'p', text: 'Depending on the service you use:' },
                {
                    type: 'p',
                    text: '**Property Owners** may receive information relating to their properties and associated tenancy relationships.',
                },
                {
                    type: 'p',
                    text: '**Property Management Agencies** may receive information relating to properties they are authorized to manage.',
                },
                {
                    type: 'p',
                    text: '**Tenants** may receive information relating to their tenancy and communications with authorized property owners or managers.',
                },
                {
                    type: 'p',
                    text: '**Financial Institutions** may receive information necessary to provide an authorized financial or related service.',
                },
                {
                    type: 'p',
                    text: "We aim to limit access to information based on the user's role, authorization, and the service being provided.",
                },
            ],
        },
        {
            heading: '6. Legal Bases for Processing',
            blocks: [
                {
                    type: 'p',
                    text: 'Where applicable privacy law requires a legal basis for processing personal information, we may rely on one or more of the following:',
                },
                {
                    type: 'ul',
                    items: [
                        'performance of a contract;',
                        'compliance with a legal obligation;',
                        'legitimate interests;',
                        'consent; or',
                        'protection of vital interests.',
                    ],
                },
                {
                    type: 'p',
                    text: 'The appropriate legal basis will depend on the nature and purpose of the processing.',
                },
            ],
        },
        {
            heading: '7. Cookies and Similar Technologies',
            blocks: [
                {
                    type: 'p',
                    text: 'Zebul may use cookies and similar technologies to:',
                },
                {
                    type: 'ul',
                    items: [
                        'keep you signed in;',
                        'remember preferences;',
                        'understand how the Platform is used;',
                        'improve performance;',
                        'maintain security; and',
                        'measure the effectiveness of our services.',
                    ],
                },
                {
                    type: 'p',
                    text: 'You may be able to control cookies through your browser or device settings. Certain Platform features may not work properly if necessary cookies are disabled.',
                },
            ],
        },
        {
            heading: '8. Data Security',
            blocks: [
                {
                    type: 'p',
                    text: 'We use reasonable technical and organizational measures designed to protect personal information against unauthorized access, loss, misuse, alteration, or disclosure.',
                },
                {
                    type: 'p',
                    text: 'However, no online service can guarantee absolute security.',
                },
                {
                    type: 'p',
                    text: 'You are also responsible for protecting your account credentials and notifying us if you suspect unauthorized access to your account.',
                },
            ],
        },
        {
            heading: '9. Data Retention',
            blocks: [
                {
                    type: 'p',
                    text: 'We retain personal information for as long as reasonably necessary to:',
                },
                {
                    type: 'ul',
                    items: [
                        'provide our services;',
                        'maintain your account;',
                        'comply with legal and regulatory requirements;',
                        'resolve disputes;',
                        'enforce agreements; and',
                        'protect our legal rights.',
                    ],
                },
                {
                    type: 'p',
                    text: 'Retention periods may vary depending on the type of information and the purpose for which it was collected.',
                },
            ],
        },
        {
            heading: '10. Your Privacy Rights',
            blocks: [
                {
                    type: 'p',
                    text: 'Depending on where you live, you may have rights regarding your personal information, including the right to:',
                },
                {
                    type: 'ul',
                    items: [
                        'access your personal information;',
                        'request correction of inaccurate information;',
                        'request deletion of certain information;',
                        'object to or restrict certain processing;',
                        'request portability of certain information;',
                        'withdraw consent where processing is based on consent; and',
                        'lodge a complaint with a relevant privacy or data protection authority.',
                    ],
                },
                {
                    type: 'p',
                    text: 'Some rights may be limited by applicable law.',
                },
                { type: 'p', text: 'To exercise your rights, contact us at:' },
                {
                    type: 'p',
                    text: '[**info@zebul.ng**](mailto:info@zebul.ng)',
                },
                {
                    type: 'p',
                    text: 'We may need to verify your identity before processing certain requests.',
                },
            ],
        },
        {
            heading: "11. Children's Privacy",
            blocks: [
                {
                    type: 'p',
                    text: 'Zebul is not intended for children where use of the Platform is not permitted under applicable law.',
                },
                {
                    type: 'p',
                    text: 'We do not knowingly collect personal information from children in violation of applicable legal requirements.',
                },
            ],
        },
        {
            heading: '12. International Data Transfers',
            blocks: [
                {
                    type: 'p',
                    text: 'Zebul and its service providers may process or store information in countries other than the country where you live.',
                },
                {
                    type: 'p',
                    text: 'Where required by applicable law, we will use appropriate safeguards for international transfers of personal information.',
                },
            ],
        },
        {
            heading: '13. Third-Party Links and Services',
            blocks: [
                {
                    type: 'p',
                    text: 'Zebul may contain links to or integrations with third-party websites and services.',
                },
                {
                    type: 'p',
                    text: 'We are not responsible for the privacy practices of third parties.',
                },
                {
                    type: 'p',
                    text: 'We encourage you to review the privacy policies of third-party services before providing them with personal information.',
                },
            ],
        },
        {
            heading: '14. Changes to This Privacy Policy',
            blocks: [
                {
                    type: 'p',
                    text: 'We may update this Privacy Policy from time to time to reflect changes to our services, legal requirements, or privacy practices.',
                },
                {
                    type: 'p',
                    text: 'When we make material changes, we will provide notice where required by law.',
                },
                {
                    type: 'p',
                    text: 'The "Last updated" date at the top of this policy indicates when it was most recently revised.',
                },
            ],
        },
        {
            heading: '15. Contact Us',
            blocks: [
                {
                    type: 'p',
                    text: 'If you have questions, concerns, or requests relating to privacy, please contact us:',
                },
                { type: 'p', text: '**Zebul**' },
                {
                    type: 'p',
                    text: '6 Asabi Cole Street, Alausa Central Business District, Ikeja, Lagos',
                    tight: true,
                },
                {
                    type: 'p',
                    text: '**Email**: [info@zebul.ng](mailto:info@zebul.ng)',
                    tight: true,
                },
            ],
        },
    ],
}
