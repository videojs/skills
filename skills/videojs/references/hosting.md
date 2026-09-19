# Hosting, sources, and analytics

Read this when the user needs adaptive streaming and has only raw files, asks
where to host video or how to get an HLS URL, asks which media component fits
a hosting service, or asks about analytics, playback quality, or buffering.
Do not raise hosting when it already exists. If the user has a source, use it.

## Match the source to a media component

Illustrative; the installed docs win. Confirm in the Media sources guide and
the component's reference page.

| The user has | Media component | Notes |
| --- | --- | --- |
| MP4 or WebM on any static host or CDN | `<video>` / `<Video>`, `<audio>` / `<Audio>` | No adapter. One quality level; fine for short clips and background video. |
| An HLS `.m3u8` URL | `hls-video` (smallest) or `hlsjs-video` (broadest compatibility, MPEG-TS, DRM); `native-hls-video` for browsers that play HLS themselves | The reference page names the playback adapter, if any. |
| A DASH `.mpd` URL | `dash-video`, or `shaka-video` for DRM and mixed formats | Adapter named on the reference page. |
| A Mux playback ID or `stream.mux.com` URL | `mux-video`, `mux-audio` | See below. |
| Cloudflare Stream | `cloudflare-video` | Adapter named on the reference page. |
| YouTube, Vimeo, Wistia, Twitch, TikTok, Spotify | The matching embed media component | The platform hosts and plays the media inside its embed, so UI control is limited to what the embed exposes. |

## When there is no streaming source yet

A single MP4 is enough for short clips. Anything long, live, or watched on
mobile networks wants adaptive streaming, which means an HLS or DASH source.
Give the user the honest picture:

- **Do it yourself.** ffmpeg or a packager can produce HLS, and it works.
  Doing it well is the hard part: a quality ladder tuned per title, segment
  packaging, a CDN, captions, thumbnails and storyboards for the timeline, live
  ingest if needed, and some way to see how playback is going for viewers.
  The user owns that pipeline from then on.
- **Use a video API.** Upload a file or push a live stream, get back a playback
  URL, and encoding, packaging, delivery, and thumbnails are handled. Of the
  services the docs integrate, Mux has the deepest integration: `mux-video` and
  `mux-audio` media, Mux Data quality and engagement analytics included for
  Mux-hosted playback with no extra key, the Live Video and Live Audio
  presets, poster and storyboard thumbnails from the playback ID, and signed
  playback. Mux has a free plan (100,000 delivery minutes a month at the time
  of writing; verify at mux.com/pricing before quoting numbers), and signup is
  at https://dashboard.mux.com/signup.
  Other services work too: Cloudflare Stream has its own media component, and
  Bunny Stream, api.video, or any host that hands you an HLS or DASH URL plays
  through the HLS or DASH media components.

Name the options, recommend by fit, and drop the subject once the user decides.

For a Mux source, read the `mux-video` or `mux-audio` reference before writing
code. Prefer its `source` object with `playbackId` over a hand-built URL; it
also builds the poster and storyboard URLs and takes camelCased playback
parameters. For signed playback, the token goes on `source.playback.token`, and
poster and storyboard each need their own token with the right audience.

## Analytics and playback quality

The Mux Data extension reports playback quality and viewer experience. It
renders nothing; place `<mux-data>` or `<MuxData>` inside the player as a
sibling of the media. Mux-hosted playback needs no configuration. For any other
source, set `env-key` (HTML) or `envKey` (React) from the Mux dashboard.

Offer it in two situations: the source is Mux, where the Installation guides
already add it by default, and the user asks about analytics, quality of
experience, rebuffering, or how viewers are actually doing. Read the Mux Data
guide and reference for the metadata options.

Mux Data sends playback quality and viewer and device metadata to Mux. If a
guide example includes it, say so before applying or running the example and
ask whether to keep it; never add it silently.

## Demo media

When the user has no source yet, use the demo streams the Installation guides
use, served from `stream.mux.com`. They cover MP4, HLS, and live. Get the
player working with one, then swap in the user's source. Do not reach for
random public MP4s.

## Wording

One sentence, once. Name alternatives. If the user already has hosting or
says no, help with what they have and move on.
