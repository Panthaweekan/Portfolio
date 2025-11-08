# Deployment Guide

This document explains how to deploy this portfolio to GitHub Pages.

## Automated Deployment (Recommended)

The site is configured for **automatic deployment** via GitHub Actions.

### Setup Steps:

1. **Enable GitHub Pages**:
   - Go to your repository Settings → Pages
   - Under "Source", select **GitHub Actions**
   - Save the settings

2. **Push to main branch**:
   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

3. **Deployment happens automatically**:
   - GitHub Actions will run the workflow
   - Build the site with `npm run build`
   - Deploy the `/dist` folder to GitHub Pages
   - Site will be live at: `https://panthaweekan.github.io/github.io/`

### Monitor Deployment:

- Go to **Actions** tab in your GitHub repository
- Watch the "Deploy to GitHub Pages" workflow
- Click on a workflow run to see detailed logs
- Once complete, your site is live!

## Deployment Configuration

### Key Files:

1. **`.github/workflows/deploy.yml`** - GitHub Actions workflow
   - Triggers on push to `main` branch
   - Installs dependencies with `npm ci`
   - Builds with `npm run build`
   - Deploys `/dist` directory

2. **`vite.config.js`** - Vite configuration
   - `base: '/github.io/'` - Matches your repository name
   - Multi-page setup for index.html and resume.html
   - Assets properly referenced

3. **`public/.nojekyll`** - Prevents Jekyll processing
   - Ensures GitHub Pages serves assets from underscored directories
   - Automatically copied to dist during build

## Verifying Deployment

After deployment, verify:

1. **Site loads**: Visit `https://panthaweekan.github.io/github.io/`
2. **Styles work**: Check if Tailwind CSS is applied
3. **Assets load**: Images, fonts, and icons appear correctly
4. **Dark mode**: Theme toggle works and persists
5. **Navigation**: Links work (including resume page)
6. **Responsive**: Test on mobile devices

## Troubleshooting

### Assets not loading (404 errors):

**Problem**: Assets return 404 errors
**Solution**: Verify `base` in `vite.config.js` matches repository name:
- Project repo: `base: '/repo-name/'`
- User/org repo: `base: '/'`

### Styles not applied:

**Problem**: Page loads but no styling
**Solution**:
1. Check browser console for CSS 404 errors
2. Verify build completed successfully
3. Clear browser cache and hard refresh

### Build fails in GitHub Actions:

**Problem**: Workflow shows red X
**Solution**:
1. Check Actions tab for error logs
2. Common issues:
   - Missing dependencies (run `npm install` locally)
   - Build errors (run `npm run build` locally to debug)
   - Node version mismatch (workflow uses Node 20)

### Dark mode doesn't persist:

**Problem**: Theme resets on page reload
**Solution**:
- Ensure `src/js/theme.js` is properly imported
- Check browser console for JavaScript errors
- Verify localStorage is not blocked

## Manual Deployment (Alternative)

If you prefer manual deployment:

1. **Build locally**:
   ```bash
   npm run build
   ```

2. **Install gh-pages** (if not already):
   ```bash
   npm install -D gh-pages
   ```

3. **Add deploy script** to `package.json`:
   ```json
   "scripts": {
     "deploy": "gh-pages -d dist"
   }
   ```

4. **Deploy**:
   ```bash
   npm run deploy
   ```

## Environment-Specific Configuration

### Development:
```bash
npm run dev
# Runs at http://localhost:5173/github.io/
```

### Production Preview:
```bash
npm run build
npm run preview
# Preview production build locally
```

### Production (GitHub Pages):
- Automatically deployed via GitHub Actions
- Base URL: `/github.io/`
- Assets served from `/github.io/assets/`

## Updating the Site

1. Make changes locally
2. Test with `npm run dev`
3. Build and verify with `npm run build && npm run preview`
4. Commit and push to main:
   ```bash
   git add .
   git commit -m "description of changes"
   git push origin main
   ```
5. GitHub Actions automatically deploys

## Custom Domain (Optional)

To use a custom domain:

1. Add `CNAME` file to `/public` directory:
   ```
   yourdomain.com
   ```

2. Configure DNS settings with your domain provider:
   - Add A records pointing to GitHub Pages IPs
   - Or add CNAME record pointing to `panthaweekan.github.io`

3. Update `vite.config.js`:
   ```js
   base: '/' // Remove repo-specific path for custom domain
   ```

4. Rebuild and deploy

## GitHub Pages Settings

**Recommended settings**:
- Source: GitHub Actions
- Custom domain: (optional)
- Enforce HTTPS: ✓ Enabled (recommended)
- Build and deployment: Use GitHub Actions workflow

---

For more information:
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#github-pages)
