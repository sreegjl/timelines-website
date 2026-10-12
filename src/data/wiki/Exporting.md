# Exporting

Timelines can be exported as an image, a video, a JSON file, or a packaged `.timeline` file that bundles images and notes. All export options are accessible from the timeline menu in the sidebar.

PNG and video exports ask where to save the file once they're rendered. The preview in each export window shows exactly what will be exported.

## PNG

The PNG export renders the timeline canvas as a static image. You can configure:

- **Resolution** - choose from a set of presets or enter a custom size
  - Timeline (current view)
  - 1080p (1920 x 1080)
  - 4K (3840 x 2160)
  - Letter 300 DPI (3300 x 2550)
  - A4 300 DPI (3508 x 2480)
  - Poster 36x24" (10800 x 7200)
  - Custom
- **Timeline Scale** - spacing between years for this export only, from `0.2x` to `5x`, like adjusting **Timeline Length** (see [[Dates]]). Your timeline itself is left unchanged.
- **Range** - set the start and end point of the portion to capture
- **Background** - the theme's default, secondary, or tertiary background, or transparent
- **Title Watermark** - optionally add the timeline title and/or logo in a corner
- **Filename** - the name of the output file

Presets and custom sizes with both a width and a height export at exactly that size. The selected range is scaled to fit, keeping only the rows it actually uses, and centered on the background. With **Timeline**, the image is the range at twice its on-screen size.

## Video

The video export renders a panning animation across the timeline and saves it as an MP4. You can configure:

- **Resolution** - 1080p, 4K, or a custom size up to 7680 x 4320
- **Duration** - how long the video runs in seconds
- **Frame rate** - 24, 30, or 60 fps
- **Zoom** - how much of the timeline's height is in view while it pans
- **Range** - the portion of the timeline to pan across
- **Background** and **Title Watermark** - as for PNG

If your computer's video encoder doesn't support the chosen size and frame rate, the export says so before it starts. Try a smaller size or a lower frame rate.

## JSON (data only)

The JSON export downloads the raw timeline data for the current timeline. This is useful for backups. Note that element images and notes are stored in separate folders on your computer and are **not** included — if you share a JSON export, the other person will see the timeline without its images and notes. To share everything, use a packaged export instead.

## Packaged .timeline (images & notes)

**Export .timeline (images & notes)** saves your whole timeline as a single shareable file: the timeline data plus every image and note it references. Only files your timeline actually uses are included, nothing else from your images or notes folders travels with it.

A packaged file is meant for sharing and importing, and works everywhere a regular `.timeline` file does:

- **Send it to another person.** They can use **Import** on the home screen. Importing unpacks the timeline into their library and copies its images and notes into their own folders, so everything shows up just like it does for you and stays fully editable.
- **Open it in the web viewer.** Drop the file on [the viewer](https://www.timelines.studio/viewer/) and thumbnails and notes appear right in the browser. Nothing is uploaded; the file is read locally.
- **Publish it on GitHub.** Viewer links to a packaged file show the timeline complete with images and notes.

If you import a packaged timeline that is already in your library, Timelines asks whether you want to open your existing copy or import the file as a separate copy.

A package is a snapshot you export; editing your timeline afterwards does not update packages you exported earlier.
