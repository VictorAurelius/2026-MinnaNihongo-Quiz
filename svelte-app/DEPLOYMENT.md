# Deployment Guide

Complete guide for deploying Smart Quiz to various hosting platforms.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Build Configuration](#build-configuration)
- [GitHub Pages](#github-pages)
- [Netlify](#netlify)
- [Vercel](#vercel)
- [Custom Server](#custom-server)
- [Troubleshooting](#troubleshooting)

## Prerequisites

### Required
- Node.js 20+
- npm 9+
- Git

### Build the App
```bash
cd svelte-app
npm install
npm run build
```

The build output will be in the `build/` directory.

## Build Configuration

### Static Adapter
The app uses `@sveltejs/adapter-static` for static site generation.

**svelte.config.js:**
```javascript
adapter: adapter({
  pages: 'build',
  assets: 'build',
  fallback: 'index.html',  // SPA fallback
  precompress: true,        // Generate .gz and .br files
  strict: true
})
```

### Base Path (Optional)
If deploying to a subdirectory (e.g., `https://example.com/smart-quiz/`):

1. Edit `svelte.config.js`:
```javascript
kit: {
  paths: {
    base: '/smart-quiz'
  }
}
```

2. Rebuild:
```bash
npm run build
```

## GitHub Pages

### Automatic Deployment (Recommended)

1. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Set source to "GitHub Actions"

2. **Workflow File**
   - File is already created at `.github/workflows/deploy.yml`
   - Automatically triggers on push to `main` branch

3. **Push to Deploy**
   ```bash
   git push origin main
   ```

4. **Access Your App**
   - URL: `https://yourusername.github.io/repository-name/`
   - May take 1-2 minutes for first deployment

### Manual Deployment

```bash
# Build
npm run build

# Install gh-pages
npm install -g gh-pages

# Deploy
gh-pages -d build
```

### Custom Domain

1. Add `CNAME` file to `static/` directory:
   ```
   yourdomain.com
   ```

2. Configure DNS:
   - Add CNAME record pointing to `yourusername.github.io`
   - Or A records pointing to GitHub's IPs

3. Enable HTTPS in GitHub Pages settings

## Netlify

### Method 1: Netlify CLI (Recommended)

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login
netlify login

# Deploy
cd svelte-app
npm run build
netlify deploy --prod --dir=build
```

### Method 2: Git Integration

1. **Connect Repository**
   - Go to [Netlify](https://app.netlify.com)
   - Click "New site from Git"
   - Choose GitHub/GitLab/Bitbucket
   - Select your repository

2. **Build Settings**
   - Base directory: `svelte-app`
   - Build command: `npm run build`
   - Publish directory: `svelte-app/build`

3. **Deploy**
   - Automatic on every push to main branch

### Method 3: Drag & Drop

1. Build locally: `npm run build`
2. Go to [Netlify Drop](https://app.netlify.com/drop)
3. Drag the `build/` folder

### Configuration File

`netlify.toml` is already configured with:
- Build settings
- Redirects for SPA routing
- Cache headers
- Security headers

### Custom Domain

1. Go to Site settings → Domain management
2. Add custom domain
3. Configure DNS (Netlify provides instructions)
4. SSL certificate auto-generated

### Environment Variables

1. Go to Site settings → Environment variables
2. Add variables:
   ```
   PUBLIC_GA_ID=G-XXXXXXXXXX
   NODE_VERSION=20
   ```

## Vercel

### Method 1: Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
cd svelte-app
vercel --prod
```

### Method 2: Git Integration

1. **Connect Repository**
   - Go to [Vercel](https://vercel.com)
   - Click "Import Project"
   - Select your repository

2. **Build Settings**
   - Framework Preset: SvelteKit
   - Root Directory: `svelte-app`
   - Build Command: `npm run build`
   - Output Directory: `build`

3. **Deploy**
   - Automatic on every push

### Configuration File

`vercel.json` is already configured with:
- Build settings
- Rewrites for SPA routing
- Security headers
- Cache headers

### Custom Domain

1. Go to Project settings → Domains
2. Add custom domain
3. Configure DNS (Vercel provides instructions)
4. SSL certificate auto-configured

### Environment Variables

1. Go to Project settings → Environment Variables
2. Add variables for Production, Preview, and Development

## Custom Server

### Prerequisites
- Web server (Nginx, Apache, etc.)
- SSL certificate (Let's Encrypt recommended)

### Nginx Configuration

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    # SSL certificates
    ssl_certificate /path/to/fullchain.pem;
    ssl_certificate_key /path/to/privkey.pem;

    # Root directory
    root /var/www/smart-quiz;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # Security headers
    add_header X-Frame-Options "DENY" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff2)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # SPA fallback
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Apache Configuration

```apache
<VirtualHost *:443>
    ServerName yourdomain.com
    DocumentRoot /var/www/smart-quiz

    # SSL
    SSLEngine on
    SSLCertificateFile /path/to/fullchain.pem
    SSLCertificateKeyFile /path/to/privkey.pem

    # Compression
    <IfModule mod_deflate.c>
        AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css application/javascript
    </IfModule>

    # Cache headers
    <FilesMatch "\.(js|css|png|jpg|jpeg|gif|ico|svg|woff2)$">
        Header set Cache-Control "max-age=31536000, public, immutable"
    </FilesMatch>

    # Security headers
    Header set X-Frame-Options "DENY"
    Header set X-Content-Type-Options "nosniff"
    Header set Referrer-Policy "strict-origin-when-cross-origin"

    # SPA fallback
    <Directory /var/www/smart-quiz>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted

        RewriteEngine On
        RewriteBase /
        RewriteRule ^index\.html$ - [L]
        RewriteCond %{REQUEST_FILENAME} !-f
        RewriteCond %{REQUEST_FILENAME} !-d
        RewriteRule . /index.html [L]
    </Directory>
</VirtualHost>
```

### Deploy Steps

1. **Build locally**
   ```bash
   npm run build
   ```

2. **Upload to server**
   ```bash
   rsync -avz build/ user@server:/var/www/smart-quiz/
   ```

3. **Set permissions**
   ```bash
   ssh user@server
   sudo chown -R www-data:www-data /var/www/smart-quiz
   sudo chmod -R 755 /var/www/smart-quiz
   ```

4. **Restart web server**
   ```bash
   sudo systemctl restart nginx
   # or
   sudo systemctl restart apache2
   ```

## Troubleshooting

### Issue: Blank page after deployment

**Cause**: Incorrect base path or routing configuration

**Solution**:
1. Check browser console for errors
2. Verify `fallback: 'index.html'` in `svelte.config.js`
3. Ensure server is configured for SPA routing

### Issue: 404 on page refresh

**Cause**: Server not configured for SPA routing

**Solution**:
- GitHub Pages: Ensure `fallback: 'index.html'` is set
- Netlify: Add `_redirects` file or use `netlify.toml`
- Vercel: Use `vercel.json` rewrites
- Custom: Configure server (see examples above)

### Issue: Assets not loading

**Cause**: Incorrect base path

**Solution**:
1. If deploying to subdirectory, set `base` in `svelte.config.js`
2. Rebuild and redeploy

### Issue: Service worker not updating

**Cause**: Aggressive browser caching

**Solution**:
1. Clear browser cache
2. Hard refresh (Ctrl+Shift+R / Cmd+Shift+R)
3. Check service worker in DevTools → Application → Service Workers
4. Click "Update" or "Unregister"

### Issue: PWA not installable

**Cause**: Missing requirements (HTTPS, manifest, service worker)

**Solution**:
1. Ensure site is served over HTTPS
2. Verify `manifest.json` is accessible
3. Check service worker is registered
4. Run Lighthouse audit for PWA score

### Issue: Build fails with memory error

**Cause**: Large bundle or insufficient memory

**Solution**:
```bash
# Increase Node.js memory limit
NODE_OPTIONS=--max-old-space-size=4096 npm run build
```

### Issue: TypeScript errors

**Cause**: Type checking errors

**Solution**:
```bash
# Check types before building
npm run check

# Fix errors and rebuild
npm run build
```

## Performance Optimization

### Before Deployment Checklist

- [ ] Run `npm run check` (no TypeScript errors)
- [ ] Run `npm run build` (successful build)
- [ ] Test production build locally: `npm run preview`
- [ ] Run Lighthouse audit (>90 scores)
- [ ] Test on mobile devices
- [ ] Test offline functionality
- [ ] Verify service worker registration
- [ ] Check bundle sizes (<350 KB target)

### Post-Deployment

1. **Monitor Performance**
   - Use [WebPageTest](https://www.webpagetest.org/)
   - Check Core Web Vitals
   - Monitor Lighthouse scores

2. **Enable Monitoring**
   - Set up error tracking (Sentry, Rollbar)
   - Add analytics (Google Analytics, Plausible)
   - Monitor uptime (UptimeRobot)

3. **CDN Configuration**
   - Netlify/Vercel include CDN automatically
   - For custom: Use Cloudflare or similar

## Continuous Deployment

### GitHub Actions (Recommended)

The `.github/workflows/deploy.yml` file is already configured:

- **Trigger**: Push to `main` branch
- **Build**: Runs `npm ci && npm run build`
- **Deploy**: Automatically to GitHub Pages

### Custom CI/CD

**GitLab CI Example** (`.gitlab-ci.yml`):
```yaml
image: node:20

stages:
  - build
  - deploy

build:
  stage: build
  script:
    - cd svelte-app
    - npm ci
    - npm run build
  artifacts:
    paths:
      - svelte-app/build

deploy:
  stage: deploy
  script:
    - echo "Deploy to your server"
  only:
    - main
```

## Rollback Strategy

### Netlify/Vercel
- Go to Deployments
- Click on previous successful deployment
- Click "Publish"

### GitHub Pages
```bash
# Revert to previous commit
git revert HEAD
git push origin main
```

### Custom Server
```bash
# Keep previous build as backup
mv build build-backup
# If needed to rollback
mv build-backup build
```

## Security Checklist

- [ ] HTTPS enabled
- [ ] Security headers configured
- [ ] CSP policy (if needed)
- [ ] Environment variables not exposed
- [ ] No sensitive data in client-side code
- [ ] Regular dependency updates
- [ ] CORS configured (if using API)

---

Need help? Check [README.md](./README.md) or open an issue.
