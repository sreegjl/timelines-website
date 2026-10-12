# Searching

The search bar in the sidebar (Timeline tab) and the global search overlay (Ctrl+F) both support advanced filter syntax on top of plain text search.

## Plain Text

Typing any word filters elements whose title contains that word (case-insensitive).

```
roman
```

## Filter Syntax

**By type**

```
is:event
is:span
is:era
```

Shows only elements of that type.

**By tag**

```
#military
#roman
```

Shows elements that have the given tag. The `#` must be directly followed by the tag name with no space. Wrap tags containing spaces in quotes, such as `#"ancient rome"`.

```
tag:rom
```

Shows elements with any tag containing that text, so `tag:rom` matches `roman` and `ancient rome`.

In the filter menu and the sidebar's tag strip, Shift-click a tag to add it to the search query instead of filtering by it directly.

**By date**

```
> 100
<= -500
>= 1776-07-04
```

Compares against the element's date (events) or start date (spans and eras). Negative numbers represent years before year 0, whatever era label the timeline displays them with. Full dates use `YYYY-MM-DD` format here regardless of the timeline's [[Dates|date format]].

| Operator | Meaning |
|----------|---------|
| `>` | After |
| `>=` | On or after |
| `<` | Before |
| `<=` | On or before |

**Exact phrase**

Wrap text in quotes to require an exact substring match.

```
"iron age"
```

**Geographic data**

```
has:coords
```

Shows only elements that have coordinates set (visible in [[Map-View|Map View]]).

**Span families**

```
family:span-minoan-civilization
family:"Minoan Civilization"
```

Shows a span together with everything descending from it: branch children, extends, merges, and any events attached to a span in the family. See [[Elements]] for how those relationships are set up.

**Parent span**

```
parent:span-minoan-civilization
parent:minoan
```

Shows only the direct children of a span: events attached to it, and spans that branch from it, extend it, or merge into it. Matches the parent's ID or any part of its name.

## Focusing a Span

Instead of typing `family:` by hand, Shift-click any span on the canvas or in the sidebar's Timeline tab. Everything outside that span's family disappears and a chip appears in the canvas filter menu, where you can remove it like any other filter. Shift-click the same span again to clear the focus.

In the editor you can also right-click a span and choose **Focus Span & Children**. On a touch screen in the web viewer, press and hold a span for about half a second instead.

## Combining Filters

**AND (space)** — space between terms means both must match.

```
is:event #military > 100
```

Events tagged `#military` that occur after year 100.

**OR (pipe)**

```
#roman | #greek
```

Elements tagged either `#roman` or `#greek`.

**NOT (tilde)**

```
~is:era
```

Excludes eras — shows only events and spans.

```
#military ~> 1000
```

Elements tagged `#military` that start on or before year 1000.

**Grouping (parentheses)**

```
(#roman | #greek) is:event
```

Events tagged either `#roman` or `#greek`.

```
~(is:span | is:era)
```

Only events.

## Examples

| Query | Result |
|-------|--------|
| `julius caesar` | Elements with "julius caesar" in the title |
| `is:event > -100 < 100` | Events between 100 BCE and 100 CE |
| `#war ~is:era` | Events and spans tagged `#war` |
| `"first punic war"` | Elements with that exact phrase in the title |
| `#roman \| #carthaginian` | Elements tagged either faction |
| `has:coords is:event` | Events that have map coordinates |
| `(#roman \| #greek) > -500` | Roman or Greek elements after 500 BCE |
| `family:"minoan civilization"` | That span and everything branching, extending, or merging from it |
| `family:span-rome is:event` | Only the events inside that span's family |
| `parent:rome is:event` | Events attached directly to a span named Rome |
| `tag:war` | Elements with any tag containing "war" |
| `~family:span-rome` | Everything except that span's family |
