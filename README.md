## Formula 1 Teams Showcase (React + Vite)

This project is a single‑page Formula 1 teams showcase built with React and Vite. It presents 2026 F1 teams with their logos, cars, key statistics, and drivers in a clean, modern interface.

I treated this as a practical assignment: starting from the basic React + Vite template, I turned it into a small but polished F1 mini‑site using Bootstrap for layout and Material UI for ready‑made components.

---

## 1. Project Overview

- **Tech stack**: React, Vite, JavaScript (ES6+)
- **Styling**: Custom CSS, Bootstrap utility/grid classes, Material UI components
- **Assets**:
	- Team logos: `public/logos`
	- Car images: `public/cars`
	- Driver images: `public/players`
	- F1 fonts: `public/f1fonts`
	- F1 logo: `public/F1.svg.png`

The main page consists of:

- A full‑width **hero section** with the F1 logo and title
- A **grid of team cards** (one card per team)
- A **modal dialog** that opens when a card is clicked, showing a summary, statistics grid, and driver images for that team

---

## 2. How to Run the Project

From the `Exp2` folder:

```bash
cd Exp2
npm install
npm run dev
```

Then open the URL printed in the terminal (usually `http://localhost:5173`).

---

## 3. Implementation Approach

### 3.1 Data‑driven design

Instead of hard‑coding markup for each team, I created a single data structure in [src/App.jsx](src/App.jsx) and render the UI by mapping over it:

```jsx
const f1Teams = [
	{
		id: 1,
		name: "Red Bull Racing",
		logo: "/logos/2025redbullracinglogowhite.avif",
		carImage: "/cars/2025redbullracingcarright.avif",
		country: "Austria",
		base: "Milton Keynes, United Kingdom",
		teamPrincipal: "Christian Horner",
		carName: "RB20",
		engine: "Honda RBPT",
		stats: {
			grandPrixEntered: 358,
			teamPoints: 698,
			highestRaceFinish: "1st",
			podiums: 250,
			highestGridPosition: "1st",
			polePositions: 95,
			worldChampionships: 7,
		},
		players: [
			{ name: "Max Verstappen", image: "/players/maxVerstappen.webp" },
			{ name: "Isack Hadjar", image: "/players/isackHadjar.avif" },
		],
	},
	// ...other teams
];
```

This makes it easy to:

- Change team data in one place
- Reuse the same layout for all teams
- Add extra information like stats and players without touching the JSX structure too much

### 3.2 Rendering the team cards

Each team is rendered as a Material UI `Card`, arranged using Bootstrap’s grid system:

```jsx
<section className="teams-section">
	<div className="container">
		<h2 className="section-title">
			<span className="section-title-prefix">F1</span> Teams
		</h2>

		<div className="row g-4">
			{f1Teams.map((team) => (
				<div key={team.id} className="col-lg-4 col-md-6 col-sm-12">
					<Card
						className="team-card"
						data-team={team.name}
						onClick={() => handleCardClick(team)}
						sx={{
							"--team-primary": team.primaryColor,
							"--team-secondary": team.secondaryColor,
						}}
					>
						<div className="card-header">
							<img src={team.logo} alt={team.name} className="team-logo" />
							{team.carImage && (
								<div className="team-car">
									<img src={team.carImage} alt={`${team.name} car`} />
								</div>
							)}
						</div>
						{/* ...CardContent with chips and basic info... */}
					</Card>
				</div>
			))}
		</div>
	</div>
	{/* Dialog component is below */}
	{selectedTeam && (
		<Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
			{/* ...modal content... */}
		</Dialog>
	)}
  
</section>
```

The combination of Bootstrap classes (`row`, `col-lg-4`, etc.) and Material UI `Card` gives me a responsive layout with minimal custom logic.

### 3.3 Hero section and F1 fonts

At the top of [src/App.jsx](src/App.jsx), I import the main CSS file. In [src/App.css](src/App.css) I define custom `@font-face` rules that load the F1 fonts directly from `public/f1fonts`:

```css
@font-face {
	font-family: "F1 Regular";
	src: url("/f1fonts/2018/Formula1-Regular.ttf") format("truetype");
}

@font-face {
	font-family: "F1 Bold";
	src: url("/f1fonts/2018/Formula1-Bold.ttf") format("truetype");
}
```

Then I apply these fonts to the hero and headings for a more authentic F1 look:

```css
.hero-title {
	font-family: "F1 Bold", "F1 Regular", system-ui, sans-serif;
	letter-spacing: 0.2em;
}

.section-title {
	font-family: "F1 Bold", "F1 Regular", system-ui, sans-serif;
}

.section-title-prefix {
	font-family: "F1 Bold", "F1 Regular", sans-serif;
	color: #dc0000; /* F1 red accent */
}
```

The hero section uses a full‑width dark gradient background, the F1 logo image `F1.svg.png`, and a subtitle to introduce the page.

### 3.4 Modal with team summary, drivers, and stats

When a user clicks on a team card, I store that team in `selectedTeam` state and open a Material UI `Dialog`. Inside the dialog I only show clean, relevant information:

```jsx
<Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
	<DialogTitle>
		<div className="modal-title-wrapper">
			<img src={selectedTeam.logo} alt={selectedTeam.name} className="modal-logo" />
			<div className="modal-title-text">
				<h2 className="modal-title">{selectedTeam.name}</h2>
				<p className="modal-subtitle">
					{selectedTeam.carName} • {selectedTeam.engine}
				</p>
			</div>
		</div>
	</DialogTitle>
	<DialogContent dividers>
		<section className="info-section">
			<h3 className="info-title">Team Summary</h3>
			<p className="info-text">{selectedTeam.description}</p>
		</section>

		{selectedTeam.players && (
			<section className="players-section">
				{selectedTeam.players.map((player) => (
					<div key={player.name} className="player-card">
						<div className="player-image-wrapper">
							<img src={player.image} alt={player.name} />
						</div>
						<div className="player-name">{player.name}</div>
					</div>
				))}
			</section>
		)}

		<section className="stats-section">
			<h3 className="info-title">Team Statistics</h3>
			<div className="stats-grid">
				<div className="stat-box">
					<span className="stat-label">Grand Prix Entered</span>
					<span className="stat-value">{selectedTeam.stats.grandPrixEntered}</span>
				</div>
				{/* ...other stat boxes... */}
			</div>
		</section>
	</DialogContent>
	<DialogActions>
		<Button onClick={handleCloseDialog} variant="contained" color="primary">
			Close
		</Button>
	</DialogActions>
</Dialog>
```

The modal is intentionally minimal and professional: no emojis, just text, images, and stats.

---

## 4. Styling and Theming

Most of the custom styling is defined in [src/App.css](src/App.css).

### 4.1 Team card gradients and hover effects

I wanted each team card to feel like its own theme. I use CSS variables set from React (`--team-primary` and `--team-secondary`) and team‑specific selectors:

```css
.team-card {
	background: radial-gradient(circle at top left, #181818, #050509);
	border-radius: 18px;
	overflow: hidden;
	cursor: pointer;
	transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.team-card:hover {
	transform: translateY(-6px);
	box-shadow: 0 18px 40px rgba(0, 0, 0, 0.7);
}

.team-card[data-team="Red Bull Racing"] {
	background: radial-gradient(circle at top left, #1a2250, #020310);
}

.team-card[data-team="Ferrari"] {
	background: radial-gradient(circle at top left, #300000, #050000);
}
```

Car images are shown in a horizontal strip, and logos are slightly color‑matched using filters and gradients so that the originally white assets blend into the dark theme.

### 4.2 Cropping player images to show only the top half

Driver images live in `public/players`. I wanted only the top half of each driver to be visible in the modal, so I used a wrapper with `overflow: hidden` and `object-fit: cover`:

```css
.player-image-wrapper {
	width: 100%;
	aspect-ratio: 3 / 4;
	overflow: hidden;
	border-radius: 12px;
}

.player-image-wrapper img {
	width: 100%;
	height: 100%;
	object-fit: cover;
	object-position: top;
}
```

---

## 5. Why I Used Bootstrap and Material UI

As a student, I had two main goals: keep the code understandable and avoid reinventing common UI components.

### 5.1 Bootstrap (for layout and basic responsiveness)

I used **Bootstrap** mainly for:

- **Grid system**: `container`, `row`, and `col-*` classes let me quickly make a responsive layout without writing custom flexbox or CSS grid from scratch.
- **Spacing utilities**: classes like `g-4` give me consistent gaps between cards.

Example in my JSX:

```jsx
<div className="container">
	<div className="row g-4">
		<div className="col-lg-4 col-md-6 col-sm-12">
			{/* Material UI Card here */}
		</div>
	</div>
</div>
```

Using Bootstrap here keeps the layout code short and readable, and it automatically adjusts the number of cards per row based on screen size.

### 5.2 Material UI (for cards, dialog, and chips)

I used **Material UI (MUI)** because it provides well‑designed, accessible React components out of the box. In this project I mainly used:

- `Card` and `CardContent` for the team cards
- `Dialog`, `DialogTitle`, `DialogContent`, `DialogActions` for the modal
- `Button` and `Chip` for interactive elements and tags

Example:

```jsx
import { Card, CardContent, Dialog, DialogTitle, DialogContent, DialogActions, Button, Chip } from "@mui/material";

// ...inside the component
<Card className="team-card" onClick={() => handleCardClick(team)}>
	<CardContent>
		<Chip label={team.country} size="small" />
		<Chip label={`${team.championships} Championships`} size="small" />
	</CardContent>
</Card>
```

Using MUI helped me keep the JSX concise while still getting:

- Consistent padding and typography inside cards
- A nice modal with keyboard accessibility and animations already handled
- Reusable components (for example, the same `Button` style in the modal footer)

Overall, Bootstrap handles **layout and responsiveness**, while Material UI handles **component styling and behavior**. I combined them with custom CSS to achieve the F1‑themed design.

---

## 6. Screenshots / Demo (if applicable)

If I submit this as a practical file, I can include screenshots such as:

- Hero section: `./screenshots/hero.png`
- Teams grid: `./screenshots/teams-grid.png`
- Team modal: `./screenshots/team-modal.png`

These are not required for the code to run, but they help demonstrate the final UI.

---

## 7. Summary

In this assignment I:

- Started from a plain React + Vite template
- Added structured F1 team data (logos, cars, stats, drivers)
- Used Bootstrap for layout and Material UI for components
- Customized the design heavily with CSS and F1 fonts
- Focused on keeping the code simple, readable, and close to what a student would produce while still looking professional

This README documents my approach, design decisions, and how to run and understand the project.
