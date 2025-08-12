# Preetam Roy — Portfolio

This is a responsive portfolio for Preetam Roy with a cyberpunk / game-dev themed hero:
- Animated, color-shifting particle background with mesh lines, parallax and shooting stars
- Dark / light theme toggle (persisted)
- Typing effect tagline
- Contact form integration (Formspree / formsubmit.co)
- Embedded ambient audio available during load, muted by default
- Loading screen with particle shimmer

## Run locally
1. Download the repo and open index.html in your browser (or serve with a simple static server).
2. Make sure assets/music/ambient.mp3 is present (embedded audio).

## Form (Contact)
This project includes a contact form that posts to Formspree. To enable:
1. Go to https://formspree.io and create an account (free plan) if you want form management and autoresponses.
2. Create a new form and note the Form ID / endpoint (e.g. https://formspree.io/f/abcdxyz).
3. Replace the action value in index.html form with your https://formspree.io/f/YOUR_FORM_ID.
4. In Formspree dashboard configure recipient email (set to preetamroy7@gmail.com) and set up the autoresponse message.

*Alternative quick demo* (no signup):
- Use FormSubmit:
  - Replace form action with https://formsubmit.co/preetamroy7@gmail.com
  - The first submission will ask to confirm your email, then it starts forwarding messages.

## Deploy to GitHub Pages
1. Create a repo named preetam-roy-portfolio (or use existing).
2. git init → add files → commit.
3. Add remote: git remote add origin https://github.com/<your-username>/preetam-roy-portfolio.git
4. Push: git branch -M main then git push -u origin main.
5. In GitHub repo settings → Pages → publish from main branch → / (root) → Save. Your site will be live at:
   https://<your-username>.github.io/preetam-roy-portfolio

## Notes
- To reduce CPU on low-end devices, reduce NUM in script.js (e.g., 50).
- Replace placeholder images / project links with your own.
- The embedded audio file increases repo size — remove it if you want a lighter repo.
