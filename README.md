# Colorytics

## 💡 Project Idea

**Colorytics** is a modern color conversion and palette extraction tool designed for developers and designers. Built with Next.js, it provides a seamless experience for converting between multiple color formats and extracting beautiful color palettes from images. Whether you're building a design system, creating CSS variables, or configuring Tailwind colors, Colorytics makes color management effortless.

### 🎨 What Makes It Special

Colorytics stands out with its intelligent color parsing that understands raw values, formatted strings, and everything in between. The smart color extraction algorithm ensures you get distinct, meaningful colors from images - not just similar shades. With one-click export options for CSS variables and Tailwind configs, it bridges the gap between design and code.

### 🎯 Core Purpose

- **Multi-Format Support:** Convert between HEX, RGB, HSL, HSV, and OKLCH color formats
- **Image Color Extraction:** Upload images and extract dominant color palettes automatically
- **Smart Export:** Generate ready-to-use CSS variables or Tailwind config files
- **Real-Time Preview:** View colors in multiple formats simultaneously
- **Developer-Friendly:** Copy to clipboard, format switching, and syntax highlighting
- **Theme Support:** Beautiful dark mode with seamless theme switching

## 🛠 Tech Stack

- **🖥 Framework:** Next.js 15 (TypeScript, App Router)
- **🎨 Styling:** Tailwind CSS 4
- **🧩 UI Components:** Radix UI primitives (Dialog, Select, Tabs, Label)
- **📦 State Management:** Zustand
- **🎨 Color Processing:** colord with LCH plugin
- **🖼 Image Analysis:** ColorThief algorithm
- **💅 Code Highlighting:** react-syntax-highlighter
- **🌙 Theme:** next-themes
- **🔔 Notifications:** sonner (toast notifications)
- **✨ Icons:** lucide-react

## 🚀 How to Run the Project

### Prerequisites

- Node.js (v20 or higher)
- pnpm (recommended) or npm

### Installation & Setup

```sh
# Clone the repository
git clone https://github.com/yourusername/colorytics.git
cd colorytics

# Install dependencies (uses pnpm)
pnpm install

# Start the development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## 🎨 How to Use

### Adding Colors Manually

Enter any valid color code in the input field:

- **HEX:** `#ff5733` or `ff5733`
- **RGB:** `255, 87, 51` or `rgb(255, 87, 51)`
- **HSL:** `9 100% 60%` or `hsl(9, 100%, 60%)`
- **HSV:** `9° 80% 100%`
- **OKLCH:** `0.7 0.2 50` or `oklch(0.7 0.2 50)`

Press **Enter** or click **Add** to add the color to your palette.

### Extracting Colors from Images

1. Click **"upload image"** button
2. Select an image file from your device
3. The tool automatically extracts up to **8 dominant colors**
4. Similar colors are filtered to ensure a diverse palette

### Managing Your Palette

- **Switch Formats:** Use the format selector dropdown to view colors in different formats
- **Copy Colors:** Click on any color value to copy it to clipboard
- **Remove Colors:** Hover over a color card and click the delete icon
- **Discard All:** Clear the entire palette with the "discard" button

### Exporting Color Palettes

1. Click the **"export"** button
2. Choose your export format:
   - **Tailwind:** Ready-to-use Tailwind config
   - **CSS (HEX, RGB, HSL, OKLCH):** CSS variables in your preferred format
3. Click the copy icon to copy the generated code
4. Paste into your project!

## � Project Structure

```
Colorytics/
├── app/
│   ├── favicon.ico              # App favicon
│   ├── globals.css              # Global styles and Tailwind directives
│   ├── layout.tsx               # Root layout with metadata and theme provider
│   ├── opengraph-image.png      # Open Graph image for social sharing
│   ├── page.tsx                 # Main application page with color tools
│   ├── store/
│   │   └── colorStore.ts        # Zustand store for color state management
│   └── utils/
│       └── colorUtils.ts        # Color conversion and export utilities
├── components/
│   ├── mode-toggle.tsx          # Dark/light mode toggle component
│   ├── navbar.tsx               # Navigation bar with branding
│   ├── theme-provider.tsx       # Next-themes provider wrapper
│   └── ui/
│       ├── button.tsx           # Radix UI button component
│       ├── dialog.tsx           # Radix UI dialog component
│       ├── input.tsx            # Radix UI input component
│       ├── label.tsx            # Radix UI label component
│       ├── select.tsx           # Radix UI select component
│       └── tabs.tsx             # Radix UI tabs component
├── lib/
│   └── utils.ts                 # Utility functions (cn helper)
├── public/
│   ├── favicon.ico              # Public favicon
│   ├── favicon.png              # PNG favicon
│   ├── opengraph-image.png      # Open Graph image
│   └── pp.png                   # Profile/app image
├── types/
│   └── colorthief.d.ts          # TypeScript definitions for ColorThief
├── components.json              # shadcn/ui configuration
├── eslint.config.mjs            # ESLint configuration
├── next.config.ts               # Next.js configuration
├── package.json                 # Project dependencies and scripts
├── postcss.config.mjs           # PostCSS configuration
├── tsconfig.json                # TypeScript configuration
└── README.md                    # Project documentation
```

## 📱 Features Overview

### Core Features

- **Multi-Format Color Input:** Accepts HEX, RGB, HSL, HSV, and OKLCH formats
- **Intelligent Parsing:** Automatically detects and normalizes color inputs
- **Image Color Extraction:** Extract up to 8 dominant colors from any image
- **Format Conversion:** View any color in all supported formats instantly
- **Copy to Clipboard:** One-click copying for all color values
- **Color Management:** Add, remove, and organize your color palette

### Advanced Features

- **Smart Filtering:** Removes similar colors using Euclidean distance algorithm
- **Export Options:** Generate CSS variables or Tailwind config files
- **Syntax Highlighting:** Beautiful code preview with syntax highlighting
- **Dark Mode:** Seamless theme switching with system preference detection
- **Responsive Design:** Works flawlessly on desktop, tablet, and mobile
- **Toast Notifications:** Clear feedback for all user actions
- **Duplicate Detection:** Prevents adding duplicate colors to palette

### Export Formats

**Tailwind Config Example:**

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        color1: "#ff5733",
        color2: "#33ff57",
        color3: "#3357ff",
      },
    },
  },
};
```

**CSS Variables Example:**

```css
:root {
  --color-1: #ff5733;
  --color-2: #33ff57;
  --color-3: #3357ff;
}
```

## 🎯 Technical Highlights

### Smart Color Extraction Algorithm

- Uses **ColorThief** to identify dominant colors in images
- Calculates **Euclidean distance** in RGB space to filter similar colors
- Maintains a **30-unit threshold** for color diversity
- Prevents duplicate colors automatically
- Extracts up to **8 distinct colors** per image

### Flexible Color Input Parser

- Handles raw values: `255, 87, 51`
- Handles formatted strings: `rgb(255, 87, 51)`
- Supports shorthand HEX: `f57` → `#ff5577`
- Auto-adds missing prefixes: `ff5733` → `#ff5733`
- Validates all inputs using **colord** library

### State Management

- **Zustand** for lightweight, performant state management
- Centralized color palette state
- Efficient updates without unnecessary re-renders
- Clean separation of concerns

---

✨ Built with ❤️ by developers, for developers
