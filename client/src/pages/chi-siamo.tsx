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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="blog-title" data-testid="text-page-title">
            Chi <span className="highlight">Siamo</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            La nostra missione è ridare potere alla community cinematografica,
            rendendo accessibile qualsiasi film in sala.
          </p>
        </div>

        <section ref={missionRef} className="mission-section">
          <div className="mission-container" style={{gridTemplateColumns: '1fr'}}>
            {/* Content Column */}
            <div className="mission-content">
              <div className="mission-header">
                <span className="mission-badge">
                  <Star className="w-4 h-4" />
                  <span>La nostra mission</span>
                </span>
                <h2 className="mission-title-new">La nostra mission</h2>
              </div>

              <p className="mission-text">
                Koinity nasce dalla passione per il cinema e dalla convinzione che
                le persone dovrebbero poter scegliere cosa vedere sul grande schermo.
              </p>

              <p className="mission-text">
                Troppi film straordinari non raggiungono mai le sale italiane, 
                o vengono proiettati solo in poche città.
              </p>

              <div className="mission-highlight">
                La nostra piattaforma permette alla community di votare i film che desidera vedere in sala e, quando la domanda è sufficiente, coordiniamo proiezioni on-demand con i cinema locali.
              </div>

              {/* Key Points */}
              <div className="mission-points">
                <div className="point-item">
                  <div className="point-icon">
                    <Lightbulb className="w-5 h-5" />
                  </div>
                  <div className="point-text">
                    <strong>Democrazia cinematografica:</strong> Il pubblico sceglie cosa vedere
                  </div>
                </div>

                <div className="point-item">
                  <div className="point-icon">
                    <Users className="w-5 h-5" />
                  </div>
                  <div className="point-text">
                    <strong>Potere alla community:</strong> Non solo sconti, ma programmazione reale
                  </div>
                </div>

                <div className="point-item">
                  <div className="point-icon">
                    <Film className="w-5 h-5" />
                  </div>
                  <div className="point-text">
                    <strong>Cinema per tutti:</strong> Film straordinari accessibili ovunque
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="story-section">
          <h2 className="section-title">La nostra storia</h2>
          <p className="section-subtitle">
            Un viaggio che parte dalla passione e arriva nelle sale di tutta Italia
          </p>

          <div className="story-wrapper">
            <button className="story-nav story-nav-left" onClick={() => scroll('left')} data-testid="button-scroll-left">←</button>
            <button className="story-nav story-nav-right" onClick={() => scroll('right')} data-testid="button-scroll-right">→</button>

            <div className="story-container" ref={containerRef}>
              {/* Card 1: 2024 */}
              <div className="story-card">
                <span className="story-icon">🎬</span>
                <h3 className="story-year">2024</h3>
                <p className="story-label">L'Inizio</p>
                <p className="story-text">
                  Koinity nasce dall'idea di un gruppo di cinefili frustrati dall'impossibilità di vedere certi film in sala. Una domanda enorme per un'esperienza unica.
                </p>
              </div>

              {/* Card 2: Sviluppo */}
              <div className="story-card">
                <span className="story-icon">💡</span>
                <h3 className="story-year">2024</h3>
                <p className="story-label">Sviluppo</p>
                <p className="story-text">
                  Abbiamo deciso di costruire una piattaforma che potesse scalare questa idea, coordinando automaticamente con i cinema quando la domanda è sufficiente.
                </p>
              </div>

              {/* Card 3: Oggi */}
              <div className="story-card">
                <span className="story-icon">🚀</span>
                <h3 className="story-year">2025</h3>
                <p className="story-label">Oggi</p>
                <p className="story-text">
                  Koinity è quasi pronta per essere lanciata. Stiamo costruendo una soluzione personalizzata per l'utente e che allo stesso tempo possa risollevare il settore cinematografico.
                </p>
              </div>

              {/* Card 4: Futuro (CTA) */}
              <div className="story-card story-card-cta">
                <span className="story-icon">✨</span>
                <h3 className="story-year">?</h3>
                <p className="story-label">Il Futuro</p>
                <p className="story-text">
                  La prossima storia la scriviamo insieme. Unisciti e porta il cinema che ami nella tua città.
                </p>
                <Link href="/proponi">
                  <button className="cta-button" data-testid="button-join-us">Unisciti a Noi</button>
                </Link>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="timeline-progress">
              <div className="timeline-progress-fill" style={{ width: `${scrollProgress}%` }}></div>
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
                    <a href="https://linkedin.com" className="social-link" data-testid="link-alessandro-linkedin">🔗</a>
                    <a href="https://twitter.com" className="social-link" data-testid="link-alessandro-twitter">𝕏</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Member 2: Laura Bianchi */}
            <div className="team-card">
              <div className="team-card-inner">
                <div className="team-card-front">
                  <div className="team-avatar">
                    <span className="team-avatar-icon">👩‍💻</span>
                    <span className="team-badge">CTO</span>
                  </div>
                  <h3 className="team-name">Laura Bianchi</h3>
                  <p className="team-role">Co-Founder & CTO</p>
                  <p className="team-tagline">"La tecnologia al servizio dell'arte"</p>
                </div>
                <div className="team-card-back">
                  <p className="team-bio">
                    Ex ingegnere software in Silicon Valley, Laura ha portato la sua expertise tecnica per costruire una piattaforma scalabile e innovativa.
                  </p>
                  <div className="team-social">
                    <a href="https://linkedin.com" className="social-link" data-testid="link-laura-linkedin">🔗</a>
                    <a href="https://github.com" className="social-link" data-testid="link-laura-github">💻</a>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Member 3: Andrea Verdi */}
            <div className="team-card">
              <div className="team-card-inner">
                <div className="team-card-front">
                  <div className="team-avatar">
                    <span className="team-avatar-icon">🎬</span>
                    <span className="team-badge">CMO</span>
                  </div>
                  <h3 className="team-name">Andrea Verdi</h3>
                  <p className="team-role">Community Manager</p>
                  <p className="team-tagline">"Ogni film merita il suo pubblico"</p>
                </div>
                <div className="team-card-back">
                  <p className="team-bio">
                    Critico cinematografico e community builder, Andrea coltiva le relazioni con cinefili e sale cinematografiche in tutta Italia.
                  </p>
                  <div className="team-social">
                    <a href="https://instagram.com" className="social-link" data-testid="link-andrea-instagram">📷</a>
                    <a href="https://twitter.com" className="social-link" data-testid="link-andrea-twitter">𝕏</a>
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
