# Vanilla Inline Mermaid Deck

A zero-dependency, client-side editable slide deck with native Mermaid diagram support. Built with vanilla JavaScript, HTML5, and CSS3. Content is persisted via `localStorage` and can be exported as JSON.

## Architecture

### Core Components

- **`index.html`**: Slide structure with `data-content-key` and `data-diagram-key` attributes for content binding
- **`content.js`**: Default content schema (`DEFAULT_DECK_CONTENT`) exported as a global constant
- **`script.js`**: State management, localStorage persistence, and edit mode orchestration
- **`styles.css`**: Slide navigation, edit mode styling, and Mermaid container layouts

### Content Binding System

Content is bound to DOM elements via `data-content-key` attributes using dot-notation paths (e.g., `slide1.title1`, `slide3.screen1.header`). The rendering engine uses `getNestedValue()` and `setNestedValue()` helpers to traverse the content object tree.

```javascript
// Example binding
<div data-content-key="slide1.title1">MCPDirect Studio</div>
```

### Mermaid Integration

Mermaid diagrams are stored as raw Mermaid syntax strings in the content object under `diagram` keys. On render, the Mermaid library is invoked with `mermaid.run({ nodes })` for selective re-rendering of modified diagrams only.

```javascript
// Diagram binding
<div class="diagram-container" data-diagram-key="slide2.diagram"></div>
```

## Features

### Edit Mode

Toggle edit mode via the floating button in the top-right corner. When enabled:

- All elements with `data-content-key` become `contentEditable="true"`
- Input events trigger automatic `localStorage` persistence via `saveContent()`
- Mermaid diagram containers become clickable (dashed border indicator)
- Clicking a diagram opens a modal editor with syntax highlighting

### LocalStorage Persistence

Content is automatically saved to `localStorage` under the key `mcp_deck_content`:

- **Deep merge strategy**: Saved edits are merged with default content using `deepMerge()` to preserve new keys added to defaults
- **Automatic save**: Triggered on every `input` event in edit mode
- **Load on init**: On page load, saved content is merged with defaults before rendering

```javascript
// Storage key
localStorage.setItem("mcp_deck_content", JSON.stringify(currentContent));
```

### Export & Copy

The "Copy Edited Content JSON" button serializes the current content state (including unsaved edits) to a formatted JSON string and copies it to the clipboard via the Clipboard API fallback (`document.execCommand('copy')`).

### Slide Navigation

- **Scroll snap**: CSS `scroll-snap-type: y mandatory` enforces full-screen slide transitions
- **Navigation dots**: Fixed-position dots on the right side indicate current slide
- **Intersection Observer**: Tracks visible slides and updates active dot state

## Deployment

### GitHub Pages

This project is designed for static hosting on GitHub Pages:

1. Push to a `gh-pages` branch, or
2. Configure GitHub Pages to serve from `/docs` directory, or
3. Use GitHub Actions to build and deploy

No build step required—serve `index.html` directly.

### CDN Dependencies

- **Tailwind CSS**: `https://cdn.tailwindcss.com`
- **Mermaid.js**: `https://cdnjs.cloudflare.com/ajax/libs/mermaid/10.9.0/mermaid.min.js`
- **Google Fonts**: Inter font family

## Development

### Content Schema

The content object follows a nested structure:

```javascript
{
  slide1: {
    badge: "string",
    title1: "string",
    title2: "string",
    description: "string",
    // ... nested objects
  },
  slide2: {
    header: "string",
    description: "string",
    diagram: "graph LR\n  A --> B" // Mermaid syntax
  }
}
```

### Adding New Slides

1. Add a new `<section id="slide-N">` in `index.html`
2. Add corresponding content object in `content.js` under `DEFAULT_DECK_CONTENT`
3. Bind elements with `data-content-key="slideN.property"`

### Mermaid Configuration

Mermaid is initialized with:

```javascript
mermaid.initialize({
  startOnLoad: false,
  theme: "dark",
  securityLevel: "loose",
  fontFamily: "Inter",
  flowchart: { useMaxWidth: true, htmlLabels: true },
});
```

## Roadmap

### Planned Features

- [ ] **Multiple slide deck support**: Store and switch between multiple deck instances in localStorage with a deck selector UI
- [ ] **GitHub integration**: Submit edited content as a pull request via GitHub API after edits are saved
- [ ] **Export formats**: PDF export via browser print API, Markdown export for documentation
- [ ] **Collaborative editing**: Real-time sync via WebSockets or GitHub API webhooks
- [ ] **Version history**: Track edit history with timestamps and diff visualization
- [ ] **Template system**: Pre-built slide templates for common presentation types
- [ ] **Keyboard shortcuts**: Navigate slides with arrow keys, toggle edit mode with `E`
- [ ] **Undo/redo**: Implement command pattern for content edit history

### Technical Improvements

- [ ] **Module system**: Convert to ES6 modules for better code organization
- [ ] **Type safety**: Add JSDoc type annotations or migrate to TypeScript
- [ ] **Testing**: Unit tests for content merging, localStorage operations, and Mermaid rendering
- [ ] **Performance**: Virtualize slide rendering for decks with 50+ slides
- [ ] **Accessibility**: ARIA labels, keyboard navigation, screen reader support

## License

MIT
