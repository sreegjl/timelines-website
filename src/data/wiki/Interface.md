# Interface

Once you've created or opened a timeline, you'll see the main editor. It's divided into three panels around a central canvas. The left and right panels can be collapsed using the icons in the top bar.

## Sidebar

The left sidebar has three tabs:

**Timeline tab** - Browse all elements organized by era or span. Use the search box to filter by title, or use the tag strip at the top to spotlight elements by tag. The New menu lets you create a new event, span, or era. Right-click any element to edit, duplicate, or delete it.

**Tags tab** - Lists all tags in the timeline with element counts. For each tag you can set a color, hide all elements with that tag from the canvas, spotlight elements with that tag, or pin it for quick access.

**Groups tab** - Lists all display groups. Groups can be reordered by dragging, toggled visible or hidden, and given a color band. You can rename or delete groups from the kebab menu on each group card.

The timeline menu (chevron next to the timeline title) gives access to settings, export options, and switching between timelines.

## Timeline Canvas

The main canvas is where you view and edit your timeline. Right-click an empty area to add an element at that point in time. Click an existing element to select it. Scroll to pan, Shift + scroll to pan vertically, and Ctrl + scroll to zoom. Ctrl + Shift + scroll (Cmd + Shift + scroll on Mac) stretches or compresses the timeline horizontally without resizing elements, the same as changing **Timeline Length** in timeline settings (see [[Dates]]).

Right-click an event or span to convert it into the other type.

The button bar in the top-right corner contains zoom in/out buttons, a filter menu, and a settings shortcut. If [[Map-View|map view]] is enabled, a toggle to switch between timeline and map view appears here too.

At the bottom of the canvas is a scrubber that lets you jump to any point in the timeline. It also has a play button that animates through the timeline from start to end.

## Right Panel

The right panel shows the properties of the selected element. It has two modes toggled with the pencil icon:

**Overview mode** - Displays the element's name, date or date range, tags, group, parent spans, and note content. If a MediaWiki article is linked, it renders inline. Clicking a tag spotlights it; clicking a linked span navigates to it.

**Edit mode** - Edit the element's name, date, parent, tags, group, and color. Optional properties such as coordinates, thumbnail, icon, line and border style, and hide date stay out of the way until they have a value. Add one with **+ Add property**, and remove it again with the × that appears when you hover it. Press Enter in a text field to move to the next one.

Below the properties, the **Note**, **Wiki**, and **Sources** buttons attach a note, a wiki article, or sources to the element. See [[Notes]].

While editing an event, drop an image anywhere on the panel to set it as the thumbnail.

The bottom bar has Previous / Next buttons to step through elements, and a Delete button to remove the selected element.

## Language

The interface language can be changed in app settings under **General**, once translations are available. Date and time formats are set per timeline and aren't affected by the language. To help translate Timelines, see the [translation guide](https://github.com/sreegjl/timelines/blob/main/CONTRIBUTING-i18n.md).
