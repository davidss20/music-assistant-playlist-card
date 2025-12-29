# Music Assistant Playlist Card

[![hacs_badge](https://img.shields.io/badge/HACS-Custom-41BDF5.svg)](https://github.com/hacs/integration)
[![GitHub Release](https://img.shields.io/github/release/yourusername/music-assistant-playlist-card.svg)](https://github.com/davidss20/music-assistant-playlist-card/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A custom Home Assistant Lovelace card for displaying Music Assistant playlists with speaker selection and one-click playback.

![Card Preview](https://via.placeholder.com/600x400?text=Music+Assistant+Playlist+Card)

## Features

- 🎵 Display playlists from Music Assistant with cover art
- 🔊 Speaker selection dropdown for playback target
- ▶️ One-click playlist playback
- 🎨 Mushroom Cards inspired design
- 🌐 Multi-language support (English, Hebrew, German, French, Spanish)
- 📱 Responsive grid layout
- ⚙️ Visual configuration editor

## Installation

### HACS (Recommended)

1. Open HACS in your Home Assistant instance
2. Click on "Frontend" section
3. Click the three dots menu (⋮) in the top right corner
4. Select "Custom repositories"
5. Add this repository URL: `https://github.com/davidss20/music-assistant-playlist-card`
6. Select "Lovelace" as the category
7. Click "Add"
8. Find "Music Assistant Playlist Card" in the list and click "Download"
9. Restart Home Assistant

### Manual Installation

1. Download `music-assistant-playlist-card.js` from the [latest release](https://github.com/davidss20/music-assistant-playlist-card/releases)
2. Copy the file to your `config/www` folder
3. Add the resource in Home Assistant:
   - Go to **Settings** → **Dashboards** → **Resources**
   - Click "Add Resource"
   - URL: `/local/music-assistant-playlist-card.js`
   - Resource type: JavaScript Module
4. Restart Home Assistant

## Configuration

### Using the Visual Editor

1. Add a new card to your dashboard
2. Search for "Music Assistant Playlist Card"
3. Configure using the visual editor

### YAML Configuration

```yaml
type: custom:music-assistant-playlist-card
config_entry_id: "YOUR_MUSIC_ASSISTANT_CONFIG_ENTRY_ID"
speakers:
  - media_player.living_room_speaker
  - media_player.bedroom_speaker
title: My Playlists
limit: 25
columns: auto
favorites_only: false
language: auto
```

### Configuration Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `config_entry_id` | string | **Required** | Music Assistant config entry ID |
| `speakers` | list | **Required** | List of media player entity IDs |
| `title` | string | - | Card title (optional) |
| `limit` | number | 25 | Maximum number of playlists to display |
| `columns` | number/auto | auto | Number of columns (2-6 or auto) |
| `favorites_only` | boolean | false | Show only favorite playlists |
| `language` | string | auto | Language code (en, he, de, fr, es) or auto |

### Finding Your Config Entry ID

1. Go to **Developer Tools** → **Services**
2. Search for `music_assistant.get_library`
3. The `config_entry_id` is shown in the service data example

## Usage

1. Configure the card with your Music Assistant instance and speakers
2. Select a speaker from the dropdown
3. Click on any playlist to start playback on the selected speaker

## Supported Languages

- 🇺🇸 English (default)
- 🇮🇱 Hebrew (עברית)
- 🇩🇪 German (Deutsch)
- 🇫🇷 French (Français)
- 🇪🇸 Spanish (Español)

Language is automatically detected from your Home Assistant settings, or you can override it in the card configuration.

## Development

### Prerequisites

- Node.js 18+
- npm

### Setup

```bash
# Clone the repository
git clone https://github.com/davidss20/music-assistant-playlist-card.git
cd music-assistant-playlist-card

# Install dependencies
npm install

# Build the card
npm run build

# Watch for changes during development
npm run watch
```

### Project Structure

```
music-assistant-playlist-card/
├── src/
│   ├── music-assistant-playlist-card.ts   # Main component
│   ├── editor.ts                          # Config editor
│   ├── types.ts                           # TypeScript definitions
│   ├── styles.ts                          # CSS styles
│   └── localize/
│       ├── localize.ts                    # i18n system
│       └── languages/                     # Translation files
├── dist/
│   └── music-assistant-playlist-card.js   # Built file
├── hacs.json
├── package.json
└── README.md
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

### Adding a New Language

1. Create a new JSON file in `src/localize/languages/` (e.g., `it.json`)
2. Copy the structure from `en.json` and translate the strings
3. Import and add the language in `src/localize/localize.ts`
4. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Music Assistant](https://github.com/music-assistant/hass-music-assistant) - The amazing music integration
- [Mushroom Cards](https://github.com/piitaya/lovelace-mushroom) - Design inspiration
- [Home Assistant](https://www.home-assistant.io/) - The best home automation platform

## Support

If you find this card useful, consider:

- ⭐ Starring the repository
- 🐛 Reporting bugs or requesting features via [Issues](https://github.com/davidss20/music-assistant-playlist-card/issues)
- 🔧 Contributing code or translations
- ☕ [Buy me a coffee](https://buymeacoffee.com/davidss20)

[![Buy Me A Coffee](https://img.shields.io/badge/Buy%20Me%20A%20Coffee-support-yellow?style=for-the-badge&logo=buy-me-a-coffee)](https://buymeacoffee.com/davidss20)

