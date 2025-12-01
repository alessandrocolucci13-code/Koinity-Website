import { Card, CardContent } from "@/components/ui/card";
import { Heart, Target, Users } from "lucide-react";
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
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4" data-testid="text-page-title">
            Chi Siamo
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            La nostra missione è ridare potere alla community cinematografica,
            rendendo accessibile qualsiasi film in sala.
          </p>
        </div>

        <div ref={missionRef} className={`mission-card mb-12 p-12 rounded-2xl transition-all duration-300 ${visibleMission ? 'visible' : ''}`} style={{background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,214,0,0.05))', border: '1px solid rgba(255,214,0,0.3)'}}>
          <h2 className="mission-title font-serif mb-8 text-center">
            La nostra mission
          </h2>
          <p className="mission-paragraph text-muted-foreground">
            Koinity nasce dalla passione per il cinema e dalla convinzione che
            le persone dovrebbero poter scegliere cosa vedere sul grande
            schermo. Troppi film straordinari non raggiungono mai le sale
            italiane, o vengono proiettati solo in poche città.
          </p>
          <p className="mission-paragraph text-muted-foreground">
            La nostra piattaforma permette alla community di votare i film che
            desidera vedere in sala e, quando la domanda è sufficiente,
            coordiniamo proiezioni on-demand con i cinema locali. Non si tratta
            solo di sconti—anche se quelli aiutano—ma di restituire il potere
            di programmazione nelle mani degli spettatori.
          </p>
        </div>

        <div ref={valuesRef} className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 ${visibleValues ? '' : ''}`}>
          <div className={`value-card p-8 rounded-2xl transition-all duration-300 ${visibleValues ? 'visible' : ''}`} style={{background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)'}}>
            <div className="value-icon flex items-center justify-center mx-auto mb-4">
              <Heart className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-3">Passione</h3>
            <p className="text-sm text-muted-foreground">
              Crediamo nel potere del cinema di ispirare, emozionare e unire le
              persone.
            </p>
          </div>

          <div className={`value-card p-8 rounded-2xl transition-all duration-300 ${visibleValues ? 'visible' : ''}`} style={{background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)'}}>
            <div className="value-icon flex items-center justify-center mx-auto mb-4">
              <Target className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-3">Innovazione</h3>
            <p className="text-sm text-muted-foreground">
              Usiamo la tecnologia per rendere il cinema più accessibile e
              democratico.
            </p>
          </div>

          <div className={`value-card p-8 rounded-2xl transition-all duration-300 ${visibleValues ? 'visible' : ''}`} style={{background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)'}}>
            <div className="value-icon flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-primary" />
            </div>
            <h3 className="font-bold text-lg mb-3">Community</h3>
            <p className="text-sm text-muted-foreground">
              La forza della nostra piattaforma è nella sua community
              appassionata.
            </p>
          </div>
        </div>

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
                  Koinity sta crescendo in tutta Italia, portando film straordinari nelle sale e creando esperienze cinematografiche uniche guidate dalla community.
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
            {/* Team Member 1: Marco Rossi */}
            <div className="team-card">
              <div className="team-card-inner">
                <div className="team-card-front">
                  <div className="team-avatar">
                    <span className="team-avatar-icon">👨‍💻</span>
                    <span className="team-badge">CEO</span>
                  </div>
                  <h3 className="team-name">Marco Rossi</h3>
                  <p className="team-role">Co-Founder & CEO</p>
                  <p className="team-tagline">"Il cinema è democrazia"</p>
                </div>
                <div className="team-card-back">
                  <p className="team-bio">
                    Con 10+ anni di esperienza nel settore tech e una passione sfrenata per il cinema, Marco guida la visione strategica di Koinity.
                  </p>
                  <div className="team-social">
                    <a href="https://linkedin.com" className="social-link" data-testid="link-marco-linkedin">🔗</a>
                    <a href="https://twitter.com" className="social-link" data-testid="link-marco-twitter">𝕏</a>
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

        <Card>
          <CardContent className="p-8 md:p-12 text-center">
            <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4">
              Press Kit
            </h2>
            <p className="text-muted-foreground mb-6">
              Materiali per la stampa, loghi e informazioni sulla company.
            </p>
            <p className="text-sm text-muted-foreground">
              Per richieste stampa: press@koinity.it
            </p>
          </CardContent>
        </Card>
      </div>
      </div>
    </>
  );
}
