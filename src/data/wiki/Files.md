# Files

Everything you make in Timelines lives in plain files on your computer. This page covers where those files are, how saving works, and what happens when you rename, duplicate, or delete a timeline.

## Where everything is stored

- **Timelines** are single `.timeline` files (JSON) in your timelines folder.
- **Notes** live in a `.notes` folder and **images** in a `.assets` folder, organized per timeline.

All three locations can be changed in app settings, and each has an **Open Folder** button so you can get to your files directly. Folders you create in the library are real folders on disk; see [[Organization]].

Notes and images are keyed to an internal id that never changes, so renaming a timeline does not move or break its notes and images.

## Saving

Timelines has no save button. Every change you make, such as adding an event, editing a field, or adjusting project settings, is written to disk automatically within moments.

Saves are written atomically: the file is fully written to a temporary location first, then swapped into place. If the app crashes or your computer loses power mid-save, the previous version of the file stays intact.

Notes auto-save a couple of seconds after you stop typing, when you click away, and when you close the app. See [[Notes]].

## Renaming

A timeline's name is also its filename. When you edit the name in project settings, the file is renamed once you finish, meaning when you press Enter, click away from the name field, or close settings.

Two timelines cannot share the same filename. If you try to rename or create a timeline with a name that is already taken, the app shows a message and keeps everything as it was. Nothing is overwritten.

## Duplicating

Duplicating a timeline creates a full copy named "Copy", with "Copy 2", "Copy 3", and so on used if those names are taken. The copy includes the timeline itself plus its notes and images, stored separately from the original, so editing one never affects the other.

## Deleting

When deleting a timeline, you choose whether its notes and images are deleted with it or left on disk. Deleting cannot be undone, so leaving notes and images behind is the safer default.

## Working with files directly

Because timelines are plain files, you can back them up, sync them, or move them between computers like any other document. A `.timeline` file dropped into your timelines folder appears in the library automatically, and exported packages can be shared and imported on another machine; see [[Exporting]].

Avoid editing a `.timeline` file by hand while the app has it open, since the app's automatic saves can overwrite your manual changes.
