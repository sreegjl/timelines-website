# Elements

Timelines are built from three element types: events, spans, and eras. Each is created from the New menu in the sidebar or by right-clicking on the canvas. Elements can be organized further using [[Organization|tags and groups]].

## Events

An event marks a single point in time. It appears as a labeled marker on the canvas at its date.

**Properties:**
- **Name** - the event label
- **Date** - a single year or calendar date
- **Tags** - for filtering and color-coding
- **Group** - which display group the event belongs to
- **Parent span** - optionally associate the event with a span that contains it
- **Line style** - solid, dashed, dotted, or none
- **Border style** - solid, dashed, dotted, or none
- **Map coordinates** - latitude and longitude, if map view is enabled
- **Notes** - an attached Markdown file
- **Wiki** - a linked MediaWiki URL, displayed inline in the right panel (requires wiki integration to be enabled in timeline settings)

**Example:**
```json
{
  "id": "event-thera-eruption",
  "type": "event",
  "title": "Thera Volcanic Eruption",
  "date": -1627,
  "parents": ["span-minoan-civilization"],
  "tags": ["volcano"],
  "eventLineStyle": "dotted",
  "eventBorderStyle": "dotted",
  "groupId": "g-main",
  "noteFile": "thera-eruption.md"
}
```

## Spans

A span represents a named period with a start and end. Spans are the most flexible element type and are suited for dynasties, storylines, character arcs, conflicts, or any continuous thread of time.

Spans support three types of relationships with other spans:

- **Branch** (`parent`) - the span starts within another span's range and is rendered offset above or below it, showing a diverging thread. Multiple branches from the same parent alternate above and below.
- **Extend** (`extendFrom`) - the span starts exactly where another span ends and is rendered on the same lane, creating a seamless continuation.
- **Merge** (`mergeParent`) - a visual-only connection showing that this span converges into another at its end point. No lane change occurs.

**Properties:**
- **Name** - the span label
- **Start / End** - year or calendar date
- **Color** - the span's display color
- **Size** - thin, normal, or thick
- **Tags** - for filtering and color-coding
- **Group** - which display group the span belongs to
- **Branch from** - ID of the parent span to branch off
- **Extend from** - ID of the span to continue from
- **Merge into** - ID of the span to converge with at the end
- **Visibility** - option to hide the name, date, or both from the canvas
- **Map coordinates** - latitude and longitude, if map view is enabled
- **Notes** - an attached Markdown file
- **Wiki** - a linked MediaWiki URL, displayed inline in the right panel (requires wiki integration to be enabled in timeline settings)

**Example:**
```json
{
  "id": "span-minoan-civilization",
  "type": "span",
  "title": "Minoan Civilization",
  "start": -3000,
  "end": -1450,
  "color": "#B8860B",
  "tags": ["culture", "politics"],
  "groupId": "g-main",
  "noteFile": "minoan-greece.md"
}
```

## Eras

An era is a large-scale categorization that provides context across a broad period of time. Unlike spans, eras don't belong to a group.

When eras overlap in time, they are stacked automatically. Shorter eras are placed above longer ones that contain them, touching edge to edge. This happens without any manual configuration, so nesting eras of different scales (e.g. a century inside a millennium) will stack them correctly on the canvas.

**Properties:**
- **Name** - the era label
- **Start / End** - year or calendar date
- **Color** - the era's display color
- **Size** - normal, thick, or extra thick
- **Tags** - for filtering and color-coding
- **Visibility** - option to hide the name, date, or both from the canvas
- **Notes** - an attached Markdown file
- **Wiki** - a linked MediaWiki URL, displayed inline in the right panel (requires wiki integration to be enabled in timeline settings)

**Example:**
```json
{
  "id": "era-bronze-age",
  "type": "era",
  "title": "Bronze Age",
  "start": -3000,
  "end": -1100,
  "color": "#e6d1b7",
  "noteFile": "bronze-age.md"
}
```
