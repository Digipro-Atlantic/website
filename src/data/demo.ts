// Copy for the Book a Demo page (Figma "BOOK DEMO", five states).
// Slots are requests, not live availability: the chosen time is sent with the
// visitor's details and the team confirms by email.

export const demo = {
    eyebrow: 'Book a demo',
    title: 'See Zebul against your own portfolio.',
    lead: 'A demo is a short, no-obligation walkthrough, set up around the kind of property you run and the role you play. We show the parts that matter to you and answer real questions, not a fixed script.',

    email: {
        title: "Let's get you booked",
        lead: 'Get a tailored demo. Please fill out the information below.',
        label: 'Email',
        placeholder: 'me@company.com',
        action: 'Book now',
        privacyPrefix: 'By continuing, you agree to our',
    },

    details: {
        title: 'We need some more info',
        action: 'Submit',
        sentTo: 'Invite will be sent to',
        notYou: 'Not you?',
        fields: {
            phone: 'Phone Number',
            organisation: 'Company/Community Name',
            units: 'Properties or units',
            name: 'Name',
            role: 'I am a',
            location: 'State or city',
        },
        rolePlaceholder: 'Please select',
    },

    team: {
        name: 'Zebul Team',
        role: 'Sales and Enterprise',
        title: 'We look forward to connecting with you',
        points: [
            {
                lead: 'About 30 minutes',
                text: ', online or on a call, at a time that suits you.',
            },
            {
                lead: 'Tailored to your role',
                text: ', whether you own, manage, sit on an estate committee, run institutional housing, or lend.',
            },
            {
                lead: 'Run by someone who knows the Nigerian market',
                text: ' and can speak to rent, estates and compliance here.',
            },
            {
                lead: 'A clear view',
                text: ' of rent collection, the portal your own users would see, and the numbers behind it.',
            },
            {
                lead: 'No pressure.',
                text: ' Start free as an owner afterwards if it fits, or take it to your team to decide.',
            },
        ],
        prompt: 'Select a day and time to schedule a meeting',
    },

    schedule: {
        attendees: 'Invite more attendees',
        attendeesPlaceholder: 'Enter attendee emails...',
        action: 'Continue',
        // Shown over the greyed-out calendar until it unlocks.
        lockedEmail: 'Enter your email first to choose a time',
        lockedDetails: 'Fill in your details to choose a time',
    },

    confirmation: {
        title: 'Meeting info',
        time: 'Time',
        date: 'Date',
        sent: 'Your request has been sent. We will confirm this time by email to',
        mailtoFallback:
            'Your email app should have opened with the details. Send that message to finish the request.',
    },

    emailSubjectPrefix: 'Demo request',

    roles: [
        'Property owner',
        'Property management agency',
        'Estate committee or association',
        'Institutional or government landlord',
        'Lender or financial institution',
        'Prospective partner',
        'Other',
    ],

    /** Bookable slots, in West African Time: 08:00 to 15:30 every half hour, weekdays only. */
    slots: { firstHour: 8, lastHour: 15.5, stepMinutes: 30 },
    /** How far ahead a demo can be requested. */
    bookingWindowDays: 60,

    timeZones: [
        { id: 'Africa/Lagos', city: 'Abuja', name: 'West African Time' },
        { id: 'Europe/London', city: 'London', name: 'UK time' },
        { id: 'America/New_York', city: 'New York', name: 'US Eastern Time' },
    ],
} as const

export const partnerRole = 'Prospective partner' as const
