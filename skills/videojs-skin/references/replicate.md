# Replicate another player

Read this when the user wants their skin to look and feel like a specific
player, such as the one on a streaming service or their current site.

## Get access

1. Find a page with the player. For a well-known service, such as YouTube or
   Netflix, go there yourself; otherwise ask for a URL, public if possible.
2. Open it in the browser your agent controls. Without browser tools, ask the
   user for screenshots and a short screen recording of the states below.
3. Many players, including Netflix's, only appear after signing in. When the
   page asks for a sign-in, or shows a landing page instead of the player,
   stop and ask the user to sign in themselves in that browser. An agent's
   browser often has its own profile, so being signed in to their usual
   browser may not carry over. Continue in the same session once they say
   they're in. Never ask for, type, or store their password, and never read,
   copy, or export cookies or tokens.
4. Look at the player only. Don't download the media, work around DRM or
   paywalls, or capture anything beyond what the user can see. DRM-protected
   video often screenshots as a black frame; the controls still show, so
   capture them over it and judge contrast over real video separately.

## Capture the look and feel

Gather enough to rebuild the player without guessing. Take as many
screenshots as you need, at the player's actual size and zoomed in on details.

- **States.** Before playback, playing with controls shown, paused, idle with
  controls hidden, buffering, ended, hovering and keyboard focus on each
  control, each menu and popover open, the time slider preview, volume, and
  fullscreen. Repeat at a narrow width, and on a touch viewport if the user
  cares about mobile.
- **Typography.** Font families and fallbacks, sizes, weights, letter spacing,
  line height, and number styles in time displays.
- **Iconography.** Icon style (outline or filled), stroke weight, size,
  optical alignment, and how icons change between states.
- **Spacing and layout.** Control sizes, gaps, padding, how the control bar
  is grouped and aligned, and how it changes as the player narrows.
- **Color and surfaces.** Text, icon, accent, and surface colors, gradients
  or scrims behind controls, opacity, blur, shadows, borders, and radii.
- **Motion.** What animates when controls show and hide, menus open, buttons
  are pressed, and icons swap: the properties, durations, easing, delays, and
  any stagger. Step through each transition with several screenshots, or
  read the timings from the page's styles.

Where the browser lets you inspect the page, read computed styles and CSS
custom properties for exact values instead of estimating from pixels.

## Rebuild it

- Pick the starting skin whose control set is closest, usually Scaffold to
  build the look from scratch, or Neutral when the original is close to it.
- Put what you measured into the skin's tokens first: colors, radii, spacing,
  fonts, durations, and easing. Then adjust layout and individual controls.
- Recreate the look; don't copy the original's assets. Use Video.js icons or
  draw equivalents rather than lifting icon files, use a font only if its
  license allows it on the user's site, and leave out logos and brand marks
  unless the user owns them.
- Match behavior through Video.js components, not by porting the original's
  markup or scripts.
- Keep the Video.js accessibility rules even where the original breaks them,
  such as low-contrast controls or a missing focus indicator. Tell the user
  where the skin deliberately differs and why.
- Compare side by side: screenshot the skin in the workbench in the same
  states and sizes as the original, list the differences that remain, and
  fix them before handing back.
