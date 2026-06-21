# Themes

There are two levels of theming: the **app theme**, which controls the overall interface, and the **timeline theme**, which is set per timeline and overrides the app theme for that timeline's canvas. Both are set from their respective settings panels.

To apply a theme, open app settings and go to the general tab. Select a theme from the dropdown. The change takes effect immediately.

To set a theme for a specific timeline, open that timeline's settings and choose a theme from the appearance tab.

## Custom Themes

You can install additional themes or create your own. Theme files are `.json` files stored in your themes folder. To open it, go to App Settings -> General and click on the folder icon next to App Theme.

A theme file has a `name` field, a `colors` map, and an optional `font` field for a custom Google Font:

```json
{
  "name": "Theme name shown in theme pickers",
  "type": "light | dark, used to pick readable contrast defaults",
  "collection": "Group name for the theme. 'bundled' ships with the app, but users can set any name to group their own related/variant themes",
  "author": "Your name or username",
  "font": {
    "family": "Optional font family applied when this theme is active",
    "cssUrl": "Optional @font-face / Google Fonts stylesheet URL for the family"
  },
  "colors": {
    "text-primary": "Primary text, icons, timeline line, and primary borders/fills",
    "ui-muted": "Muted/secondary icons, section labels, subtle borders and fills",
    "accent-color": "General borders, dividers, and accent backgrounds (buttons, panels, hovers)",
    "surface-active": "Active/selected state backgrounds (tabs, pills, toggles, primary buttons)",
    "surface": "Panels, cards, context menus, and secondary backgrounds",
    "inset-bg": "Tertiary/inset backgrounds (wiki tables, export background option, homepage base)",
    "app-bg": "App/timeline view background, inputs, and modal backgrounds",
    "text-muted": "Muted text (event dates, descriptions, subtle titles)",
    "text-subtle": "Secondary/placeholder text, muted labels",
    "era-label": "Era item label text color",
    "selection-color": "Selection outlines and highlight rings",
    "link-color": "Link text and underline color",
    "highlight-color": "Markdown highlight background (==highlight==)",
    "light-bg": "Default era background color (fallback when an era has no custom color)",
    "border-color": "General borders (search bar, cards, pills, buttons)",
    "secondary-text": "Default span fill/background color (fallback when a span has no custom color)"
  }
}
```

The `font` field is optional. If omitted, the app font is used. Include all color keys to be safe (some are currently unused but may be referenced in future versions). The theme format is expected to change as the app evolves. The file name becomes the theme ID - use lowercase with hyphens (e.g. `my-theme.json`).

For example, here is the bundled Parchment v2 theme:

```json
{
  "name": "Parchment v2",
  "type": "light",
  "collection": "bundled",
  "author": "sreegjl",
  "font": {
    "family": "Lexend",
    "cssUrl": "https://fonts.googleapis.com/css2?family=Lexend:wght@300..700&display=swap"
  },
  "colors": {
    "text-primary": "#3A2E22",
    "ui-muted": "#90816D",
    "accent-color": "#DFD2B6",
    "surface-active": "#DFD2B6",
    "surface": "#EADFC8",
    "inset-bg": "#FBF3E1",
    "app-bg": "#FEF7E8",
    "text-muted": "#918C85",
    "text-subtle": "#807C76",
    "era-label": "#141414",
    "selection-color": "#87C6FA",
    "link-color": "#C66F3D",
    "light-bg": "#F3EDE3",
    "border-color": "#D4CAB8",
    "secondary-text": "#807C76",
    "highlight-color": "#F6D66A"
  }
}
```

## Theme Marketplace

The marketplace lets you browse and install themes made by others. Open it by clicking the marketplace icon on the home page. Installed themes are saved to your themes folder and appear alongside built-in themes in the selector.

Themes are sourced from the [timelines-marketplace](https://github.com/sreegjl/timelines-marketplace/) repository. To submit a theme, open a pull request there.
