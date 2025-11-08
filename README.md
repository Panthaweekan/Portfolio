# Portfolio Website

Personal portfolio website for Panthaweekan Somngam - Full-Stack Developer

🔗 **Live Site**: [panthaweekan.github.io/github.io](https://panthaweekan.github.io/github.io/)

## ✨ Features

- 🎨 Modern, responsive design with Tailwind CSS
- 🌓 Dark/Light mode toggle with persistence
- ✍️ Animated typing effect
- 🎭 Interactive particle background
- 📜 Parallax scrolling effects
- 📱 Mobile-responsive navigation
- 📄 Printable resume page
- ⚡ Lightning-fast with Vite
- 🚀 Automated deployment via GitHub Actions

## 🛠️ Tech Stack

- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **JavaScript**: Vanilla ES6+ (modular)
- **Deployment**: GitHub Pages
- **CI/CD**: GitHub Actions

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/Panthaweekan/github.io.git

# Navigate to the project directory
cd github.io

# Install dependencies
npm install
```

## 🚀 Development

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The development server will start at `http://localhost:5173/github.io/`

## 🚢 Deployment

This site is configured for **automatic deployment** to GitHub Pages via GitHub Actions.

### Quick Deploy:

```bash
git add .
git commit -m "Your changes"
git push origin main
```

That's it! GitHub Actions will automatically build and deploy your site.

📖 For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md)

## 📁 Project Structure

```
├── src/
│   ├── js/              # Modular JavaScript
│   │   ├── main.js      # Main entry point
│   │   ├── typing.js    # Typing animation
│   │   ├── theme.js     # Theme toggle
│   │   ├── background.js # Background effects
│   │   ├── parallax.js  # Parallax scrolling
│   │   ├── navbar.js    # Navigation
│   │   └── smoothScroll.js
│   └── css/
│       ├── main.css     # Main styles
│       └── resume.css   # Resume styles
├── public/
│   └── imgs/           # Images and assets
├── index.html          # Landing page
├── resume.html         # Resume/CV page
└── vite.config.js      # Vite configuration
```

## 🎨 Customization

### Colors

Edit `tailwind.config.js`:

```js
colors: {
  primary: "#9C83FF",   // Purple
  secondary: "#FF9051", // Orange
  // Add more colors...
}
```

### Adding New Features

1. Create a new module in `src/js/`
2. Export your functions
3. Import in `src/js/main.js`
4. Initialize in the appropriate event listener

### Styling

- Use Tailwind utilities directly in HTML
- Add custom styles to `src/css/main.css`
- Custom animations go in `@layer utilities`

## 📝 License

This project is open source and available under the [ISC License](LICENSE).

## 👤 Author

**Panthaweekan Somngam**

- GitHub: [@Panthaweekan](https://github.com/Panthaweekan)
- LinkedIn: [panthaweekan](https://www.linkedin.com/in/panthaweekan/)
- Email: panthaweekansomngam@gmail.com

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check [issues page](https://github.com/Panthaweekan/github.io/issues).

## ⭐ Show Your Support

Give a ⭐️ if you like this project!
