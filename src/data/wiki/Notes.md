# Notes

Any element can have one Markdown note and one MediaWiki article attached to it. Both appear in the right panel when the element is selected.

## Markdown Notes

A Markdown note is a `.md` file linked to an element. To add one, select an element, switch the right panel to edit mode, and click **Note** below the element's properties. Choose **Create Note** to make a new file or **Add Existing Note** to link one you already have.

The editor supports standard Markdown, plus two additional syntax extensions:

- `__underline__`
- `==highlight==`

### Live and Source modes

The switch at the top of the note toggles between two ways of editing. Your choice is remembered.

- **Live** shows the note formatted as it will render: headings at their size, bold and highlights applied, links underlined, images shown inline, and task lists as clickable checkboxes. The Markdown reappears only where you're editing: inside the bold word or link under the cursor, or on the current line for headings, quotes, and list bullets. **Ctrl/Cmd+click** a link to open it.
- **Source** shows the plain Markdown with light syntax coloring.

Both modes edit the same file. Live mode only changes how the note looks while you edit; the file always contains exactly the Markdown you typed, so it stays readable in any other Markdown editor.

Links use standard Markdown syntax and open in your browser when clicked:

```
[Timelines Studio](https://timelines.studio/)
```

If you are new to Markdown, the [Markdown Guide](https://www.markdownguide.org/basic-syntax/) covers the full syntax for headings, lists, tables, and everything else the editor understands.

A formatting toolbar above the editor provides shortcuts for the most common styles. The bold, italic, strikethrough, underline, and highlight buttons toggle: use one on text that already has that style to remove it. Notes auto-save a couple of seconds after you stop typing, when you click away, and when you close the app.

### Wikilinks

`[[Page Name]]` and `[[Page Name|shown text]]` links are highlighted in a muted link color in both the editor and the rendered note. They don't navigate anywhere yet.

### HTML Support

Raw HTML tags are supported inside notes. The following tags are allowed:

`a` `abbr` `b` `blockquote` `br` `code` `del` `div` `em` `font` `h1` `h2` `h3` `h4` `h5` `h6` `hr` `i` `img` `li` `mark` `ol` `p` `pre` `span` `strong` `table` `tbody` `thead` `tr` `td` `th` `u` `ul` `video`

Tags that can run code or load arbitrary external content (such as `script`, `style`, `iframe`, `form`, `object`, and `embed`) are stripped automatically.

### Images and Embeds

Use standard Markdown image syntax for all media. The toolbar has an embed button that inserts the syntax with the URL pre-selected, and a paperclip button that copies an image from your computer into the timeline's images folder and inserts it.

**Images** (any HTTPS URL):
```
![optional caption](https://example.com/image.png)
```

**YouTube:**
```
![](https://www.youtube.com/watch?v=VIDEO_ID)
![](https://youtu.be/VIDEO_ID)
```

**Vimeo:**
```
![](https://vimeo.com/VIDEO_ID)
```

**Video files** (URLs ending in `.mp4`, `.webm`, `.ogg`, or `.mov`):
```
![](https://example.com/video.mp4)
```

To remove a note from an element without deleting the file, use **Unlink**. To permanently delete the file, use **Delete**.

Note files are stored in the notes directory set in app settings. By default this is a subfolder inside your system app data folder, but you can point it to any directory.

## MediaWiki

Any element can also be linked to a MediaWiki article, such as a Wikipedia page. The article renders inline in the right panel's overview mode, including the infobox, body text, and images.

Wiki integration must be enabled in the advanced project settings before wiki links can be added.

To add a wiki link, select an element, switch to edit mode, and click **Wiki** below the element's properties. Paste the article URL and save. Add `#Section_Name` to the URL to show only that section of the article. In edit mode, the link appears in a **Wiki** box with the article title, its site, and buttons to edit the URL or remove it.

"Part of a series" navigation boxes from Wikipedia collapse into a single line that you can expand, with each of their sections expandable on its own.


