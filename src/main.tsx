import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from '@tanstack/react-router'
import { createAppRouter } from './router'
import './index.css'

const router = createAppRouter()

// The prerendered head tags are replaced by the router's (HeadContent), which keep them current on navigation.
document.head
    .querySelectorAll('[data-prerender]')
    .forEach((element) => element.remove())

// Built pages arrive prerendered (scripts/prerender.mjs) so crawlers and link
// previews see content; the app then renders fresh over that markup.
ReactDOM.createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router} />
    </StrictMode>,
)
