# Sheet Component — Hackathon Playground

Recreate the **Sheet** component from the [MORE Design System](https://www.figma.com/design/M1C07sNZKzrSff0hvXKscJ/MORE---Design-system?node-id=4769-40092) in React + TypeScript + SCSS.

## What is a Sheet?

A Sheet is an overlay that lets users perform actions without leaving the current page. It gives a peek of the content behind it — keeping users oriented while keeping the task in focus.

- **Desktop** — slides in from the **right side** of the screen
- **Mobile** — slides in from the **bottom** of the screen

---

## Getting Started

```bash
npm install
npm run dev
```

The dev server starts at `http://localhost:5173`. The entry point for the component is `src/Sheet/index.tsx`. The playground renders in `src/App.tsx`.
In `src/resources` there are some components. In theory these shouldn't have to be touched.

---

## Scenarios to Implement

NOTE THAT THIS WORKSHOP IS **NOT** FOCUSED ON STYLING.
The point of this exercise is to apply the different practices we have learned about in the [epic react](https://www.epicreact.dev/) course.

Please have a look at the designs in Figma.

Reach out if you have any questions.

### 1. Open / Close (IMPORTANT)

- Trigger the sheet to open and close.
- Clicking outside the sheet (the backdrop/overlay) should close it
- Data in that sheet is only fetched once it's opened (bonus points for allowing for rendering on intent (hover of link that would open sheet))

### 2. Sheet header (IMPORTANT)

- A close/back button in the header
- If this is rendered on the 2nd level, it should show the "back" button
- A title area
- Clicking the close button in the header on a 2nd level sheet, it should **close** the entire sheet, not just the current level.
- Clicking the back button in the header on a 2nd level sheet, it should **close** the current sheet level, not the entire sheet.

### 3. Two-level / nested sheet (2nd level) (IMPORTANT)

- When navigating to a sheet within a sheet, the **sheet panel stays in place**.
- Data in that sheet is only fetched once it's opened (bonus points for allowing for rendering on intent (hover of link that would open sheet))

### 4. Animations (not important, but would be cool)

- **Open**: sheet slides in from the correct edge (right on desktop, bottom on mobile)
- **Close**: sheet slides back out
- **Level transition**: only the inner content animates left→right when going deeper; reverse on back
  Have a look at https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog#animating_dialogs for info on how to animate the dialog component

---

## Sizing Rules Summary

| Breakpoint | Width       | Height         | Margin         |
| ---------- | ----------- | -------------- | -------------- |
| Desktop    | 420px fixed | 100vh          | 12px all sides |
| Mobile     | 100vw       | Content-driven | None           |

> **Mobile two-level rule:** both the first and second level panels must share the height of whichever level is taller.

---

## Things to Keep in Mind

- **Focus trap** — keyboard focus should stay within the sheet while it is open (accessibility requirement)
- **Scroll lock** — prevent the background page from scrolling when the sheet is open
- **SCSS modules** are set up (see `src/resources/Button/Button.module.scss`) — use the same pattern for the Sheet
- **No z-index wars** — Would be great to be able to avoid using `z-index` wars. Drawers should always be shown on top of everything, except for tooltips/dropdowns that **it** renders.
- **Animation performance** — prefer `transform` + `opacity` over animating `width`/`height`/`top` for smooth 60fps transitions
