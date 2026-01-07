# Hotspots Configuration Guide

All hotspot configurations are stored in `/lib/data/hotspots-config.json` for easy editing.

## How to Edit Hotspots

### Changing Position
The `position` array contains `[x, y, z]` coordinates in 3D space:
- **x**: left (-) to right (+)
- **y**: down (-) to up (+)
- **z**: back (-) to front (+)

```json
"position": [0.09, 2, 0.3]
```

### Changing Size
Customize width and height with any CSS units:

```json
"size": {
  "width": "500px",
  "height": "320px"
}
```

**Recommended sizes:**
- Small: 200-280px wide, 120-180px tall
- Medium: 280-400px wide, 180-250px tall
- Large: 400-500px wide, 250-320px tall

### Changing Content
Content is an array of strings. Each string becomes a line:

```json
"content": [
  "Line 1 text here",
  "Line 2 text here",
  "",
  "Empty string creates space",
  "Line 4 text here"
]
```

### Adding a New Hotspot
Add a new object to the `hotspots` array:

```json
{
  "id": "skills",
  "position": [1.0, 1.5, 0.2],
  "label": "SKILLS",
  "size": {
    "width": "350px",
    "height": "200px"
  },
  "content": [
    "Python • JavaScript • Go",
    "React • Django • PostgreSQL"
  ]
}
```

### Removing a Hotspot
Simply delete the entire object from the `hotspots` array.

## Current Configuration

### Experience Hotspot
- **Position**: `[0.09, 2, 0.3]` - High up on the model
- **Size**: 500x320px (largest)
- **Content**: All 3 work experiences

### Projects Hotspot
- **Position**: `[0.09, 1.3, 0.3]` - Below Experience
- **Size**: 400x250px (medium-large)
- **Content**: Top 3 projects

### About Hotspot
- **Position**: `[0.09, 0.6, 0.3]` - Below Projects
- **Size**: 280x180px (small)
- **Content**: Personal info, education, contact (no phone/location)

## Tips

1. **Test positions incrementally**: Change one coordinate at a time by small amounts (0.1-0.2)
2. **Keep content concise**: Too many lines may overflow the screen
3. **Use empty strings** (`""`) to create visual spacing between sections
4. **Save and refresh**: Changes take effect immediately in dev mode
