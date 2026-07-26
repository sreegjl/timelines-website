# Dates

Every date in Timelines is one of three things: a year, a calendar date, or a dynamic keyword that resolves to the present. This page covers how to write them, how they are displayed, and the settings that control the timeline's own span of time.

## Writing dates

Date fields (an event's **Date**, a span or era's **Start** and **End**) accept whatever precision you need:

- **Year** - `2026`, or a negative number such as `-1627` for a year before year 0
- **Month** - `07/2026`, or `2026-07` if your format is set to `YYYY-MM-DD`
- **Day** - a full calendar date, written in whichever format is active

Precision is remembered, so an element dated to a year is not silently treated as January 1st of that year.

## Era labels

A negative year always means a year before year 0, but what gets written on the canvas is up to you. The **Negative Era** and **Positive Era** fields in the timeline's general settings add a label after the number:

- Leave **Negative Era** empty and `-1627` displays as `-1627`
- Set it to `BCE` and the same year displays as `1627 BCE`
- Set it to `MYA` on a geological timeline and `-3.5` displays as `3.5 MYA`

**Positive Era** does the same for years after 0, such as `CE` or `AD`. Both are free text up to 10 characters, and both are labels only. When a negative year carries a label, the minus sign is dropped and the number is shown as a positive value. What gets stored in the file is always the plain signed number, so filters and sorting are unaffected by whatever the labels say.

## Date formats

The **Date Format** setting, in a timeline's advanced settings, controls how month and day dates are shown and typed:

- `MM/DD/YYYY` (default)
- `DD/MM/YYYY`
- `YYYY-MM-DD`

This is a display and input preference, saved per timeline. Dates are always stored inside the `.timeline` file in ISO form (`YYYY-MM-DD`), so a timeline typed in one format still reads correctly for someone using another.

Dash-style ISO input is recognized whichever format is active, so `2026-07-04` always works. Slash input follows the selected order, meaning `07/04/2026` is July 4th on `MM/DD/YYYY` and April 7th on `DD/MM/YYYY`.

## Dynamic dates

A date field can hold a keyword instead of a fixed date. Keywords re-resolve to the present every time the timeline loads, so a span that runs to the present day keeps up on its own.

| Keyword | Resolves to |
| --- | --- |
| `current`, `today`, `now` | today's date |
| `current-month` | the current month |
| `current-year` | the current year |

The keyword itself is what gets saved, not the date it resolved to. When you are not editing the field, it displays as the keyword's name with the resolved date beside it, such as "Today (07/25/2026)".

## The timeline's range

A timeline covers the period you give it, from a few days to billions of years. In the timeline's general settings:

- **Start Point** - the first year or date shown
- **End Point** - the last year or date shown
- **Timeline Length** - how much horizontal room that period gets, from `0.2x` to `5x`. Higher values spread elements out and reduce overlap on a crowded timeline.

Start and End accept the same formats as any other date field.

## Today marker

**Today Marker**, in the timeline's appearance settings, draws a vertical line at the current date. Like a dynamic date, it moves on its own as time passes. It is off by default, and only useful on timelines whose range includes the present.

---

*Looking for date filters in search queries? See [[Searching]].*
