# Notes

Any element can have one Markdown note and one MediaWiki article attached to it. Both appear in the right panel when the element is selected.

## Markdown Notes

A Markdown note is a `.md` file linked to an element. To add one, select an element, open the right panel, and click **Create Note** to make a new file or **Add Existing Note** to link one you already have.

The built-in editor supports standard Markdown, plus two additional syntax extensions:

- `__underline__`
- `==highlight==`

A formatting toolbar above the editor provides shortcuts for the most common styles. Notes auto-save when you click away.

### HTML Support

Raw HTML tags are supported inside notes. The following tags are allowed:

`a` `abbr` `b` `blockquote` `br` `code` `del` `div` `em` `font` `h1` `h2` `h3` `h4` `h5` `h6` `hr` `i` `img` `li` `mark` `ol` `p` `pre` `span` `strong` `table` `tbody` `thead` `tr` `td` `th` `u` `ul` `video`

Tags that can run code or load arbitrary external content (such as `script`, `style`, `iframe`, `form`, `object`, and `embed`) are stripped automatically.

### Images and Embeds

Use standard Markdown image syntax for all media. The toolbar has an embed button that inserts the syntax with the URL pre-selected.

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

To add a wiki link, select an element in overview mode and click **Add Wiki**. Paste the article URL and save. In edit mode, the article title and source are shown as a card, with buttons to open it in the browser, edit the URL, or remove it.


