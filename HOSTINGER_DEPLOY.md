# Hostinger deployment

The site is built with Astro and deployed as static files. Hostinger only serves the generated `dist/` directory; Node.js is required by the GitHub Actions build, not at runtime.

## GitHub configuration

Add these **repository secrets** under `Settings > Secrets and variables > Actions`:

- `HOSTINGER_SERVER`: Hostinger FTP server hostname
- `HOSTINGER_USERNAME`: FTP username
- `HOSTINGER_PASSWORD`: FTP password
- `HOSTINGER_SERVER_DIR`: remote directory for the site, usually the `public_html` path

Add this **repository variable** under `Settings > Secrets and variables > Actions > Variables`:

- `SITE_URL`: complete public URL, such as `https://example.com`
- `PUBLIC_FORMSPREE_ENDPOINT`: optional form endpoint if you prefer Formspree over the default FormSubmit endpoint

The workflow uses FTPS on port 21 and deploys on every push to `main`. It can also be started manually with `workflow_dispatch`.

The contact page uses the FormSubmit endpoint by default. Configure `PUBLIC_FORMSPREE_ENDPOINT` as a GitHub Actions variable if you use a verified Formspree form instead.

## First deployment

1. Confirm the Hostinger FTP account can write to the target directory.
2. Set the secrets and `SITE_URL` variable before pushing to `main`.
3. Open the GitHub Actions run and confirm the build and deployment steps succeed.
4. Check the Hostinger temporary URL for the home page, projects index, five project pages, assets, sitemap, `robots.txt`, and the custom 404 page.

## Local verification

```sh
npm ci
SITE_URL=https://example.com BASE_PATH=/ npm run build
npm run preview
```

On Windows PowerShell, set the variables for the current session first:

```powershell
$env:SITE_URL = "https://example.com"
$env:BASE_PATH = "/"
npm run build
```

Do not commit FTP credentials. If the Hostinger plan supports SSH/SFTP and you prefer key-based authentication, the deployment step can later be changed without changing the Astro site.
