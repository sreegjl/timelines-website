# Map View

Map View plots your events, spans, and eras on a real-world map using their coordinates, as an alternative to the timeline canvas. It's off by default and opt-in per timeline. The map can be shown flat or as a 3D globe, and routes can connect elements in date order.

> Map View renders with [MapLibre](https://maplibre.org/) and needs WebGL. If WebGL isn't available on your computer, the map shows a message instead.

On the map:
- Each element appears as a marker, colored to match its own color, or its parent span's color for an event that belongs to one.
- Right-click empty map area to create a new event, span, or era at that location, the same as right-clicking the canvas.
- Selecting an element elsewhere (the sidebar list, search, a filter) flies the map to it.
- Scroll to zoom and drag to pan. Hold Alt while scrolling to pan instead, or Ctrl/Cmd while scrolling to zoom.

## Enabling Map View

Open the timeline menu (chevron next to the timeline title) and go to **Settings** > **Advanced**. Under **Views**, turn on **Map View**. This adds a Coordinates property to every event, span, and era, and adds a **Maps** section to Settings for the options below. Once enabled, switch to the map with the view switcher in the top bar, or press Alt+2. See [[Views]].

## Setting Coordinates

Edit any event, span, or era and add **Coordinates** with **+ Add property**. Either type a latitude and longitude, or click the pin button in the field: the canvas switches to the map, and clicking a spot fills in its coordinates. Press Escape or click the pin again to cancel. Elements without coordinates simply don't appear on the map. Use the `has:coords` filter to see which elements still need coordinates - see [[Searching]].

## Globe

The **Map style** control on the map switches between a **Flat map** and a **Globe**. On the globe:

- Drag to spin it, and Shift+Drag to slide the globe across the screen.
- **Auto-rotate**, on the map, turns the globe slowly on its own.
- Markers on the far side show faintly through the globe, so you can see what's around the back.

## Routes

Routes draw lines between located elements in date order, which suits journeys, campaigns, and migrations. Pick how elements are connected with **Routes** in the Maps settings:

- **Off** (default)
- **Everything, in order** - one route through every located element
- **By group** - one route per group
- **By tag** - one route per tag
- **By parent span** - one route through each span's events
- **By lineage** - follows extends, branches, and merges between spans, see [[Elements]]

Arrows along each route show which way it goes. Routes only connect markers that are currently visible, so filters and the scrollbar date shape them too.

## Map Settings

With Map View enabled, the **Maps** section in Settings has:

- **Tile URL** - point to your own tile server using `{z}`, `{x}`, and `{y}` placeholders. Leave blank to use OpenStreetMap. See the [list of alternate raster tile providers](https://wiki.openstreetmap.org/wiki/Raster_tile_providers) for other options.
- **Scrollbar Date** - which markers to show for the date in the scrollbar at the bottom of the canvas: **All elements**, only those **Up to the date**, or only those **Active at the date**.
- **Routes** and **Route Arrows** - see [Routes](#routes) above.
- **Event Marker**, **Span Marker**, and **Era Marker** - choose Pin, Circle, Square, Diamond, or Triangle for each element type. Events default to Pin, spans to Circle, and eras to Diamond.

Under **Globe**:

- **Show Markers on the Far Side** - show markers on the other side of the globe faintly through it. Turn off to hide them.
- **Atmosphere Glow** - a glow around the globe in the theme's link color.
- **Starry Background** - a dark starfield behind the globe instead of the theme background.
