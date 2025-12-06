import { Card, CardContent } from "@/components/ui/card";
import { Heart, Target, Users, Film, Lightbulb, Star } from "lucide-react";
import { SEO } from "@/components/seo";
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";

export default function ChiSiamo() {
  const missionRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const teamGridRef = useRef<HTMLDivElement>(null);
  const [visibleMission, setVisibleMission] = useState(false);
  const [visibleValues, setVisibleValues] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (entry.target === missionRef.current) setVisibleMission(true);
          if (entry.target === valuesRef.current) setVisibleValues(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (missionRef.current) observer.observe(missionRef.current);
    if (valuesRef.current) observer.observe(valuesRef.current);

    return () => observer.disconnect();
  }, []);

  // Team cards animation
  useEffect(() => {
    const teamObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    const teamCards = teamGridRef.current?.querySelectorAll('.team-card');
    teamCards?.forEach((card) => teamObserver.observe(card));

    return () => teamObserver.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
        const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
        setScrollProgress(Math.min(progress, 100));
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = 420;
      containerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <SEO
        title="Chi Siamo"
        description="Scopri la missione di Koinity: rendere accessibile qualsiasi film in sala attraverso il potere della community. Scopri chi siamo e i nostri valori fondamentali."
      />
      <section className="chi-siamo-hero">
        <h1 className="hero-title" data-testid="text-page-title">
          Chi <span className="highlight">Siamo</span>
        </h1>
        <p className="hero-subtitle">
          La nostra missione è ridare potere alla community cinematografica,
          rendendo accessibile qualsiasi film in sala.
        </p>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">

        <section ref={missionRef} className="mission-section">
          <span className="section-badge">
            <Star className="w-4 h-4" />
            <span>La nostra mission</span>
          </span>
          <h2 className="mission-title">La nostra mission</h2>

          <p className="mission-text">
            Koinity nasce dalla passione per il cinema e dalla convinzione che
            le persone dovrebbero poter scegliere cosa vedere sul grande schermo.
          </p>

          <p className="mission-text">
            Troppi film straordinari non raggiungono mai le sale italiane, 
            o vengono proiettati solo in poche città.
          </p>

          <div className="mission-highlight">
            <div className="mission-highlight-text">
              La nostra piattaforma permette alla community di votare i film che desidera vedere in sala e, quando la domanda è sufficiente, coordiniamo proiezioni on-demand con i cinema locali.
            </div>
          </div>

          {/* Key Points */}
          <div className="mission-points">
            <div className="point-item">
              <div className="point-icon">
                <Lightbulb className="w-5 h-5" />
              </div>
              <div className="point-content">
                <div className="point-title">Democrazia cinematografica</div>
                <div className="point-description">Il pubblico sceglie cosa vedere</div>
              </div>
            </div>

            <div className="point-item">
              <div className="point-icon">
                <Users className="w-5 h-5" />
              </div>
              <div className="point-content">
                <div className="point-title">Potere alla community</div>
                <div className="point-description">Non solo sconti, ma programmazione reale</div>
              </div>
            </div>

            <div className="point-item">
              <div className="point-icon">
                <Film className="w-5 h-5" />
              </div>
              <div className="point-content">
                <div className="point-title">Cinema per tutti</div>
                <div className="point-description">Film straordinari accessibili ovunque</div>
              </div>
            </div>
          </div>
        </section>

        <section className="storia-section">
          <h2 className="storia-title">La nostra <span className="highlight">storia</span></h2>
          <p className="storia-subtitle">
            Un viaggio che parte dalla passione e arriva nelle sale di tutta Italia
          </p>

          <div className="timeline-grid">
            {/* Card 1: 2024 - L'Inizio */}
            <div className="timeline-card" data-testid="card-timeline-1">
              <div className="timeline-icon">🎬</div>
              <span className="timeline-year">2024</span>
              <p className="timeline-phase">L'Inizio</p>
              <p className="timeline-description">
                Koinity nasce dall'idea di un gruppo di cinefili frustrati dall'impossibilità di vedere certi film in sala. Una domanda enorme per un'esperienza unica.
              </p>
            </div>

            {/* Card 2: 2024 - Sviluppo */}
            <div className="timeline-card" data-testid="card-timeline-2">
              <div className="timeline-icon">💡</div>
              <span className="timeline-year">2024</span>
              <p className="timeline-phase">Sviluppo</p>
              <p className="timeline-description">
                Abbiamo deciso di costruire una piattaforma che potesse scalare questa idea, coordinando automaticamente con i cinema quando la domanda è sufficiente.
              </p>
            </div>

            {/* Card 3: 2025 - Oggi */}
            <div className="timeline-card" data-testid="card-timeline-3">
              <div className="timeline-icon">🚀</div>
              <span className="timeline-year">2025</span>
              <p className="timeline-phase">Oggi</p>
              <p className="timeline-description">
                Koinity è quasi pronta per essere lanciata. Stiamo costruendo una soluzione personalizzata per l'utente e che allo stesso tempo possa risollevare il settore cinematografico.
              </p>
            </div>
          </div>
        </section>

        <section className="team-section">
          <h2 className="section-title">Il team</h2>
          <p className="section-subtitle">
            Siamo un team appassionato di cinema, tecnologia e community building
          </p>

          <div className="team-grid" ref={teamGridRef}>
            {/* Team Member 1: Alessandro */}
            <div className="team-card">
              <div className="team-card-inner">
                <div className="team-card-front">
                  <div className="team-avatar">
                    <span className="team-avatar-icon">👨‍💻</span>
                    <span className="team-badge">CEO</span>
                  </div>
                  <h3 className="team-name">Alessandro</h3>
                  <p className="team-role">Co-Founder & CEO</p>
                  <p className="team-tagline">"Il cinema è democrazia"</p>
                </div>
                <div className="team-card-back">
                  <p className="team-bio">
                    Creativo del progetto, guida la strategia, la ricerca utenti e lo sviluppo del modello di business, con un forte orientamento Lean.
                  </p>
                  <div className="team-social">
                    <a href="https://www.linkedin.com/in/coluccialessandro/" className="social-link" data-testid="link-alessandro-linkedin">🔗</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Member 2: Lai */}
            <div className="team-card">
              <div className="team-card-inner">
                <div className="team-card-front">
                  <div className="team-avatar">
                    <span className="team-avatar-icon">👩‍💼</span>
                    <span className="team-badge">CMO</span>
                  </div>
                  <h3 className="team-name">Lai</h3>
                  <p className="team-role">Co-FOUNDER & CMO</p>
                  <p className="team-tagline">"Ogni film merita il suo pubblico"</p>
                </div>
                <div className="team-card-back">
                  <p className="team-bio">
                    Focalizzato sull'espansione del network e sulle partnership con cinema e community, porta un approccio analitico e orientato alla crescita.
                  </p>
                  <div className="team-social">
                    <a href="https://www.linkedin.com/in/glaihang/" className="social-link" data-testid="link-lai-linkedin">🔗</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Member 3: Christian */}
            <div className="team-card">
              <div className="team-card-inner">
                <div className="team-card-front">
                  <div className="team-avatar">
                    <span className="team-avatar-icon">👨‍💻</span>
                    <span className="team-badge">CTO</span>
                  </div>
                  <h3 className="team-name">Christian</h3>
                  <p className="team-role">Co-FOUNDER & CTO</p>
                  <p className="team-tagline">"La tecnologia al servizio dell'arte"</p>
                </div>
                <div className="team-card-back">
                  <p className="team-bio">
                    Sviluppatore con background in Intelligenza Artificiale, trasforma insight e feedback in soluzioni tecnologiche scalabili per la piattaforma.
                  </p>
                  <div className="team-social">
                    <a href="https://www.linkedin.com/in/christian-fiore-joseph/" className="social-link" data-testid="link-christian-linkedin">🔗</a>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        <section className="press-section">
          <div className="press-container-centered">
            <div className="press-content-centered">
              <h2 className="press-title">Press Kit</h2>
              <p className="press-subtitle">
                Materiali per la stampa, loghi e informazioni sulla company. 
                Per interviste, partnership o richieste media, contattaci.
              </p>

              <div className="press-contact">
                <div className="press-contact-icon">✉️</div>
                <div className="press-contact-info">
                  <p className="press-contact-label">Email Stampa</p>
                  <p className="press-contact-value">
                    <a href="mailto:press@koinity.it" data-testid="link-press-email">press@koinity.it</a>
                  </p>
                </div>
              </div>

              <div className="press-contact">
                <div className="press-contact-icon">📱</div>
                <div className="press-contact-info">
                  <p className="press-contact-label">Ufficio Stampa</p>
                  <p className="press-contact-value">
                    <a href="tel:+390123456789" data-testid="link-press-phone">+39 012 345 6789</a>
                  </p>
                </div>
              </div>

              <div className="press-stats">
                <div className="stat-item">
                  <div className="stat-number">50K+</div>
                  <div className="stat-label">Utenti</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">200+</div>
                  <div className="stat-label">Film Proiettati</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">30+</div>
                  <div className="stat-label">Città</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      </div>
    </>
  );
}
