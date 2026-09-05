# Map View

Map View plots your events, spans, and eras on a real-world map using their coordinates, as an alternative to the timeline canvas. It's off by default and opt-in per timeline.

> Map View currently renders with [Leaflet](https://leafletjs.com/). This may switch to [MapLibre](https://maplibre.org/) in the future, which could affect timelines using a custom map tile URL.

On the map:
- Each element appears as a marker, colored to match its own color, or its parent span's color for an event that belongs to one.
- Right-click empty map area to create a new event, span, or era at that location, the same as right-clicking the canvas.
- Selecting an element elsewhere (the sidebar list, search, a filter) flies the map to it.
- Scroll to zoom and drag to pan. Hold Alt while scrolling to pan instead, or Ctrl/Cmd while scrolling to zoom.

## Enabling Map View

Open the timeline menu (chevron next to the timeline title) and go to **Settings**. Turn on **Map View** - this adds a Coordinates field to every event, span, and era, and unlocks a **Maps** section further down in Settings for the options below. Once enabled, a map/timeline toggle appears in the button bar at the top-right of the canvas, next to the zoom controls. See [[Interface]].

## Setting Coordinates

Edit any event, span, or era and enter a latitude and longitude in the **Coordinates** field. Elements without coordinates simply don't appear on the map. Use the `has:coords` filter to see which elements still need coordinates - see [[Searching]].

## Map Settings

With Map View enabled, the **Maps** section in Settings has:

- **Custom map tile URL** - point to your own tile server using `{z}`, `{x}`, and `{y}` placeholders. Leave blank to use OpenStreetMap. See the [list of alternate raster tile providers](https://wiki.openstreetmap.org/wiki/Raster_tile_providers) for other options.
- **Only show markers active at the current date** - limits the map to elements whose date (or date range) covers whatever point the canvas scrubber is currently on.
- **Marker style** - choose Pin, Circle, Square, Diamond, or Triangle separately for events, spans, and eras. Events default to Pin, spans to Circle, and eras to Diamond.
