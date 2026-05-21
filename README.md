# Roster Manager — GitHub Pages Setup Guide

## Files in this repository

| File | Purpose |
|---|---|
| `roster-admin.html` | Full editor — for managers only |
| `roster-viewer.html` | Read-only view — share with all staff |
| `roster-data.json` | Your database — auto-updated by the admin |

---

## Step 1 — Create a GitHub repository

1. Go to [github.com](https://github.com) and sign in
2. Click **+** → **New repository**
3. Name it (e.g. `my-roster`)
4. Set it to **Public** ✅ (required for the viewer to read data without a token)
5. Click **Create repository**

---

## Step 2 — Upload the files

1. In your new repo, click **Add file** → **Upload files**
2. Upload all 4 files:
   - `roster-admin.html`
   - `roster-viewer.html`
   - `roster-data.json`
   - `README.md`
3. Click **Commit changes**

---

## Step 3 — Enable GitHub Pages

1. In your repo, go to **Settings** → **Pages**
2. Under **Source**, select **Deploy from a branch**
3. Choose branch: **main**, folder: **/ (root)**
4. Click **Save**
5. Wait ~60 seconds, then your site is live at:
   `https://YOUR-USERNAME.github.io/YOUR-REPO-NAME/`

---

## Step 4 — Create a Personal Access Token (Admin only)

The admin file needs a token to write data back to GitHub.

1. Go to **GitHub → Settings → Developer settings**
2. Click **Personal access tokens → Fine-grained tokens**
3. Click **Generate new token**
4. Set a name (e.g. "Roster Manager")
5. Set expiration (e.g. 1 year)
6. Under **Repository access** → select your roster repo only
7. Under **Permissions → Repository permissions** → set **Contents** to **Read and Write**
8. Click **Generate token** and **copy it immediately** (you won't see it again)

> ⚠️ Keep this token private. Only the admin needs it. It is stored only in the admin's browser (localStorage) and never sent anywhere except GitHub's API.

---

## Step 5 — Configure the Admin file

1. Open `https://YOUR-USERNAME.github.io/YOUR-REPO/roster-admin.html`
2. The setup banner appears at the top — fill in:
   - **GitHub Username**: your username
   - **Repository Name**: your repo name
   - **Personal Access Token**: the token from Step 4
   - **Data file path**: `roster-data.json` (leave as default)
3. Click **Save & Connect**
4. The roster loads. Every change you make auto-saves to `roster-data.json` in your repo.

---

## Step 6 — Configure the Viewer file (each staff member, once)

1. Open `https://YOUR-USERNAME.github.io/YOUR-REPO/roster-viewer.html`
2. Fill in:
   - **GitHub Username**: your username
   - **Repository Name**: your repo name
   - **Branch**: `main`
   - **Data file path**: `roster-data.json`
3. Click **Save & Load**
4. The setup is remembered — they only need to do this once per device/browser.

> No token needed for the viewer — it reads from the public raw GitHub URL.

---

## How data flows

```
Admin edits roster
       ↓
GitHub API (PUT) → roster-data.json updated in repo
       ↓
Viewer clicks Refresh
       ↓
raw.githubusercontent.com → roster-data.json read directly
```

## Sharing links

- **Admin**: `https://YOUR-USERNAME.github.io/YOUR-REPO/roster-admin.html`
- **Viewer**: `https://YOUR-USERNAME.github.io/YOUR-REPO/roster-viewer.html`

Give all staff the **Viewer** link. Keep the **Admin** link to yourself.

---

## Notes

- **Save speed**: ~1–3 seconds (GitHub API commit)
- **Viewer refresh**: manual (click ↻ Refresh) or reload the page
- **Token safety**: the token is stored only in your browser's localStorage, never in the repo
- **Backup**: `roster-data.json` is version-controlled — every save creates a Git commit, so you have full history
