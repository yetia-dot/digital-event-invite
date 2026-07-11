# event-invite TODO

- [x] Port graduation theme CSS into `event-invite/src/app/globals.css` (tokens + hero/section/card/button/form classes).
- [x] Refactor guest invite UI in `event-invite/src/app/invite/[token]/page.tsx` to use the new classes (hero + sections + timeline + wishlist + RSVP card).
- [x] Update `event-invite/src/app/invite/[token]/RsvpForm.tsx` styling to match the template button/input style.
- [x] Update `event-invite/src/app/invite/[token]/ReserveButton.tsx` styling to match the template.
- [x] Run `npm run dev` in event-invite and visually verify responsiveness + step flows.

- [ ] Major structural change:
  - [x] Replace `src/app/page.tsx` token entry UI with a generic landing page (navbar + event details + images + RSVP flow).
  - [x] Create `/event`, `/portfolio`, `/gifts` pages with the required nav destinations.
  - [x] Implement RSVP flow: click RSVP → ask name + number → confirm coming → reveal exact Google Maps location link.
  - [x] Update palette variables in `src/app/globals.css` (same variable names; new values per spec).


