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

Shows elements that have the given tag. The `#` must be directly followed by the tag name with no space.

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

Shows only elements that have coordinates set (visible in Map View).

**Span families**

```
family:span-minoan-civilization
family:"Minoan Civilization"
```

Shows a span together with everything descending from it: branch children, extends, merges, and any events attached to a span in the family. See [[Elements]] for how those relationships are set up.

## Focusing a Span

Instead of typing `family:` by hand, Shift-click any span on the canvas. Everything outside that span's family disappears and a chip appears in the canvas filter menu, where you can remove it like any other filter. Shift-click the same span again to clear the focus, or Shift-click a different span to move it. Only one span is focused at a time.

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
| `~family:span-rome` | Everything except that span's family |
