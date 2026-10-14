# Review the skin

Read this before handing a skin change back. Check the states the change can
affect, not every combination. The project's `README.md` explains how to open
the workbench in a given state from its URL.

## In the workbench

- **Size.** The narrowest and widest player widths, and each aspect ratio for
  video. Controls collapse at container sizes, so check around each
  breakpoint the skin uses.
- **Language.** A right-to-left language such as Arabic, and one with long
  labels such as German. Labels must fit or truncate legibly, and the layout
  must mirror.
- **Color scheme.** Light and dark, for audio skins.
- **Playback.** Before playback with the poster, playing, paused, buffering,
  ended, and idle with controls hidden; at and behind the live edge for live
  presets; an error, to see the error dialog.
- **Preferences.** Reduced motion, increased contrast, reduced transparency,
  and forced colors, using the browser's emulation.

## Accessibility a generic audit misses

Run the companion audit skill first if one is installed, then check these:

- **Contrast over the picture.** Video frames change, so a control that
  passes over a dark frame can vanish over a bright one. Check text at 4.5:1
  and icons, slider tracks, thumbs, and focus rings at 3:1 over bright, dark,
  and busy scenes, not only over the poster.
- **Keyboard only.** Tab reaches every control in visual order, each one
  operates with the keys its reference page lists, menus and popovers close
  with Escape and return focus to their trigger, and the focus indicator
  stays visible.
- **Hidden controls.** Controls show again when anything inside the player
  receives keyboard focus, and nothing focusable stays hidden.
- **Names and state.** Every control has an accessible name, including custom
  ones; tooltips do not provide one. State is not shown by color alone.
- **Announcements.** The status announcer, or an equivalent live region,
  still reports play, pause, volume, captions, and seeking.
- **Captions.** Captions stay readable and unobstructed when controls show.
- **Targets.** Controls are at least 24 by 24 CSS pixels, larger on
  touch-first layouts.

Report anything that fails with the state that shows it, for example
"volume slider thumb under 3:1 at `ratio=9:16`, bright frame at 0:42".
