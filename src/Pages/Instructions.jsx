import React from "react";
import { Link } from "react-router-dom";
import { createPageUrl } from "../utils";

export default function Instructions() {
  return (
    <div className="instructions-page" dir="rtl">
      <div className="jungle-background">
        <div className="jungle-leaves"></div>
      </div>

      <div className="instructions-container">

        {/* Game Overview */}
        <div className="game-card">
          <div className="game-card-content">
            <div className="instructions-section">
              <div className="section-title">
                📖 מה המשחק?
              </div>
              <div className="instruction-text">
                <p>שלושת הקופים הוא משחק קבוצתי מהנה שמבוסס על האמרה המפורסמת <span className="highlight">"לא ראיתי - לא שמעתי - לא דיברתי"</span>.</p>
                
                <p>בכל סיבוב, שלושה שחקנים מכל קבוצה מקבלים תפקידים שונים ועובדים יחד כדי לנחש כמה שיותר מילים תוך זמן מוגבל.</p>
                
                <p>המטרה היא להשיג את הניקוד הגבוה ביותר על ידי עבודת צוות מושלמת בין השחקנים!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Roles Explanation */}
        <div className="game-card">
          <div className="game-card-content">
            <div className="section-title">
              🎭 התפקידים במשחק
            </div>
            <div className="roles-section">
              <div className="role-card">
                <div className="role-monkey monkey-speak">🙊</div>
                <div className="role-info">
                  <div className="role-title">קוף שלא מדבר</div>
                  <div className="role-desc">רואה את המילה ומציג אותה בפנטומימה בלבד. אסור לו לדבר או להשמיע קולות!</div>
                </div>
              </div>
              
              <div className="role-card">
                <div className="role-monkey monkey-hear">🙉</div>
                <div className="role-info">
                  <div className="role-title">קוף שלא שומע</div>
                  <div className="role-desc">רואה את הפנטומימה ונותן רמזים מילוליים למנחש. הוא לא יכול לשמוע את המילה המקורית!</div>
                </div>
              </div>
              
              <div className="role-card">
                <div className="role-monkey monkey-see">🙈</div>
                <div className="role-info">
                  <div className="role-title">קוף שלא רואה</div>
                  <div className="role-desc">לא רואה את המילה ולא את הפנטומימה. מנחש את המילה רק על בסיס הרמזים המילוליים!</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* How to Play */}
        <div className="game-card">
          <div className="game-card-content">
            <div className="instructions-section">
              <div className="section-title">
                🎯 איך משחקים?
              </div>
              <div className="instruction-text">
                <p><strong>1. הכנה:</strong> חלקו לקבוצות של 3-6 שחקנים. כל קבוצה בוחרת שם.</p>
                
                <p><strong>2. תפקידים:</strong> בכל סיבוב, 3 שחקנים מהקבוצה מקבלים את התפקידים השונים.</p>
                
                <p><strong>3. המשחק:</strong> הקוף שלא מדבר רואה מילה ומציג אותה בפנטומימה. הקוף שלא שומע רואה את הפנטומימה ונותן רמזים מילוליים. הקוף שלא רואה מנחש!</p>
                
                <p><strong>4. הניקוד:</strong> על כל מילה שנוחשה נכון מקבלים +1 נקודה. על כל דילוג מפסידים -1 נקודה.</p>
                
                <p><strong>5. ניצחון:</strong> הקבוצה עם הניקוד הגבוה ביותר בסוף המשחק מנצחת!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scoring System */}
        <div className="game-card">
          <div className="game-card-content">
            <div className="scoring-section">
              <div className="section-title">
                🏆 מערכת הניקוד
              </div>
              <div className="scoring-grid">
                <div className="scoring-item">
                  <div className="scoring-icon">✅</div>
                  <div className="scoring-points correct-points">+1</div>
                  <div className="scoring-label">ניחוש נכון</div>
                </div>
                <div className="scoring-item">
                  <div className="scoring-icon">❌</div>
                  <div className="scoring-points skip-points">-1</div>
                  <div className="scoring-label">דילוג על מילה</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="game-card">
          <div className="game-card-content">
            <div className="tips-section">
              <div className="section-title">
                💡 טיפים למשחק מוצלח
              </div>
              <ul className="tips-list">
                <li>הקוף שלא מדבר - השתמש בפנטומימה ברורה ויצירתית</li>
                <li>הקוף שלא שומע - תן רמזים ברורים ומדויקים</li>
                <li>הקוף שלא רואה - הקשב בזהירות לכל רמז</li>
                <li>עבדו כקבוצה - תקשורת טובה היא המפתח לניצחון</li>
                <li>אל תתייאשו - לפעמים מילים קשות דורשות יצירתיות</li>
                <li>שמרו על קצב - זמן הסיבוב מוגבל</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="game-card">
          <div className="game-card-content">
            <Link to={createPageUrl("NewGame")} className="game-button">
              <span>🎮</span>
              <span>בואו נתחיל לשחק!</span>
            </Link>
            
            <Link to={createPageUrl("Home")} className="game-button secondary-button">
              <span>🏠</span>
              <span>חזרה לתפריט הראשי</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}