# BNPMC Math Club website

A responsive, single-page website inspired by your screenshots: deep navy background, handwritten/math-inspired accents, cream paper cards, club sections and a winners table.

## Files
- `index.html` — page structure and text
- `style.css` — colours, layout, responsive design and styling
- `script.js` — mobile menu, Mathletics winners list and search/filter, randomized timed Math Sprint game, application form feedback, active navigation and back-to-top button
- `assets/` — previously supplied profile graphics (kept in the assets folder but no longer displayed in the panel)

## Open the website
1. Download and extract `bnpmc_math_club_website.zip`.
2. Open the extracted folder.
3. Double-click `index.html` to open it in Chrome, Firefox or Edge.
4. For a more convenient editing workflow, install Visual Studio Code and open the extracted folder. You can use the Live Server extension to preview changes as you save.

No build tools or package installation are required.

## How to edit it
### Change text
Open `index.html` in a text editor. Search for the heading or paragraph you want to change and edit the words between the HTML tags. Keep the opening and closing tags, such as `<h2>` and `</h2>`.

### Change colours and fonts
Open `style.css`. The main colours are at the top in `:root`:
- `--navy` — page background
- `--paper` — card background
- `--ink` — text on light cards
- `--blue` — link/accent colour
- `--accent` — peach highlight

Change the hex values, for example `--navy:#07082f;`. Save and refresh the browser.

### Add or edit winners
Open `script.js` and find `const winners = [...]`. Each line is one result object with `event`, `category`, `first`, `second`, and `third`. Copy a line, edit the values, and make sure commas and quotation marks remain valid. The table search and category filter update automatically.

The winners list has been transcribed from the screenshots you supplied. Please double-check spellings and placements before publishing, since some names in the images are small.

### Edit the executive panel
The panel heading is in `index.html` and is currently **Executive Panel — Session 2026**. Each profile card includes a role, name, and session. Replace the image files in `assets/` to update portraits; keep the same filenames, or update the matching `src` path in `index.html`. The source images supplied were poster-style graphics, so each card shows the full design.

### Change the Mathletics questions
In `script.js`, find `const questions = [...]`. Each question has:
- `q`: question text
- `options`: three answer choices
- `answer`: the exact correct answer, matching one of the options

To add another question, copy an object and add a comma between objects. The quiz score updates automatically.

### Change the contact email
In `index.html`, search for `bnpmcmcofficial@gmail.com`. Update both the visible address and the `mailto:` address if needed.

### Student application form (Google Forms)
The Join section embeds the club's Google Form directly in `index.html`. Student submissions go to the Google Form owner, not to the website files. The form link is set in the iframe `src` and in the fallback link. To change it, replace the URL in both places. In Google Forms, the owner can review answers under **Responses** and optionally link responses to a Google Sheet. Make sure the form is published and its responder access allows the intended students to submit.

### Add images or a logo
Put image files in a folder such as `images/` inside this project. In `index.html`, use an image tag like:
`<img src="images/club-logo.png" alt="BNPMC Math Club logo">`
Then style it in `style.css`. Use images you have permission to publish.

## Interactions included
- Responsive navigation menu on small screens
- Navigation links that scroll to each section and highlight the current section
- Searchable and filterable winners table
- Timed Mathletics practice quiz with score feedback and reset
- Embedded Google Forms student application (submits to the form owner's Google Forms response store)
- Back-to-top button

## Before publishing
1. Replace demo text and results with verified club information.
2. Confirm the contact email and links.
3. Verify that the Google Form is published, accepts responses from the intended students, and that the owner can access the Responses tab.
4. Test the page on desktop and mobile.
5. Publish the folder using a static host such as GitHub Pages or Netlify. A static host will not make the form send email by itself.

## Executive Panel updates
The Executive Panel — Session 2026 includes the names visible in the latest reference screenshots: moderator Fazlur Rahman Shawami, president Noor M Neferiti, vice presidents Shadman Kabir and Fahim Montasir Fahad, and secretaries Anmoy Saha, Afra Saiyara Farnaz, and Atia Nayeem. Their portrait thumbnails were cropped from the supplied reference screenshots. The earlier five panel profiles remain included. The Executive Members section at the bottom of the reference screenshots is cut off before their names are visible, so those people have not been guessed or added by name.


### Facebook links in Articles & Resources
Two external Facebook links have been added as cards in the Articles & Resources section. They open in a new browser tab. If Facebook asks visitors to sign in or the post is private, that is controlled by Facebook's privacy/access settings, not the website.


### Social media links
The footer includes the official Facebook page (https://www.facebook.com/club.bnmpc.math) and Instagram profile (https://www.instagram.com/bnmpcmathclub/). To change them, edit the `href` values for `.footer-social` in `index.html`.


## Latest requested updates
- Panel portraits are no longer displayed. The Executive Panel now lists leadership, executive members, volunteer in-charges and department designations for session 2025–26.
- Mathletics is now a randomized 8-question arithmetic sprint with a 90-second timer and score feedback. It runs locally in the browser and does not send scores to a server.
- Added a College Website link in the footer.
- The Google Drive achievements item links to the provided file. The file contents could not be retrieved from the supplied Drive link in this editing session, so upload the achievements file here (or provide a direct-download/public-access link) if you want its actual awards/certificates displayed on the page.
