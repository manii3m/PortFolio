# 🚀 Mayank Vishwakarma — Developer Portfolio

<div align="center">

![Portfolio Preview](https://img.shields.io/badge/Portfolio-Live-purple?style=for-the-badge&logo=vercel&logoColor=white)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

**A modern, minimalist developer portfolio with interactive 3D animations and a custom cursor experience.**

[Live Demo](#) • [Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started)

</div>

---

## ✨ Features

### 🎨 **Design Excellence**
- **Dark Mode Theme** — Eye-friendly dark aesthetic with carefully chosen color palette
- **Custom Cursor** — Interactive cursor with hover effects and glow animations
- **Smooth Animations** — Buttery-smooth transitions with custom easing functions
- **Responsive Design** — Fully optimized for all screen sizes and devices
- **Glassmorphism UI** — Modern glass-effect containers with backdrop blur

### ⚙️ **Advanced Functionality**
- **Interactive 3D Graphics** — Three.js-powered 3D visualization elements
- **Smooth Scrolling** — HTML5 native scroll behavior with enhanced interactivity
- **Performance Optimized** — Lightweight code with minimal dependencies
- **Accessibility First** — WCAG compliant with proper semantic HTML

### 🎯 **Modern Typography**
- **Syne Font** — Bold, distinctive display font for headings
- **DM Sans** — Beautiful, versatile font for body text
- **JetBrains Mono** — Professional monospace font for code snippets

---

## 🎨 Color Palette

The portfolio uses a sophisticated dark theme with vibrant accent colors:

| Color | Hex | Usage |
|-------|-----|-------|
| Background | `#060610` | Primary background |
| Surface | `rgba(255,255,255,0.04)` | Cards & containers |
| Accent | `#6c63ff` | Primary interactive elements |
| Neon | `#7c3aed` | Highlights & emphasis |
| Cyan | `#22d3ee` | Accent highlights |
| Pink | `#f472b6` | Secondary highlights |
| Green | `#34d399` | Success states |

---

## 🛠️ Tech Stack

```
Frontend
├── HTML5 — Semantic markup & structure
├── CSS3 — Advanced styling with custom properties & animations
├── JavaScript — Interactivity & custom cursor management
└── Three.js — 3D graphics & WebGL rendering
```

### External Libraries
- **Three.js** (v128) — 3D graphics library
- **Google Fonts** — Syne, DM Sans, JetBrains Mono

---

## 📁 Project Structure

```
PortFolio/
├── index.html          # Main HTML file with all styling & scripts
└── README.md           # Project documentation
```

### Single File Architecture
This portfolio is built as a single `index.html` file containing:
- Semantic HTML structure
- Embedded CSS with CSS custom properties
- Vanilla JavaScript for interactivity
- Custom cursor system
- Loading animations

---

## 🚀 Getting Started

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, or Edge)
- No build tools or server required — pure HTML/CSS/JS

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/PortFolio.git
   cd PortFolio
   ```

2. **Open in browser**
   ```bash
   # Using Python 3
   python3 -m http.server 8000
   
   # Or using Python 2
   python -m SimpleHTTPServer 8000
   
   # Or using npx (if Node.js is installed)
   npx http-server
   ```

3. **Visit in browser**
   ```
   http://localhost:8000
   ```

### Alternative Methods
- **Direct Open**: Simply double-click `index.html` in your file explorer
- **Live Server**: Use VS Code's Live Server extension
- **Deploy Directly**: Upload to any static hosting service

---

## 🎬 Key Features Explained

### Custom Cursor System
```javascript
// Interactive cursor that responds to user movement
// - Dot follows mouse position with smooth trail
// - Ring expands on hover over interactive elements
// - Glow effect with accent color
```

### Smooth Animations
- CSS transitions with custom cubic-bezier easing
- Transform-based animations for maximum performance
- GPU-accelerated effects with `will-change` hints

### 3D Graphics Integration
- Three.js canvas rendering
- WebGL support for modern browsers
- Fallback support for legacy browsers

---

## 🎯 Customization Guide

### Changing Colors
Edit the CSS custom properties in the `:root` selector:

```css
:root {
    --bg: #060610;              /* Primary background */
    --accent: #6c63ff;          /* Primary color */
    --accent2: #a78bfa;         /* Secondary accent */
    --cyan: #22d3ee;            /* Highlight color */
    /* ... more colors ... */
}
```

### Updating Content
Edit the HTML sections within `index.html`:
- **Header/Hero**: Modify title and intro text
- **About**: Update description and skills
- **Projects**: Add your portfolio projects
- **Contact**: Update contact information

### Modifying Fonts
Update the Google Fonts import URL:
```html
<link href="https://fonts.googleapis.com/css2?family=..." rel="stylesheet">
```

---

## 🔧 Performance Tips

✅ **Optimizations Included**
- Minimal external dependencies (only Three.js)
- CSS custom properties for efficient theme switching
- Single file reduces HTTP requests
- Smooth scroll behavior with CSS

💡 **Further Optimization**
- Lazy load images for projects
- Minify CSS and JavaScript for production
- Consider splitting into multiple files for large projects

---

## 📱 Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | Latest | ✅ Full Support |
| Firefox | Latest | ✅ Full Support |
| Safari | Latest | ✅ Full Support |
| Edge | Latest | ✅ Full Support |
| IE 11 | - | ❌ Not Supported |

---

## 🤝 Contributing

Contributions are welcome! Here's how to help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 📧 Contact

**Mayank Vishwakarma**
- 🔗 [Portfolio](http://your-portfolio-url.com)
- 💼 [LinkedIn](https://linkedin.com/in/yourprofile)
- 🐙 [GitHub](https://github.com/manii3m)
- 📧 [Email](mailto:your.email@example.com)

---

## 🙏 Acknowledgments

- **Three.js** for powerful 3D graphics
- **Google Fonts** for beautiful typography
- **CDN** providers for fast asset delivery

---

<div align="center">

**Made with ❤️ by Mayank Vishwakarma**

⭐ If you like this portfolio, please consider giving it a star!

</div>
