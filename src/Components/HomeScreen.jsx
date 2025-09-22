import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";

export default function HomeScreen() {
  const [language, setLanguage] = useState('hebrew');
  
  const isHebrew = language === 'hebrew';
  
  const content = {
    hebrew: {
      title: "ניקוקוד - NikkoCode",
      subtitle: "משחק מהנה ומרגש שמחבר בין חברים ומשפחה עם אתגרים יצירתיים ורגעי צחוק בלתי נגמרים",
      newGame: "משחק חדש",
      instructions: "הוראות המשחק",
      features: {
        pantomime: {
          title: "פנטומימה יצירתית",
          desc: "הקוף שלא מדבר מבצע פנטומימה מדהימה כדי להעביר את המילה לחברים בקבוצה"
        },
        hints: {
          title: "רמזים מילוליים",
          desc: "הקוף שלא שומע נותן רמזים מילוליים מבוססים על הפנטומימה שהוא רואה"
        },
        guessing: {
          title: "ניחושים מדויקים",
          desc: "הקוף שלא רואה צריך לנחש את המילה רק על בסיס הרמזים המילוליים שהוא שומע"
        }
      },
      stats: {
        title: "סטטיסטיקות המשחק"
      }
    },
    english: {
      title: "KofiCode",
      subtitle: "A fun and exciting game that connects friends and family with creative challenges and endless laughter",
      newGame: "New Game",
      instructions: "Game Instructions",
      features: {
        pantomime: {
          title: "Creative Pantomime",
          desc: "The monkey who doesn't speak performs amazing pantomime to convey the word to friends in the group"
        },
        hints: {
          title: "Verbal Hints",
          desc: "The monkey who doesn't hear gives verbal hints based on the pantomime he sees"
        },
        guessing: {
          title: "Accurate Guessing",
          desc: "The monkey who doesn't see needs to guess the word only based on the verbal hints he hears"
        }
      },
      stats: {
        title: "Game Statistics"
      }
    }
  };

  useEffect(() => {
    // Add smooth scroll behavior and animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Observe all slide-in elements
    document.querySelectorAll('.slide-in').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(40px)';
      el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      observer.observe(el);
    });

    // Button interactions
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('click', function() {
        // Add ripple effect
        const ripple = document.createElement('span');
        ripple.style.cssText = `
          position: absolute;
          border-radius: 50%;
          background: rgba(255,255,255,0.3);
          transform: scale(0);
          animation: ripple 0.6s linear;
          left: 50%;
          top: 50%;
          width: 20px;
          height: 20px;
          margin-left: -10px;
          margin-top: -10px;
        `;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
          ripple.remove();
        }, 600);
      });
    });

    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes ripple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="jungle-bg jungle-pattern" dir={isHebrew ? "rtl" : "ltr"}>
      <div className="floating-leaves">
        {/* Green Leaves */}
        <div className="leaf leaf-green leaf-1">🍃</div>
        <div className="leaf leaf-green leaf-2">🍃</div>
        <div className="leaf leaf-green leaf-3">🍃</div>
        <div className="leaf leaf-green leaf-4">🍃</div>
        <div className="leaf leaf-green leaf-5">🍃</div>
        
        {/* Brown/Autumn Leaves */}
        <div className="leaf leaf-brown leaf-6">🍂</div>
        <div className="leaf leaf-brown leaf-7">🍂</div>
        <div className="leaf leaf-brown leaf-8">🍂</div>
        <div className="leaf leaf-brown leaf-9">🍂</div>
        <div className="leaf leaf-brown leaf-10">🍂</div>
        
        {/* Special Leaf Varieties */}
        <div className="leaf leaf-special leaf-11">🌿</div>
        <div className="leaf leaf-special leaf-12">🌿</div>
        <div className="leaf leaf-special leaf-13">🌿</div>
        <div className="leaf leaf-special leaf-14">🌿</div>
        <div className="leaf leaf-special leaf-15">🌿</div>
        
        {/* Extra Mobile Leaves */}
        <div className="leaf leaf-mobile leaf-16">🍃</div>
        <div className="leaf leaf-mobile leaf-17">🍂</div>
        <div className="leaf leaf-mobile leaf-18">🌿</div>
        <div className="leaf leaf-mobile leaf-19">🍃</div>
        <div className="leaf leaf-mobile leaf-20">🍂</div>
      </div>

      <div className="home-container">
        <div className="hero-section">
          {/* Language Selection */}
          <div className="language-selector">
            <button
              onClick={() => setLanguage('hebrew')}
              className={`lang-btn ${language === 'hebrew' ? 'active' : ''}`}
            >
              עברית
            </button>
            <button
              onClick={() => setLanguage('english')}
              className={`lang-btn ${language === 'english' ? 'active' : ''}`}
            >
              English
            </button>
          </div>

          <div className="logo">
            <div className="monkey-icon monkey-see">🙈</div>
            <div className="logo-text">{content[language].title}</div>
            <div className="monkey-icon monkey-hear">🙉</div>
          </div>
          
          <p className="subtitle">
            {content[language].subtitle}
          </p>
          
          <div className="main-actions">
            <Link to={createPageUrl("NewGame")} className="btn btn-primary">
              <span>🎮</span>
              {content[language].newGame}
            </Link>
            <Link to={createPageUrl("Instructions")} className="btn btn-secondary">
              <span>📖</span>
              {content[language].instructions}
            </Link>
          </div>
        </div>

        <div className="features-grid">
          <div className="glass-card feature-card slide-in">
            <div className="monkey-icon monkey-speak">🙊</div>
            <h3 className="feature-title">{content[language].features.pantomime.title}</h3>
            <p className="feature-desc">
              {content[language].features.pantomime.desc}
            </p>
          </div>
          
          <div className="glass-card feature-card slide-in">
            <div className="monkey-icon monkey-hear">🙉</div>
            <h3 className="feature-title">{content[language].features.hints.title}</h3>
            <p className="feature-desc">
              {content[language].features.hints.desc}
            </p>
          </div>
          
          <div className="glass-card feature-card slide-in">
            <div className="monkey-icon monkey-see">🙈</div>
            <h3 className="feature-title">{content[language].features.guessing.title}</h3>
            <p className="feature-desc">
              {content[language].features.guessing.desc}
            </p>
          </div>
        </div>

        <div className="glass-card stats-section">
          <h2 className="stats-title">
            {content[language].stats.title}
          </h2>
          
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">3+</div>
              <div className="stat-label">{isHebrew ? 'שחקנים' : 'Players'}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">15-60</div>
              <div className="stat-label">{isHebrew ? 'דקות' : 'Minutes'}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">600+</div>
              <div className="stat-label">{isHebrew ? 'מילים' : 'Words'}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">∞</div>
              <div className="stat-label">{isHebrew ? 'הנאה' : 'Fun'}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
