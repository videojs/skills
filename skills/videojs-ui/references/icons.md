# Icons

Read this before adding, drawing, replacing, or resizing any player icon.
Icons carry most of a player's character at a small size, so mismatched or
blurry icons are the first thing people notice.

## Choose the source

Decide once for the whole player, before using any icon:

- **Replicating a reference's icons**: use the reference's own SVGs as the
  source. Copy the markup from the page with the browser's inspector, or from
  the user's design files, into `design/reference/icons/`, one file per icon
  and state, keeping each path and `viewBox` as they are, and record the size
  the reference renders them at. Note where they came from in the
  spec. If the icons belong to another company, tell the user before they
  publish the skin: a private build or study is one thing, a public release
  may need permission. Some players use openly licensed sets, so check the
  license where the set is identifiable.
- **The skin's own set, or another Video.js icon set**: use it as is, and
  draw any missing icon to match it.
- **A new set**: draw every icon to the rules below.

Never mix sources within one player, and never improvise a single path to
fill a gap; draw it as part of the set.

## Make it a set

Every icon should look like it came from the same hand:

- One grid and live area, such as 24 by 24 with 2px padding.
- One stroke width, cap, and join, or one fill style; don't mix outline and
  filled icons unless the set uses fill for an active state throughout.
- One corner radius for shapes and one for stroke ends.
- One optical size: circles and triangles reach slightly past squares so
  they look the same size, and play icons sit optically centered.
- One level of detail: no icon noticeably busier or simpler than the rest.
- Matching state variants: play and pause, muted and volume levels, enter
  and exit, captions on and off share outline and weight, and differ only in
  what changes.

## Render at 100%

Aim to show every icon at the size it was drawn for. An icon drawn on a 24px
grid and shown at 18px scales every stroke and edge to fractional pixels,
which blurs and thickens it.

- **New icons:** draw them on a grid the size they're displayed at, with a
  `viewBox` to match, such as `viewBox="0 0 18 18"` shown at `18px`. Snap
  straight edges to whole pixels, and center odd-width strokes on half pixels
  so they render crisp.
- **Copied or existing icons:** keep their `viewBox` and paths, and show them
  at the size they were drawn for, which for a reference is the size it
  renders them at. Never change a `viewBox` on its own to resize an icon;
  that crops or shifts it.
- **When an icon must show at another size:** scaling through the `viewBox`
  is valid SVG. Inspect the result at its rendered size, and redraw the icon
  on the new grid only where you can see blurred edges or a stroke weight
  that no longer matches the set.
- When controls change size, such as in fullscreen, prefer a size the set was
  drawn for over scaling one in between.
- Keep the rendered stroke weight equal across icons; a scaled icon's stroke
  scales with it.

## Review the set

Before using the icons across the player, place every icon and state variant
side by side at actual size and enlarged, in the player's colors and over
video. Check silhouettes against the reference, symmetry, clipping at the
edges, stroke weight as rendered, and optical size and alignment. Fix the set
there, not one control at a time later.
