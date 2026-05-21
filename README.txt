═══════════════════════════════════════════════════════════
  ROSTER MANAGER  –  Setup & Usage Guide
═══════════════════════════════════════════════════════════

WHAT YOU NEED
─────────────
  • Node.js installed on your computer
    Download free from: https://nodejs.org  (LTS version)
  • All 4 files in the SAME folder:
      server.js
      roster-admin.html
      roster-viewer.html
      (roster-data.json  ← created automatically on first run)


HOW TO START THE SERVER
───────────────────────
  1. Open a terminal / command prompt
  2. Navigate to the folder containing these files:
       cd path/to/your/roster-folder
  3. Run:
       node server.js
  4. You will see:
       ╔══════════════════════════════════════════════════╗
       ║          ROSTER MANAGER  –  Local Server         ║
       ║  Admin  →  http://localhost:3000/roster-admin.html  ║
       ║  Viewer →  http://localhost:3000/roster-viewer.html ║
       ╚══════════════════════════════════════════════════╝

  5. Open your browser and go to one of those URLs.
  6. To stop the server: press  Ctrl + C  in the terminal.


⚠️  IMPORTANT — open via http://localhost:3000, NOT by
    double-clicking the HTML files. Double-clicking won't
    connect to the server and data won't save.


FILES
─────
  server.js           The local web server. Run this once.
  roster-admin.html   Full editor. Only give this to managers.
  roster-viewer.html  Read-only view for all staff.
  roster-data.json    Your database. Auto-created. Back this
                      up regularly — it holds all your data.


ADMIN FEATURES (roster-admin.html)
────────────────────────────────────
  • 56-day grid for up to 70+ users
  • 4 shift types:
      D  = Day shift         (blue)
      A  = Afternoon shift   (green)
      RD = Rest Day          (yellow)
      AL = Annual Leave      (pink)
      Off = no assignment    (grey)
  • Left-click a cell    → cycle through shifts
  • Right-click a cell   → pick exact shift from menu
  • Click & drag         → paint the same shift across
                           multiple cells at once
  • Bulk fill            → apply one shift to all filtered users
  • Filters              → filter by sector, station, unit, shift
  • Sectors / Stations / Units tab → add/remove categories
  • Users tab            → add, edit, delete staff members
  • Export CSV           → download full roster as spreadsheet
  • Auto-save            → every change saves to roster-data.json
                           automatically (500ms debounce)
  • Reset                → restore to 70 sample users


VIEWER FEATURES (roster-viewer.html)
──────────────────────────────────────
  • Same grid, read-only (no editing)
  • All filters available (sector, station, unit, shift)
  • "My name" field → highlights your own row and shows
    a personal banner with your next upcoming shift and
    counts of D / A / RD / AL / Off days
  • Refresh button → pulls latest data from server
  • Export CSV


SHARING WITH YOUR TEAM
───────────────────────
  Since the server runs on your local machine, other people
  on the SAME Wi-Fi / network can also access it by using
  your computer's local IP address instead of "localhost":

    Example: http://192.168.1.45:3000/roster-viewer.html

  To find your IP:
    Windows: run  ipconfig  in Command Prompt
    Mac/Linux: run  ifconfig  or  ip addr  in Terminal

  Give staff the Viewer URL. Keep the Admin URL to yourself.


BACKUP
───────
  Simply copy roster-data.json to keep a backup.
  The file is plain JSON — you can open it in any text editor.


TROUBLESHOOTING
────────────────
  "Cannot reach the local server" banner appears:
    → Make sure you ran  node server.js  first
    → Make sure you opened the URL via http://localhost:3000
       not by double-clicking the file

  Port 3000 already in use:
    → Open server.js and change  const PORT = 3000
      to another number (e.g. 3001), then use that port in the URL

  Node.js not found:
    → Download and install from https://nodejs.org

═══════════════════════════════════════════════════════════
