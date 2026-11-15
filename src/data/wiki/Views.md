# Views

A timeline can be shown four ways: the **Timeline** canvas, a **[[Map-View|Map]]**, a **Spreadsheet**, and a **Calendar**. They all show the same elements, so a change made in one view appears in the others right away.

## Switching views

The view switcher in the top bar has one button per view the timeline has turned on. You can also switch with the keyboard:

| Shortcut | View |
| --- | --- |
| Alt+1 | Timeline |
| Alt+2 | Map |
| Alt+3 | Spreadsheet |
| Alt+4 | Calendar |

These shortcuts can be changed in app settings under **Hotkeys**.

## Turning views on

The Timeline view is always available. The others are off by default and are turned on per timeline in the **Views** part of the timeline's **Advanced** settings:

- **Spreadsheet View** - adds the Spreadsheet view
- **Map View** - adds coordinates to elements and the Map view, see [[Map-View]]
- **Calendar View** - turns on month and day dates on ticks and elements, and adds the Calendar view

The switcher only appears once a timeline has more than one view.

## Spreadsheet

The Spreadsheet view lists every element as a row, so you can edit many elements at once without opening each one in the right panel. Before 0.9.0 this was called the Table View.

## Calendar

The Calendar view shows dated elements on a month or a year calendar. Use **Month** and **Year** at the top to switch between them, the arrows to move between months or years, and **Today** to jump back to the current date. Navigation stays inside the timeline's own start and end points.

- **Month** - events are listed on their day and spans run as bars across the days they cover. When a day has more than fits, a **+N more** button appears; hover it to see the rest, or click it to select the next one.
- **Year** - every month at once, with a colored dot on each day for the elements on it. Spans mark only their start day. Click a month to open it.

Selecting an element elsewhere, such as in the sidebar or search, flips the calendar to its month.

To add to the calendar:

- **Double-click a day** to add an event on that date.
- **Drag across days** to add a span covering them.
- **Right-click a day** for **Add Event** and **Add Span**.

Right-click an element on the calendar to edit, duplicate, convert, or delete it, the same as on the canvas.

The Calendar view needs **Calendar View** turned on, which also enables month and day dates across the timeline. See [[Dates]].
