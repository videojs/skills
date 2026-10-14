# Match a reference design

Read this when the skin should match something that exists: a named product
such as Netflix or YouTube, the user's current player, a site, a Figma file,
or screenshots. Work from evidence, not memory. A player's design changes
between versions and platforms, and details recalled or found in search
results are the main source of corrections later.

## 1. Get the reference

1. Ask for screenshots first; the user's own are usually the best evidence.
   For a named product without screenshots, go to it yourself; for anything
   else, ask for a URL, public if possible.
2. Pin down which player it is. Web, mobile, and TV versions of the same
   service differ in layout and controls, so confirm the platform, and note
   when the reference was captured. Treat search results and articles as
   leads to verify, not as the reference.
3. Open pages in the browser your agent controls. Without browser tools, ask
   the user for screenshots and a short screen recording of the states below.
4. Many players, including Netflix's, only appear after signing in. When the
   page asks for a sign-in, or shows a landing page instead of the player,
   stop and ask the user to sign in themselves in that browser. An agent's
   browser often has its own profile, so being signed in to their usual
   browser may not carry over. Continue in the same session once they say
   they're in. Never ask for, type, or store their password, and never read,
   copy, or export cookies or tokens.
5. Look at the player only. Don't download the media, work around DRM or
   paywalls, or capture anything beyond what the user can see. DRM-protected
   video often screenshots as a black frame; the controls still show, so
   capture them over it and judge contrast over real video separately.

## 2. Capture every state

Take as many screenshots as you need, at the player's actual size and zoomed
in on details: before playback, playing with controls shown, paused, idle with
controls hidden, buffering, ended, hover and keyboard focus on each control,
every menu and popover open, the time slider while hovering and dragging,
volume, and fullscreen. Repeat at a narrow width, and on a touch viewport if
the user cares about mobile. Step through transitions with several
screenshots, or read their timings from the page's styles. Where the browser
lets you inspect the page, read computed styles for exact values instead of
estimating from pixels.

Save the screenshots in `design/reference/` at the project root, outside
`src/`, so later sessions can compare against the same evidence.

## 3. Write the spec, then confirm it

Write `design/spec.md` before styling anything, and keep it short. Mark every
item **observed** (seen in the reference), **requested** (the user asked for
it), or **assumed** (neither; ask about these):

- **Layout.** Where controls sit (bottom bar, center, top), and their order
  left to right in each group.
- **Controls.** Which controls exist, which open menus, and how menus are
  structured: one settings menu or separate menus for audio and subtitles,
  speed, and quality.
- **Icons.** The style (outline or filled, rounded or square), stroke weight
  at display size, and how each icon changes between states.
- **Typography.** Families, sizes, weights, and line height. Time displays
  always use `tabular-nums`, even where the reference's digits shift.
- **Surfaces and color.** Button backgrounds or none, menu surfaces, radii,
  scrims, accent, and text colors.
- **Slider.** Track height, fill and buffer colors, thumb shape and color,
  and what the hover preview shows: time, chapter, thumbnail.
- **Interaction and motion.** Hover and press feedback, tooltips or none,
  how controls hide and show, how menus open, durations and easing.

Show the spec to the user and confirm it once before implementing. Build only
what is observed or requested. Leave out anything the reference doesn't show,
such as a title overlay, episode details, a "next episode" button, or center
controls, unless the user asks for it.

## 4. Build in passes

1. Pick the starting skin whose controls are closest; Scaffold when the look
   is built from scratch.
2. Choose one icon set before drawing any icon, matching the spec's style:
   the skin's own set, a Video.js icon set, or one coherent set drawn in the
   same grid and stroke. Never mix sets or improvise single paths.
3. Put the spec's values into shared tokens: colors, menu surface, radii,
   spacing, icon size and stroke, slider geometry, durations, and easing.
4. Arrange controls and menus to the spec, then style controls from the
   tokens, then add states and motion.
5. After the first working preview, before any polish, compare it with the
   reference side by side in the same states and sizes: the paused player,
   slider hover, the volume popup, every menu, and a narrow layout. List each
   difference and fix it.
6. After each pass, consolidate. Delete rules that a later rule overrides,
   fold repeated values into tokens, and keep one rule per decision, so the
   stylesheet reads as the spec rather than a history of corrections.

## Rules that still apply

- Recreate the look; don't copy the original's assets. Draw icons rather
  than lifting icon files, use a font only if its license allows it on the
  user's site, and leave out logos and brand marks unless the user owns them.
- Match behavior through Video.js components, not by porting the original's
  markup or scripts.
- Keep the Video.js accessibility rules where the reference breaks them, such
  as low-contrast controls, missing focus indicators, or controls with no
  accessible name. Record each deliberate difference in the spec and tell the
  user.

## Example

From a session matching Netflix's web player, using the user's screenshot.
It shows the level of detail, not a current description of Netflix:

```md
Reference: Netflix web, desktop Chrome, user screenshot, captured 2026-10

- observed: bottom controls, with seek buttons right after play
- observed: remaining time after the timeline
- observed: separate menus for audio and subtitles, speed, and quality
- observed: transparent buttons; icons scale up on hover; no tooltips
- observed: square charcoal menus
- observed: red slider thumb; one pill shows time and chapter on hover
- assumed: thumbnail preview on hover (not visible in the screenshot; ask)
```
