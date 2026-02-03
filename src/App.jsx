import { useState } from 'react';
import './App.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SpeedIcon from '@mui/icons-material/Speed';
import GroupIcon from '@mui/icons-material/Group';
import LocationOnIcon from '@mui/icons-material/LocationOn';

function App() {
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  // F1 Teams Data for 2026
  const f1Teams = [
    {
      id: 1,
      name: "Red Bull Racing",
      logo: "/logos/2025redbullracinglogowhite.avif",
      carImage: "/cars/2025redbullracingcarright.avif",
      primaryColor: "#0600EF",
      secondaryColor: "#1E41FF",
      country: "Austria",
      base: "Milton Keynes, UK",
      teamPrincipal: "Christian Horner",
      championships: 6,
      founded: 2005,
      carName: "RB22",
      engine: "Red Bull Powertrains",
      stats: {
        grandPrixEntered: 380,
        teamPoints: 7234,
        highestRaceFinish: "1 (x114)",
        podiums: 245,
        highestGridPosition: "1 (x92)",
        polePositions: 92,
        worldChampionships: 6
      },
      description: "Red Bull Racing is one of the most successful F1 teams of the modern era, known for their innovative designs and aggressive racing strategy. The team has dominated recent seasons with their aerodynamic excellence.",
      players: [
        { name: "Max Verstappen", image: "/players/maxVerstappen.webp" },
        { name: "Isack Hadjar", image: "/players/isackHadjar.avif" }
      ],
      drivers: [
        { name: "Max Verstappen", number: 1, nationality: "🇳🇱 Netherlands", championships: 3, podiums: 98 },
        { name: "Sergio Pérez", number: 11, nationality: "🇲🇽 Mexico", championships: 0, podiums: 39 }
      ],
      achievements: [
        "3 consecutive Constructor Championships (2022-2024)",
        "Most wins in a single season (21 in 2023)",
        "Fastest pit stop record holders"
      ]
    },
    {
      id: 2,
      name: "Ferrari",
      logo: "/logos/ferrariLogo.avif",
      carImage: "/cars/ferraricar.avif",
      primaryColor: "#DC0000",
      secondaryColor: "#FF2800",
      country: "Italy",
      base: "Maranello, Italy",
      teamPrincipal: "Frédéric Vasseur",
      championships: 16,
      founded: 1950,
      carName: "SF-26",
      engine: "Ferrari",
      stats: {
        grandPrixEntered: 1092,
        teamPoints: 9954,
        highestRaceFinish: "1 (x246)",
        podiums: 816,
        highestGridPosition: "1 (x252)",
        polePositions: 252,
        worldChampionships: 16
      },
      description: "Scuderia Ferrari is the most iconic and oldest team in Formula 1 history. Known as 'The Prancing Horse', Ferrari represents passion, speed, and Italian excellence. The team continues to chase glory with innovative technology.",
      players: [
        { name: "Charles Leclerc", image: "/players/charlesLeclerk.avif" },
        { name: "Lewis Hamilton", image: "/players/lewisHamilton.webp" }
      ],
      drivers: [
        { name: "Charles Leclerc", number: 16, nationality: "🇲🇨 Monaco", championships: 0, podiums: 32 },
        { name: "Lewis Hamilton", number: 44, nationality: "🇬🇧 Britain", championships: 7, podiums: 197 }
      ],
      achievements: [
        "Most Constructor Championships in history (16)",
        "Oldest and most successful F1 team",
        "Over 240 Grand Prix victories"
      ]
    },
    {
      id: 3,
      name: "Mercedes-AMG Petronas",
      logo: "/logos/2025mercedeslogowhite.avif",
      carImage: "/cars/2025mercedescarright.avif",
      primaryColor: "#00D2BE",
      secondaryColor: "#00A19C",
      country: "Germany",
      base: "Brackley, UK",
      teamPrincipal: "Toto Wolff",
      championships: 8,
      founded: 2010,
      carName: "W15",
      engine: "Mercedes",
      stats: {
        grandPrixEntered: 310,
        teamPoints: 7625,
        highestRaceFinish: "1 (x128)",
        podiums: 296,
        highestGridPosition: "1 (x136)",
        polePositions: 136,
        worldChampionships: 8
      },
      description: "Mercedes-AMG Petronas F1 Team dominated Formula 1 from 2014-2021 with unprecedented success. Known for their engineering excellence and 'Silver Arrows' legacy, they continue to be a formidable force on the grid.",
      players: [
        { name: "George Russell", image: "/players/georgeRussel.webp" },
        { name: "Andrea Kimi Antonelli", image: "/players/kimiAntonelli.webp" }
      ],
      drivers: [
        { name: "George Russell", number: 63, nationality: "🇬🇧 Britain", championships: 0, podiums: 12 },
        { name: "Andrea Kimi Antonelli", number: 12, nationality: "🇮🇹 Italy", championships: 0, podiums: 0 }
      ],
      achievements: [
        "8 consecutive Constructor Championships (2014-2021)",
        "Most dominant era in F1 history",
        "Hybrid engine pioneers"
      ]
    },
    {
      id: 4,
      name: "McLaren F1 Team",
      logo: "/logos/2025mclarenlogowhite.avif",
      carImage: "/cars/mclaren.avif",
      primaryColor: "#FF8700",
      secondaryColor: "#FF9E00",
      country: "Britain",
      base: "Woking, UK",
      teamPrincipal: "Andrea Stella",
      championships: 8,
      founded: 1966,
      carName: "MCL38",
      engine: "Mercedes",
      stats: {
        grandPrixEntered: 954,
        teamPoints: 6378,
        highestRaceFinish: "1 (x183)",
        podiums: 522,
        highestGridPosition: "1 (x158)",
        polePositions: 158,
        worldChampionships: 8
      },
      description: "McLaren is one of the most successful teams in F1 history with a rich heritage. Known for their iconic papaya orange livery and innovative spirit, McLaren is on a strong comeback journey.",
      players: [
        { name: "Lando Norris", image: "/players/landoNorris.avif" },
        { name: "Oscar Piastri", image: "/players/oscarPiastri.avif" }
      ],
      drivers: [
        { name: "Lando Norris", number: 4, nationality: "🇬🇧 Britain", championships: 0, podiums: 21 },
        { name: "Oscar Piastri", number: 81, nationality: "🇦🇺 Australia", championships: 0, podiums: 4 }
      ],
      achievements: [
        "8 Constructor Championships",
        "183 Grand Prix victories",
        "Strong 2024 comeback season"
      ]
    },
    {
      id: 5,
      name: "Aston Martin Aramco",
      logo: "/logos/2025astonmartinlogowhite.avif",
      carImage: "/cars/2025astonmartincarright.avif",
      primaryColor: "#006F62",
      secondaryColor: "#00352F",
      country: "Britain",
      base: "Silverstone, UK",
      teamPrincipal: "Mike Krack",
      championships: 0,
      founded: 2021,
      carName: "AMR26",
      engine: "Mercedes",
      stats: {
        grandPrixEntered: 89,
        teamPoints: 485,
        highestRaceFinish: "1 (x1)",
        podiums: 15,
        highestGridPosition: "1 (x1)",
        polePositions: 1,
        worldChampionships: 0
      },
      description: "Aston Martin represents British luxury and performance in F1. With significant investment and ambitious goals, the team is building a new state-of-the-art facility and targeting championship success.",
      players: [
        { name: "Fernando Alonso", image: "/players/ferdinandAlonso.avif" },
        { name: "Lance Stroll", image: "/players/lanceStroll.webp" }
      ],
      drivers: [
        { name: "Fernando Alonso", number: 14, nationality: "🇪🇸 Spain", championships: 2, podiums: 106 },
        { name: "Lance Stroll", number: 18, nationality: "🇨🇦 Canada", championships: 0, podiums: 3 }
      ],
      achievements: [
        "Best season finish: 5th (2023)",
        "8 podiums in 2023",
        "Rapid development trajectory"
      ]
    },
    {
      id: 6,
      name: "Alpine F1 Team",
      logo: "/logos/2025alpinelogowhite.avif",
      carImage: "/cars/2025alpinecarright.avif",
      primaryColor: "#0090FF",
      secondaryColor: "#FF00DC",
      country: "France",
      base: "Enstone, UK",
      teamPrincipal: "Oliver Oakes",
      championships: 2,
      founded: 2021,
      carName: "A526",
      engine: "Renault",
      stats: {
        grandPrixEntered: 89,
        teamPoints: 623,
        highestRaceFinish: "1 (x1)",
        podiums: 8,
        highestGridPosition: "1 (x0)",
        polePositions: 0,
        worldChampionships: 2
      },
      description: "Alpine F1 Team carries the legacy of Renault's F1 success. The French manufacturer is known for developing young talent and competitive midfield performances with their distinctive blue and pink livery.",
      players: [
        { name: "Pierre Gasly", image: "/players/2025alpinepiegas01right.avif" },
        { name: "Franco Colapinto", image: "/players/2025alpinefracol01right.avif" }
      ],
      drivers: [
        { name: "Pierre Gasly", number: 10, nationality: "🇫🇷 France", championships: 0, podiums: 4 },
        { name: "Jack Doohan", number: 7, nationality: "🇦🇺 Australia", championships: 0, podiums: 0 }
      ],
      achievements: [
        "2 Constructor Championships (as Renault)",
        "Strong engine development",
        "Excellent driver academy"
      ]
    }
  ];

  const handleCardClick = (team) => {
    setSelectedTeam(team);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setTimeout(() => setSelectedTeam(null), 300);
  };

  return (
    <div className="app-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <img src="/F1.svg.png" alt="Formula 1 Logo" className="f1-logo" />
          <h1 className="hero-title">FORMULA 1 TEAMS 2026</h1>
          <p className="hero-subtitle">Pinnacle of Motorsport Excellence</p>
          <Chip 
            icon={<SpeedIcon />} 
            label="6 Elite Teams • 12 World-Class Drivers" 
            sx={{ 
              fontSize: '1rem', 
              padding: '24px 18px',
              fontWeight: 600,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: '#ffffff',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              letterSpacing: '1px'
            }} 
          />
        </div>
      </section>

      {/* Teams Grid Section */}
      <section className="teams-section">
        <div className="container">
          <h2 className="section-title"><span className="section-title-prefix">F1</span> Teams</h2>
          <div className="row g-4">
            {f1Teams.map((team) => (
              <div key={team.id} className="col-lg-4 col-md-6 col-sm-12">
                <Card 
                  className="team-card"
                  data-team={team.name}
                  onClick={() => handleCardClick(team)}
                  sx={{ 
                    '--team-primary': team.primaryColor,
                    '--team-secondary': team.secondaryColor,
                  }}
                >
                  <div className="card-header">
                    {team.name}
                  </div>
                  <div className="team-logo">
                    <img src={team.logo} alt={`${team.name} Logo`} />
                  </div>
                  {team.carImage && (
                    <div className="team-car">
                      <img src={team.carImage} alt={`${team.name} Car`} />
                    </div>
                  )}
                  <CardContent>
                    <div className="text-center mb-3">
                      <Chip 
                        icon={<LocationOnIcon />}
                        label={team.country} 
                        size="small"
                        sx={{ 
                          mr: 1, 
                          mb: 1,
                          backgroundColor: 'rgba(255,255,255,0.05)',
                          color: 'rgba(255,255,255,0.7)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          fontWeight: 500,
                          fontSize: '0.85rem'
                        }} 
                      />
                      <Chip 
                        icon={<EmojiEventsIcon />}
                        label={`${team.championships} Titles`} 
                        size="small"
                        sx={{ 
                          mb: 1,
                          backgroundColor: 'rgba(255,255,255,0.05)',
                          color: 'rgba(255,255,255,0.7)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          fontWeight: 500,
                          fontSize: '0.85rem'
                        }} 
                      />
                    </div>
                    <div className="text-center">
                      <p style={{ color: 'rgba(255,255,255,0.5)', fontWeight: '500', marginBottom: '12px', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Drivers</p>
                      {team.drivers.map((driver, idx) => (
                        <Chip
                          key={idx}
                          avatar={
                            <Avatar sx={{ 
                              bgcolor: 'rgba(255,255,255,0.1)', 
                              color: '#ffffff', 
                              fontWeight: 'bold',
                              border: '1px solid rgba(255,255,255,0.2)'
                            }}>
                              {driver.number}
                            </Avatar>
                          }
                          label={driver.name}
                          className="driver-chip"
                          sx={{ 
                            backgroundColor: 'rgba(255,255,255,0.08)',
                            color: 'rgba(255,255,255,0.9)',
                            border: '1px solid rgba(255,255,255,0.15)',
                            fontWeight: 500
                          }}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detail Dialog/Modal */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { borderRadius: '20px' }
        }}
      >
        {selectedTeam && (
          <>
            <DialogTitle 
              sx={{ 
                background: `linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.9) 100%)`,
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: `2px solid ${selectedTeam.primaryColor}`
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <img 
                  src={selectedTeam.logo} 
                  alt={selectedTeam.name}
                  style={{ 
                    width: '60px', 
                    height: '60px', 
                    objectFit: 'contain',
                    filter: 'brightness(1.2)'
                  }} 
                />
                <div>
                  <div className="modal-title">{selectedTeam.name}</div>
                  <div style={{ fontSize: '0.85rem', opacity: 0.7, fontWeight: 400, letterSpacing: '1px' }}>
                    {selectedTeam.carName} • {selectedTeam.engine} Engine
                  </div>
                </div>
              </div>
              <IconButton onClick={handleCloseDialog} sx={{ color: 'rgba(255,255,255,0.7)' }}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            
            <DialogContent className="modal-body">
              {/* Team Summary */}
              <div className="info-section" style={{ marginBottom: '2rem' }}>
                <h3 className="info-title" style={{ color: selectedTeam.primaryColor, marginBottom: '1rem' }}>
                  Team Summary
                </h3>
                <p className="info-text" style={{ lineHeight: '1.8' }}>{selectedTeam.description}</p>
              </div>

              {/* Players (if available) */}
              {selectedTeam.players && selectedTeam.players.length > 0 && (
                <div className="players-section">
                  {selectedTeam.players.map((player) => (
                    <div className="player-card" key={player.name}>
                      <div className="player-image-wrapper">
                        <img src={player.image} alt={player.name} />
                      </div>
                      <div className="player-name">{player.name}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Team Statistics Grid */}
              <div className="stats-grid">
                <div className="stat-box">
                  <div className="stat-label">Grand Prix Entered</div>
                  <div className="stat-value" style={{ color: selectedTeam.primaryColor }}>
                    {selectedTeam.stats.grandPrixEntered}
                  </div>
                </div>
                
                <div className="stat-box">
                  <div className="stat-label">Team Points</div>
                  <div className="stat-value" style={{ color: selectedTeam.primaryColor }}>
                    {selectedTeam.stats.teamPoints}
                  </div>
                </div>
                
                <div className="stat-box">
                  <div className="stat-label">Highest Race Finish</div>
                  <div className="stat-value" style={{ color: selectedTeam.primaryColor }}>
                    {selectedTeam.stats.highestRaceFinish}
                  </div>
                </div>
                
                <div className="stat-box">
                  <div className="stat-label">Podiums</div>
                  <div className="stat-value" style={{ color: selectedTeam.primaryColor }}>
                    {selectedTeam.stats.podiums}
                  </div>
                </div>
                
                <div className="stat-box">
                  <div className="stat-label">Highest Grid Position</div>
                  <div className="stat-value" style={{ color: selectedTeam.primaryColor }}>
                    {selectedTeam.stats.highestGridPosition}
                  </div>
                </div>
                
                <div className="stat-box">
                  <div className="stat-label">Pole Positions</div>
                  <div className="stat-value" style={{ color: selectedTeam.primaryColor }}>
                    {selectedTeam.stats.polePositions}
                  </div>
                </div>
                
                <div className="stat-box">
                  <div className="stat-label">World Championships</div>
                  <div className="stat-value" style={{ color: selectedTeam.primaryColor }}>
                    {selectedTeam.stats.worldChampionships}
                  </div>
                </div>
              </div>
            </DialogContent>

            <DialogActions sx={{ padding: '24px 40px', background: '#0f0f0f', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <Button 
                onClick={handleCloseDialog} 
                variant="outlined"
                size="large"
                sx={{ 
                  borderColor: 'rgba(255,255,255,0.2)',
                  color: '#ffffff',
                  fontWeight: 600,
                  px: 5,
                  py: 1.5,
                  fontSize: '1rem',
                  letterSpacing: '1px',
                  '&:hover': {
                    borderColor: selectedTeam.primaryColor,
                    backgroundColor: 'rgba(255,255,255,0.05)'
                  }
                }}
              >
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
      
      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-inner">
          <span className="footer-text">
            Project crafted by <span className="footer-name">Anurag</span>
          </span>
          <a
            href="https://github.com/neecoteen24"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
          >
            github.com/neecoteen24
          </a>
        </div>
      </footer>
    </div>
  );
}

export default App;
