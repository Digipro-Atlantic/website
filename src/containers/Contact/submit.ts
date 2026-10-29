import { site } from '@/data/site'

export const isEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())

const isFormspreeConfigured = () =>
    !site.subscribe.formspreeAction.includes('REPLACE_WITH_YOUR_FORM_ID')

type SendFormOptions = {
    subject: string
    /** Fields sent to Formspree and written into the mailto fallback body. */
    fields: Record<string, string>
}

/**
 * Posts to Formspree when it is configured, otherwise opens a pre-filled
 * mailto to the site contact address. Throws if Formspree rejects the post.
 */
export const sendForm = async ({ subject, fields }: SendFormOptions) => {
    if (isFormspreeConfigured()) {
        const response = await fetch(site.subscribe.formspreeAction, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...fields, _subject: subject }),
        })

        if (!response.ok) {
            throw new Error('Unable to send right now.')
        }
        return
    }

    const body = Object.entries(fields)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n')

    window.location.href = `mailto:${site.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
