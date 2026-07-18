/**
 * Soft-launch visibility.
 * Paths listed here are omitted from public nav/discovery and blocked with the branded 404.
 * Flip entries off when those products are ready to ship.
 *
 * Related soft-launch behaviour (not path-blocked here):
 * - /signin is hidden from CTAs until the product app is live
 * - /partners redirects to /demo?intent=partner
 * - /demo is early-interest / conversation capture (not a product demo yet)
 */
export const previewOnlyPaths = ['/estates', '/pricing', '/financing'] as const

export type PreviewOnlyPath = (typeof previewOnlyPaths)[number]

export const isPreviewOnlyPath = (path: string): path is PreviewOnlyPath =>
    (previewOnlyPaths as readonly string[]).includes(path)
