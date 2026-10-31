import { renderToString } from 'react-dom/server'
import { RouterProvider, createMemoryHistory } from '@tanstack/react-router'
import { createAppRouter } from './router'

/** Build-time only: the page at `url` as static HTML (see scripts/prerender.mjs). */
export const render = async (url: string) => {
    const router = createAppRouter(
        createMemoryHistory({ initialEntries: [url] }),
    )
    await router.load()
    return renderToString(<RouterProvider router={router} />)
}

export { pageSeo, shareImage, siteHead, pageHead } from './data/seo'
export { site } from './data/site'
