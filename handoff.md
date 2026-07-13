# Handoff: Scroll Reveal + Route Transitions

**Project:** Zebul website (`/Users/macbook/Projects/frontend/website`)  
**Stack:** React 19, TanStack Router, Vite, Tailwind 4, `motion` v12, `react-intersection-observer` v10  
**Status:** Homepage sections are built. This task adds animation only — no copy or layout changes.

---

## Goal

Implement two animation layers:

1. **Route transitions** — subtle fade between pages (`/`, `/pricing`, `/faq`)
2. **Scroll reveal** — homepage sections fade up on scroll (legacy-inspired)

Both libraries are already installed. **Do not add new dependencies.**

---

## Decisions (locked in)

| Topic                    | Decision                                                                                        |
| ------------------------ | ----------------------------------------------------------------------------------------------- |
| Scroll reveal library    | `react-intersection-observer` (`useInView`) + `motion` (`useAnimation`, `motion` elements)      |
| Route transitions        | `AnimatePresence` from `motion/react`, **subtle fade** (not horizontal slide)                   |
| `prefers-reduced-motion` | **Yes** — skip animations, show content immediately                                             |
| Hero                     | **No scroll wait** — visible on first paint (`immediate` prop)                                  |
| Statement points         | **Stagger** individually (diverges from legacy single-block, intentional)                       |
| CTA section              | **Add reveal** (legacy did not; user requested it)                                              |
| Scope                    | **Homepage only** for scroll reveal; `Reveal` components live in `components/` for future reuse |
| CSS `.reveal` classes    | **Not needed** — motion handles transforms/opacity                                              |

---

## Legacy reference

**File:** `legacy/index.html`

**Scroll reveal CSS (match these values in motion variants):**

- Hidden: `opacity: 0`, `translateY(26px)`
- Visible: `opacity: 1`, `translateY(0)`
- Transition: `0.7s cubic-bezier(0.16, 1, 0.3, 1)`
- Trigger: `IntersectionObserver` threshold `0.12`, fire once then unobserve

**Legacy homepage reveal map (for parity context):**

- Hero copy: `reveal in` (immediate visible)
- Statement intro + points block: separate reveals (we stagger points instead)
- Models header, each card, tenant note, property pills: individual reveals
- Eco header + each eco card: individual reveals
- CTA: no reveal in legacy (we add reveal per user request)

---

## Architecture

```
Layer 1: Route transitions (__root.tsx)
  AnimatePresence → motion.main(key=pathname) → Outlet

Layer 2: Scroll reveal (homepage containers)
  Reveal / RevealGroup / RevealItem → useInView + motion variants
```

**Import path for motion:** `import { … } from 'motion/react'`  
(`motion` re-exports framer-motion)

---

## Task 1: Route transitions in `__root.tsx`

**File:** `src/routes/__root.tsx`

**Current structure:**

```tsx
<>
    <Header />
    <Outlet />
    <Footer />
    <TanStackRouterDevtools />
</>
```

**Target structure:**

- Wrap **only** `<Outlet />` in `AnimatePresence` + `motion.main`
- Keep `Header`, `Footer`, devtools **outside** AnimatePresence (nav stays fixed)
- Use `useRouterState` to get `pathname` as `key`

**Implementation spec:**

```tsx
import { Outlet, createRootRoute, useRouterState } from '@tanstack/react-router'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

function RootComponent() {
    const pathname = useRouterState({ select: (s) => s.location.pathname })
    const prefersReducedMotion = useReducedMotion()

    return (
        <>
            <Header />
            <AnimatePresence
                mode="wait"
                initial={false}
                onExitComplete={() => window.scrollTo(0, 0)}
            >
                <motion.div
                    key={pathname}
                    initial={{ opacity: prefersReducedMotion ? 1 : 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: prefersReducedMotion ? 1 : 0 }}
                    transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
                >
                    <Outlet />
                </motion.div>
            </AnimatePresence>
            <Footer />
            <TanStackRouterDevtools />
        </>
    )
}
```

**Notes:**

- `mode="wait"` replaces deprecated `exitBeforeEnter`
- `initial={false}` prevents fade-in on first app load
- `onExitComplete` scrolls to top after exit (matches user's Next.js pattern)
- `useReducedMotion()` gates the fade itself (not just scroll reveal) — under reduced motion, opacity stays at 1 and duration is 0, so route changes are instant with no flash
- **Nested `<main>` resolved via Option B:** root wrapper is `motion.div`, not `motion.main`. This is required because `index.tsx`, `pricing.tsx`, and `faq.tsx` **all** render their own `<main>` — Option A (removing `<main>` only from `index.tsx`) would fix `/` but leave nested `<main>` elements on `/pricing` and `/faq`, which are out of scope to modify. `motion.div` sidesteps the conflict on all three routes without touching any of them.

**Verify:** Navigate `/` → `/pricing` → `/faq` — subtle fade, scroll resets to top, no duplicate `<main>` landmarks on any route.

---

## Task 2: Shared animation constants

**File:** `src/components/Reveal/variants.ts` (new)

```ts
export const revealEase = [0.16, 1, 0.3, 1] as const

export const revealTransition = {
    duration: 0.7,
    ease: revealEase,
} as const

export const revealItemVariants = {
    hidden: { opacity: 0, y: 26 },
    visible: {
        opacity: 1,
        y: 0,
        transition: revealTransition,
    },
} as const

export const revealContainerVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.12 },
    },
} as const
```

---

## Task 3: `Reveal` component

**Files:**

- `src/components/Reveal/Reveal.tsx`
- `src/components/Reveal/RevealGroup.tsx`
- `src/components/Reveal/RevealItem.tsx`
- `src/components/Reveal/index.ts`
- Update `src/components/index.ts` to export `Reveal`, `RevealGroup`, `RevealItem`

### `Reveal.tsx`

**Props:**

```ts
type RevealProps = {
    children: React.ReactNode
    className?: string
    immediate?: boolean // hero: skip scroll trigger
    as?: 'div' | 'section' | 'article' | 'p' | 'span'
}
```

**Behavior:**

Call all hooks unconditionally on every render — `useReducedMotion()` is reactive (the OS setting can change live), so gating hook calls themselves behind `if (prefersReducedMotion)` would change the number of hooks called across renders of the same instance and violate the Rules of Hooks. Only the returned JSX branches conditionally.

1. `useReducedMotion()`, `useInView({ threshold: 0.12, triggerOnce: true })`, and `useAnimation()` are all called unconditionally at the top
2. `useEffect`: when `inView` (or when `immediate` is true, or when `prefersReducedMotion` is true), call `controls.start('visible')` / `controls.set('visible')`
3. If `prefersReducedMotion || immediate` is true, return a plain non-motion `Component` (no transform/opacity animation, visible immediately) — same simple path for both cases, no `motion` wrapper
4. Otherwise render `motion.{as}` with `ref`, `initial="hidden"`, `animate={controls}`, `variants={revealItemVariants}`

**Implementation shape:**

```tsx
const prefersReducedMotion = useReducedMotion()
const controls = useAnimation()
const { ref, inView } = useInView({ threshold: 0.12, triggerOnce: true })

useEffect(() => {
    if (immediate || prefersReducedMotion || inView) {
        controls.start('visible')
    }
}, [inView, immediate, prefersReducedMotion, controls])

if (prefersReducedMotion || immediate) {
    return <Component className={className}>{children}</Component>
}

return (
    <MotionComponent
        ref={ref}
        className={className}
        initial="hidden"
        animate={controls}
        variants={revealItemVariants}
    >
        {children}
    </MotionComponent>
)
```

### `RevealGroup.tsx`

Stagger parent for statement points.

**Props:** `children`, `className?`

**Behavior:**

- Same `useInView` + `useAnimation` + `useReducedMotion` pattern as `Reveal`
- Uses `revealContainerVariants` on parent `motion.div`
- Children must be `RevealItem` components

### `RevealItem.tsx`

**Props:** `children`, `className?`

**Behavior:**

- `motion.div` with `variants={revealItemVariants}` (no own `useInView` — parent triggers stagger)

---

## Task 4: Wire homepage sections

### `src/containers/Home/Hero/Hero.tsx`

Wrap the **copy column** (eyebrow, h1, lead, buttons) in:

```tsx
<Reveal immediate>…copy…</Reveal>
```

Do **not** wrap: `hero-grid`, `EstateArt`, trust strip.

---

### `src/containers/Home/Statement/Statement.tsx`

```tsx
<Reveal>
  <SectionHeader … />
</Reveal>

<RevealGroup>
  {statement.points.map((point) => (
    <RevealItem key={point.number}>
      <div className="flex gap-4">…</div>
    </RevealItem>
  ))}
</RevealGroup>
```

---

### `src/containers/Home/Models/Models.tsx`

| Element                          | Wrapper                                                                                                                  |
| -------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| `SectionHeader`                  | `<Reveal>`                                                                                                               |
| Each `ModelCard`                 | Wrap in `Models.tsx` map: `<Reveal key={…} className={card.wide ? 'col-span-full' : undefined}><ModelCard … /></Reveal>` |
| Tenant note `<p>`                | `<Reveal>`                                                                                                               |
| Property pills container `<div>` | `<Reveal>`                                                                                                               |

**Grid-span gotcha:** the cards grid (`grid ... grid-cols-2`) uses `col-span-full` on the wide `ModelCard`'s `<article>` (see `ModelCard.tsx`, `card.wide`) to span both columns. `Reveal` inserts a wrapper element between the grid and the card, so the _wrapper_ becomes the actual grid child — `col-span-full` on the inner `<article>` would no longer do anything and the wide card would collapse to one column. Forward the span to the `Reveal` wrapper itself via `className` (as shown above) instead of relying on the class living on `ModelCard`'s internal element.

**Do not** modify `ModelCard.tsx` internals unless needed for `as="article"` — wrapping in parent is sufficient.

---

### `src/containers/Home/EcoSection/EcoSection.tsx`

| Element         | Wrapper                                                  |
| --------------- | -------------------------------------------------------- |
| `SectionHeader` | `<Reveal>`                                               |
| Each `EcoCard`  | `<Reveal key={card.to}><EcoCard card={card} /></Reveal>` |

---

### `src/containers/Home/Cta/Cta.tsx`

Wrap the inner `.wrap` content (eyebrow, h2, p, buttons) in:

```tsx
<Reveal>…content…</Reveal>
```

---

### `src/routes/index.tsx`

No change needed — root wrapper is `motion.div` (Option B), so `index.tsx` keeps its own `<main>` untouched, same as `pricing.tsx` and `faq.tsx`.

---

## Task 5: Files to create / modify

### Create

| Path                                    | Purpose                |
| --------------------------------------- | ---------------------- |
| `src/components/Reveal/variants.ts`     | Shared motion variants |
| `src/components/Reveal/Reveal.tsx`      | Scroll reveal wrapper  |
| `src/components/Reveal/RevealGroup.tsx` | Stagger container      |
| `src/components/Reveal/RevealItem.tsx`  | Stagger child          |
| `src/components/Reveal/index.ts`        | Barrel export          |

### Modify

| Path                                            | Change                                              |
| ----------------------------------------------- | --------------------------------------------------- |
| `src/components/index.ts`                       | Export Reveal components                            |
| `src/routes/__root.tsx`                         | AnimatePresence + motion.div (reduced-motion aware) |
| `src/containers/Home/Hero/Hero.tsx`             | `<Reveal immediate>` on copy                        |
| `src/containers/Home/Statement/Statement.tsx`   | Reveal + RevealGroup                                |
| `src/containers/Home/Models/Models.tsx`         | Reveal wrappers                                     |
| `src/containers/Home/EcoSection/EcoSection.tsx` | Reveal wrappers                                     |
| `src/containers/Home/Cta/Cta.tsx`               | Reveal wrapper                                      |

### Do NOT modify

- `src/data/*` — no data changes
- `src/index.css` — no `.reveal` CSS needed
- Other routes (`pricing.tsx`, `faq.tsx`) — out of scope
- `package.json` — deps already present

---

## Acceptance criteria

### Route transitions

- [ ] Navigating between `/`, `/pricing`, `/faq` shows subtle fade (~200ms)
- [ ] No animation on initial page load (`initial={false}`)
- [ ] Scroll position resets to top after route change
- [ ] Header and footer do not fade/re-mount

### Scroll reveal (homepage)

- [ ] Hero copy visible immediately on load (no flash of hidden content)
- [ ] Below-fold sections fade up (`y: 26 → 0`) when ~12% visible
- [ ] Each reveal fires once (no re-hide on scroll up)
- [ ] Statement points stagger (~120ms between each)
- [ ] Model cards reveal individually as scrolled into view
- [ ] Eco cards reveal individually
- [ ] CTA section reveals on scroll

### Accessibility

- [ ] With `prefers-reduced-motion: reduce` enabled (OS setting), all content appears immediately with no opacity/transform animation
- [ ] No layout shift or permanently hidden content

### Build

- [ ] `pnpm run build` passes with no TypeScript errors
- [ ] No new dependencies added

---

## Verification steps

1. `pnpm dev` — open `/`
2. Hard refresh — hero copy should be visible instantly
3. Scroll down — sections animate in sequentially
4. Enable reduced motion:
    - macOS: System Settings → Accessibility → Display → Reduce motion
    - Chrome DevTools: Rendering → Emulate CSS media feature `prefers-reduced-motion: reduce`
5. Reload — no animations should run
6. Navigate to `/pricing` and back — subtle fade, scroll at top

---

## Implementation notes for the agent

1. **TypeScript:** `ease: [0.16, 1, 0.3, 1]` may need `as const` or type assertion for motion's `Ease` type.
2. **StrictMode:** `useInView` + `useEffect` + `useAnimation` is fine in React 19 StrictMode; `triggerOnce: true` prevents double-fire issues.
3. **EcoCard inside Reveal:** `Reveal` wraps `Link` — ensure `motion.div` wrapper doesn't break click targets (wrapper around Link is fine).
4. **Nested main:** Avoided by using `motion.div` (not `motion.main`) at root — `index.tsx`, `pricing.tsx`, and `faq.tsx` all keep their own `<main>` unmodified (see Task 1).
5. **Hooks order:** In `Reveal.tsx`, call `useReducedMotion`/`useInView`/`useAnimation` unconditionally every render — only the JSX return branches on `prefersReducedMotion`/`immediate` (see Task 3).
6. **Grid span:** When wrapping `ModelCard` in `Reveal`, forward `col-span-full` to the `Reveal` wrapper for the wide card, not just the inner `ModelCard` (see Task 4, Models).
7. **Keep diffs minimal** — animation only, no unrelated refactors.
8. **Match existing conventions** — barrel exports, `@/` path alias, Tailwind for layout, motion for animation.

---

## Out of scope (future work)

- Scroll reveal on `/pricing`, `/faq`, or other legacy pages
- Stagger on model cards or eco cards
- Page transition variants beyond subtle fade
- Removing unused `motion` features if bundle size becomes a concern
