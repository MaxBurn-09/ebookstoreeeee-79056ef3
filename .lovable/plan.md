# Auto-swiping hero book stack

## What will change
- Keep the current three-book hero composition, sizing, angles, links, and surrounding layout unchanged.
- Cycle through the full existing book catalog in groups of three.
- Advance automatically with a smooth, subtle transition and loop continuously.
- Add touch/mouse swipe support so visitors can move backward or forward manually.
- Pause automatic movement during interaction and respect reduced-motion settings.

## Technical details
- Add a small reusable stateful book-stack carousel beside the homepage code.
- Preserve the center-book emphasis and side-book rotations for every group.
- Use lightweight CSS transforms and opacity only; no new images or dependencies.
- Verify mobile and desktop sizing, links, overflow, and browser errors.
