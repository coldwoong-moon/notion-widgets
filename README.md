# Notion Widgets Gallery

Beautiful embeddable widgets for your Notion pages with minimalist design and theme support.

## 🎨 Features

- **Widget Collection**: Clock, Calendar, Weather, and Year Progress widgets
- **Theme System**: Multiple themes including Monochrome, Dark, and Minimal
- **Notion-Optimized**: Widgets sized perfectly for Notion embed blocks
- **Easy Sharing**: One-click URL copy for embedding in Notion
- **Responsive Design**: Works on all screen sizes

## 🚀 Live Demo

Visit the live site: [https://coldwoong-moon.github.io/notion-widgets](https://coldwoong-moon.github.io/notion-widgets)

## 📦 Available Widgets

1. **Clock** - Minimalist digital clock with seconds
2. **Calendar** - Clean monthly calendar view with current day highlight
3. **Weather** - Simple weather display (demo data)
4. **Year Progress** - Visual progress bars for year, month, and day

## 🎯 How to Use

1. Visit the [widget gallery](https://coldwoong-moon.github.io/notion-widgets)
2. Choose a theme from the header
3. Click "Copy Widget URL" on any widget
4. In Notion, type `/embed` and paste the URL
5. Adjust the embed size as needed

## 🛠️ Development

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/coldwoong-moon/notion-widgets.git
cd notion-widgets

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

### Building for Production

```bash
npm run build
```

## 🚢 Deployment

This project is automatically deployed to GitHub Pages using GitHub Actions.

### Enable GitHub Pages

1. Go to your repository settings
2. Navigate to "Pages" section
3. Under "Build and deployment":
   - Source: "GitHub Actions"

The site will be automatically deployed when you push to the `main` branch.

## 📝 Adding New Widgets

1. Create a new widget component in `components/widgets/`
2. Add the widget to the registry in `lib/widgets.ts`
3. The widget will automatically appear in the gallery

Example widget structure:
```tsx
export function MyWidget({ theme }: { theme: Theme }) {
  return (
    <div style={{ 
      backgroundColor: theme.colors.background,
      color: theme.colors.foreground 
    }}>
      {/* Your widget content */}
    </div>
  );
}
```

## 🎨 Creating New Themes

Add new themes in `lib/themes/index.ts`:

```typescript
export const themes: Record<string, Theme> = {
  myTheme: {
    id: 'myTheme',
    name: 'My Theme',
    colors: {
      background: '#ffffff',
      foreground: '#000000',
      // ... other colors
    },
    // ... typography settings
  }
};
```

## 📄 License

MIT License

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Made with ❤️ for Notion users