import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../data/translations";
import LanguageToggle from "../components/LanguageToggle";

export default function HomeScreen() {
  const { language, isHebrew } = useLanguage();
  const content = translations[language].home;
  const common = translations[language].common;

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
            <LanguageToggle />
          </div>

          <div className="logo">
            <div className="monkey-icon monkey-see">🙈</div>
            <div className="logo-text">{content.title}</div>
            <div className="monkey-icon monkey-hear">🙉</div>
          </div>
          
          <p className="subtitle">
            {content.subtitle}
          </p>
          
          <div className="main-actions">
            <Link to={createPageUrl("NewGame")} className="btn btn-primary">
              <span>🎮</span>
              {common.newGame}
            </Link>
            <Link to={createPageUrl("Instructions")} className="btn btn-secondary">
              <span>📖</span>
              {common.instructions}
            </Link>
          </div>
        </div>

        <div className="features-grid">
          <div className="glass-card feature-card slide-in">
            <div className="monkey-icon monkey-speak">🙊</div>
            <h3 className="feature-title">{content.features.pantomime.title}</h3>
            <p className="feature-desc">
              {content.features.pantomime.desc}
            </p>
          </div>
          
          <div className="glass-card feature-card slide-in">
            <div className="monkey-icon monkey-hear">🙉</div>
            <h3 className="feature-title">{content.features.hints.title}</h3>
            <p className="feature-desc">
              {content.features.hints.desc}
            </p>
          </div>
          
          <div className="glass-card feature-card slide-in">
            <div className="monkey-icon monkey-see">🙈</div>
            <h3 className="feature-title">{content.features.guessing.title}</h3>
            <p className="feature-desc">
              {content.features.guessing.desc}
            </p>
          </div>
        </div>

        <div className="glass-card stats-section">
          <h2 className="stats-title">
            {content.stats.title}
          </h2>
          
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">3+</div>
              <div className="stat-label">{common.players}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">15-60</div>
              <div className="stat-label">{content.stats.minutes}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">600+</div>
              <div className="stat-label">{content.stats.words}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">∞</div>
              <div className="stat-label">{content.stats.fun}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
