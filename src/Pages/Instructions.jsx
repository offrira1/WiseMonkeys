import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../data/translations";
import LanguageToggle from "../Components/LanguageToggle";

export default function Instructions() {
  const { language, isHebrew } = useLanguage();
  const t = translations[language].instructions;
  const common = translations[language].common;

  return (
    <div className="instructions-page" dir={isHebrew ? "rtl" : "ltr"}>
      <div className="jungle-background">
        <div className="jungle-leaves"></div>
      </div>

      <div className="instructions-container">
        {/* Language Toggle */}
        <div className="language-toggle-container">
          <LanguageToggle />
        </div>

        {/* Game Overview */}
        <div className="game-card">
          <div className="game-card-content">
            <div className="instructions-section">
              <div className="section-title">
                📖 {t.whatIsGame}
              </div>
              <div className="instruction-text">
                <p>{t.gameDescription}</p>
                
                <p>{t.gameDescription2}</p>
                
                <p>{t.gameDescription3}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Game Objective */}
        <div className="game-card">
          <div className="game-card-content">
            <div className="instructions-section">
              <div className="section-title">
                🎯 {t.objective}
              </div>
              <div className="instruction-text">
                <p>{t.objectiveDescription}</p>
                
                <p>{t.objectiveDescription2}</p>
              </div>
            </div>
          </div>
        </div>

{/* Game Cards */}
<div className="game-card">
  <div className="game-card-content">
    <div className="instructions-section">
      <div className="section-title">🃏 {t.wordCards}</div>
      <div className="instruction-text">
        <p><strong>{t.wordCardsDescription}</strong></p>
        
        <div className="scoring-system" style={{marginTop: '20px'}}>
          <div className="scoring-title" style={{textAlign: 'center', marginBottom: '15px', fontWeight: 'bold', color: '#333'}}>
            🎯 {t.scoring}
          </div>
          
          {/* Success Cases */}
          <div className="success-section" style={{backgroundColor: '#f0f9ff', padding: '15px', borderRadius: '10px', marginBottom: '15px', border: '1px solid #bfdbfe'}}>
            <div className="section-header" style={{fontWeight: 'bold', color: '#065f46', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', direction: isHebrew ? 'rtl' : 'ltr'}}>
              <span>{t.success}</span>
              <span style={{backgroundColor: '#059669', color: 'white', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px'}}>✓</span>
            </div>
            
            <div className="scoring-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', direction: isHebrew ? 'rtl' : 'ltr'}}>
              <div className="scoring-item" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'white', padding: '12px', borderRadius: '8px', border: '1px solid #d1fae5', textAlign: 'center'}}>
                <div className="scoring-icon" style={{backgroundColor: '#059669', color: 'white', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '16px', marginBottom: '8px'}}>1</div>
                <div className="scoring-label" style={{fontSize: '14px', marginBottom: '4px'}}>{t.oneHint}</div>
                <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                  <div className="scoring-points" style={{fontSize: '18px', fontWeight: 'bold', color: '#059669'}}>3+</div>
                  <span style={{fontSize: '12px', color: '#666'}}>{common.steps}</span>
                </div>
              </div>
              
              <div className="scoring-item" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'white', padding: '12px', borderRadius: '8px', border: '1px solid #d1fae5', textAlign: 'center'}}>
                <div className="scoring-icon" style={{backgroundColor: '#10b981', color: 'white', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '16px', marginBottom: '8px'}}>2</div>
                <div className="scoring-label" style={{fontSize: '14px', marginBottom: '4px'}}>{t.twoHints}</div>
                <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                  <div className="scoring-points" style={{fontSize: '18px', fontWeight: 'bold', color: '#10b981'}}>2+</div>
                  <span style={{fontSize: '12px', color: '#666'}}>{common.steps}</span>
                </div>
              </div>
              
              <div className="scoring-item" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'white', padding: '12px', borderRadius: '8px', border: '1px solid #d1fae5', textAlign: 'center'}}>
                <div className="scoring-icon" style={{backgroundColor: '#34d399', color: 'white', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '16px', marginBottom: '8px'}}>3</div>
                <div className="scoring-label" style={{fontSize: '14px', marginBottom: '4px'}}>{t.threeHints}</div>
                <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                  <div className="scoring-points" style={{fontSize: '18px', fontWeight: 'bold', color: '#34d399'}}>1+</div>
                  <span style={{fontSize: '12px', color: '#666'}}>{common.steps}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Neutral Case */}
          <div className="neutral-section" style={{backgroundColor: '#fffbeb', padding: '15px', borderRadius: '10px', marginBottom: '15px', border: '1px solid #fed7aa'}}>
            <div className="scoring-item" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', padding: '12px', borderRadius: '8px', border: '1px solid #fde68a', direction: isHebrew ? 'rtl' : 'ltr'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                <div className="scoring-label">{t.fourHints}</div>
                <div className="scoring-icon" style={{backgroundColor: '#f59e0b', color: 'white', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px'}}>4</div>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                <span style={{fontSize: '12px', color: '#666'}}>{isHebrew ? 'הקבוצה לא מתקדמת' : 'Team does not advance'}</span>
                <div className="scoring-points" style={{fontSize: '20px', fontWeight: 'bold', color: '#f59e0b'}}>0</div>
              </div>
            </div>
          </div>
          
          {/* Failure Cases */}
          <div className="failure-section" style={{backgroundColor: '#fef2f2', padding: '15px', borderRadius: '10px', marginBottom: '15px', border: '1px solid #fecaca'}}>
            <div className="section-header" style={{fontWeight: 'bold', color: '#dc2626', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', direction: isHebrew ? 'rtl' : 'ltr'}}>
              <span>{t.failureOrSkip}</span>
              <span style={{backgroundColor: '#dc2626', color: 'white', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px'}}>✗</span>
            </div>
            
            <div className="scoring-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', direction: isHebrew ? 'rtl' : 'ltr'}}>
              <div className="scoring-item" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', padding: '12px', borderRadius: '8px', border: '1px solid #fecaca', direction: isHebrew ? 'rtl' : 'ltr'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                  <div className="scoring-label">{t.fiveHints}</div>
                  <div className="scoring-icon" style={{backgroundColor: '#ef4444', color: 'white', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px'}}>5</div>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                  <span style={{fontSize: '12px', color: '#666'}}>{t.stepBack}</span>
                  <div className="scoring-points" style={{fontSize: '20px', fontWeight: 'bold', color: '#ef4444'}}>1-</div>
                </div>
              </div>
              
              <div className="scoring-item" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', padding: '12px', borderRadius: '8px', border: '1px solid #fecaca', direction: isHebrew ? 'rtl' : 'ltr'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                  <div className="scoring-label">{t.skipCard}</div>
                  <div className="scoring-icon" style={{backgroundColor: '#dc2626', color: 'white', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px'}}>⏭</div>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                  <span style={{fontSize: '12px', color: '#666'}}>{t.stepBack}</span>
                  <div className="scoring-points" style={{fontSize: '20px', fontWeight: 'bold', color: '#dc2626'}}>1-</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Tip */}
          <div className="tip-section" style={{backgroundColor: '#f9fafb', padding: '15px', borderRadius: '10px', border: '1px solid #e5e7eb', direction: isHebrew ? 'rtl' : 'ltr'}}>
            <div style={{fontWeight: 'bold', color: '#374151', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px'}}>
              <span>{t.remember}</span>
              <span>💡</span>
            </div>
            <p style={{fontSize: '14px', color: '#6b7280', margin: '0'}}>
              {t.scoringTip}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

        {/* Roles Explanation */}
        <div className="game-card">
          <div className="game-card-content">
            <div className="section-title">
              👥 {t.roles}
            </div>
            <div className="instruction-text">
              <p><strong>{t.rolesDescription}</strong></p>
            </div>
            <div className="roles-section">
              <div className="role-card">
                <div className="role-monkey monkey-speak">🙊</div>
                <div className="role-info">
                  <div className="role-title">{t.monkeySpeak}</div>
                  <div className="role-desc">{t.monkeySpeakDesc}</div>
                </div>
              </div>
              
              <div className="role-card">
                <div className="role-monkey monkey-hear">🙉</div>
                <div className="role-info">
                  <div className="role-title">{t.monkeyHear}</div>
                  <div className="role-desc">{t.monkeyHearDesc}</div>
                </div>
              </div>
              
              <div className="role-card">
                <div className="role-monkey monkey-see">🙈</div>
                <div className="role-info">
                  <div className="role-title">{t.monkeySee}</div>
                  <div className="role-desc">{t.monkeySeeDesc}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Game Rules - Restrictions */}
        <div className="game-card">
          <div className="game-card-content">
            <div className="instructions-section">
              <div className="section-title">
                🚫 {t.restrictions}
              </div>
              <div className="instruction-text">
                <p><strong>{t.monkeySpeak}:</strong> {t.monkeySpeakRestrictions}</p>
                
                <p><strong>{t.monkeyHear}:</strong> {t.monkeyHearRestrictions}</p>
                
                <p><strong>{t.monkeySee}:</strong> {t.monkeySeeRestrictions}</p>
                
                <p><strong>{isHebrew ? 'כל הקופים' : 'All monkeys'}:</strong> {t.allRestrictions}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Game Board */}
        <div className="game-card">
          <div className="game-card-content">
            <div className="instructions-section">
              <div className="section-title">
                🎲 {t.board}
              </div>
              <div className="instruction-text">
                <p>{t.boardDescription}</p>
                
                <p><strong>{t.specialSquares}</strong></p>
                <p>⏳ <strong>{isHebrew ? 'זמן כפול' : 'Double Time'}</strong> – {t.doubleTime}</p>
                <p>🍌 <strong>{isHebrew ? 'קלף בננה' : 'Banana Card'}</strong> – {t.bananaCard}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Banana Cards Examples */}
        <div className="game-card">
          <div className="game-card-content">
            <div className="instructions-section">
              <div className="section-title">
                🍌 {t.bananaCards}
              </div>
              <div className="instruction-text">
                <p>"{t.bananaExample1}" 🙊</p>
                <p>"{t.bananaExample2}" 🙈</p>
              </div>
            </div>
          </div>
        </div>

        {/* Time Rules */}
        <div className="game-card">
          <div className="game-card-content">
            <div className="instructions-section">
              <div className="section-title">
                ⏱️ {t.timeRules}
              </div>
              <div className="instruction-text">
                <p>{t.timeDescription}</p>
                <p>{t.doubleTimeDescription}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Game Versions */}
        <div className="game-card">
          <div className="game-card-content">
            <div className="instructions-section">
              <div className="section-title">
                🐵 {t.gameVersions}
              </div>
              <div className="instruction-text">
                <p><strong>{t.classicVersion}</strong></p>
                <p>{t.classicDescription}</p>
                
                <p><strong>{t.cooperativeVersion}</strong></p>
                <p>{t.cooperativeDescription}</p>
                
                <p><strong>{t.extendedVersion}</strong></p>
                <p>{t.extendedDescription}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Examples */}
        <div className="game-card">
          <div className="game-card-content">
            <div className="instructions-section">
              <div className="section-title">
                🧩 {t.examples}
              </div>
              <div className="instruction-text">
                <p><strong>{isHebrew ? 'קלף מילה' : 'Word card'}: "{t.example1.word}"</strong></p>
                <p>🙊 {t.monkeySpeak} - {t.example1.mime}</p>
                <p>🙉 {t.monkeyHear} - {isHebrew ? 'אומר' : 'says'} "{t.example1.hint}".</p>
                <p>🙈 {t.monkeySee} - {isHebrew ? 'אומר' : 'says'} "{t.example1.guess}".</p>
                <p>{t.example1.result}</p>
                
                <p><strong>{isHebrew ? 'קלף' : 'Card'}: "{t.example2.word}"</strong></p>
                <p>🙊 {t.monkeySpeak} - {t.example2.mime1}</p>
                <p>🙉 {t.monkeyHear} - {isHebrew ? 'אומר' : 'says'} "{t.example2.hint1}".</p>
                <p>🙈 {t.monkeySee} - {t.example2.guess1}</p>
                <p>🙊 {t.monkeySpeak} - {t.example2.mime2}</p>
                <p>🙉 {t.monkeyHear} - {t.example2.hint2}</p>
                <p>🙊 {t.monkeySpeak} - {t.example2.mime3}</p>
                <p>🙉 {t.monkeyHear} - {t.example2.hint3}</p>
                <p>🙊 {t.monkeySpeak} - {t.example2.mime4}</p>
                <p>{t.example2.result}</p>
                
                <p><strong>{isHebrew ? 'קלף' : 'Card'}: "{t.example3.word}"</strong></p>
                <p>🙊 {t.monkeySpeak} - {t.example3.mime}</p>
                <p>🙉 {t.monkeyHear} - {t.example3.hint}</p>
                <p>🙈 {t.monkeySee} - {t.example3.guess}</p>
                <p>{t.example3.result}</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="game-card">
          <div className="game-card-content">
            <div className="instructions-section">
              <div className="section-title">
                ❓ {t.faq}
              </div>
              <div className="instruction-text">
                <p><strong>{isHebrew ? 'ש:' : 'Q:'}</strong> {t.faq1.q}</p>
                <p><strong>{isHebrew ? 'ת:' : 'A:'}</strong> {t.faq1.a}</p>
                
                <p><strong>{isHebrew ? 'ש:' : 'Q:'}</strong> {t.faq2.q}</p>
                <p><strong>{isHebrew ? 'ת:' : 'A:'}</strong> {t.faq2.a}</p>
                
                <p><strong>{isHebrew ? 'ש:' : 'Q:'}</strong> {t.faq3.q}</p>
                <p><strong>{isHebrew ? 'ת:' : 'A:'}</strong> {t.faq3.a}</p>
                
                <p><strong>{isHebrew ? 'ש:' : 'Q:'}</strong> {t.faq4.q}</p>
                <p><strong>{isHebrew ? 'ת:' : 'A:'}</strong> {t.faq4.a}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Game End */}
        <div className="game-card">
          <div className="game-card-content">
            <div className="instructions-section">
              <div className="section-title">
                🏆 {t.gameEnd}
              </div>
              <div className="instruction-text">
                <p><strong>{isHebrew ? 'גרסה קבוצתית' : 'Team Version'}</strong> – {t.teamVersion}</p>
                <p><strong>{isHebrew ? 'גרסה שיתופית' : 'Cooperative Version'}</strong> – {t.cooperativeVersionEnd}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="game-card">
          <div className="game-card-content">
            <div className="tips-section">
              <div className="section-title">
                💡 {t.tips}
              </div>
              <ul className="tips-list">
                <li>{t.tip1}</li>
                <li>{t.tip2}</li>
                <li>{t.tip3}</li>
                <li>{t.tip4}</li>
                <li>{t.tip5}</li>
                <li>{t.tip6}</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="game-card">
          <div className="game-card-content">
            <Link to={createPageUrl("NewGame")} className="game-button">
              <span>🎮</span>
              <span>{t.startPlaying}</span>
            </Link>
            
            <Link to={createPageUrl("Home")} className="game-button secondary-button">
              <span>🏠</span>
              <span>{t.backToHome}</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}