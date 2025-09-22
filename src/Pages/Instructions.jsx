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

        {/* Game Objective */}
        <div className="game-card">
          <div className="game-card-content">
            <div className="instructions-section">
              <div className="section-title">
                🎯 מטרת המשחק
              </div>
              <div className="instruction-text">
                <p>במשחק שלושת הקופים המטרה שלכם היא <strong>לעבור את הלוח ולהגיע לסוף המסע</strong> – לפני הקבוצות האחרות (או לפני שיגמרו לכם ה"בננות" בגרסת השיתופית).</p>
                
                <p>כדי להתקדם, עליכם לשתף פעולה עם החברים לקבוצה, כל אחד בתפקיד אחר, ולעבור כמה שיותר קלפי מילים – במהירות, בלי לעבור על החוקים ובלי להיכנע לקלפי התעלול.</p>
              </div>
            </div>
          </div>
        </div>

{/* Game Cards */}
<div className="game-card">
  <div className="game-card-content">
    <div className="instructions-section">
      <div className="section-title">🃏 קלפי המילים</div>
      <div className="instruction-text">
        <p><strong>בכל קלף מילים מופיעה מילה • בכל תור מנסים להצליח כמה שיותר קלפים בזמן הנתון</strong></p>
        
        <div className="scoring-system" style={{marginTop: '20px'}}>
          <div className="scoring-title" style={{textAlign: 'center', marginBottom: '15px', fontWeight: 'bold', color: '#333'}}>
            🎯 מערכת הניקוד
          </div>
          
          {/* Success Cases */}
          <div className="success-section" style={{backgroundColor: '#f0f9ff', padding: '15px', borderRadius: '10px', marginBottom: '15px', border: '1px solid #bfdbfe'}}>
            <div className="section-header" style={{fontWeight: 'bold', color: '#065f46', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', direction: 'rtl'}}>
              <span>הצלחה בניחוש</span>
              <span style={{backgroundColor: '#059669', color: 'white', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px'}}>✓</span>
            </div>
            
            <div className="scoring-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', direction: 'rtl'}}>
              <div className="scoring-item" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'white', padding: '12px', borderRadius: '8px', border: '1px solid #d1fae5', textAlign: 'center'}}>
                <div className="scoring-icon" style={{backgroundColor: '#059669', color: 'white', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '16px', marginBottom: '8px'}}>1</div>
                <div className="scoring-label" style={{fontSize: '14px', marginBottom: '4px'}}>רמז אחד</div>
                <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                  <div className="scoring-points" style={{fontSize: '18px', fontWeight: 'bold', color: '#059669'}}>3+</div>
                  <span style={{fontSize: '12px', color: '#666'}}>צעדים</span>
                </div>
              </div>
              
              <div className="scoring-item" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'white', padding: '12px', borderRadius: '8px', border: '1px solid #d1fae5', textAlign: 'center'}}>
                <div className="scoring-icon" style={{backgroundColor: '#10b981', color: 'white', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '16px', marginBottom: '8px'}}>2</div>
                <div className="scoring-label" style={{fontSize: '14px', marginBottom: '4px'}}>שני רמזים</div>
                <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                  <div className="scoring-points" style={{fontSize: '18px', fontWeight: 'bold', color: '#10b981'}}>2+</div>
                  <span style={{fontSize: '12px', color: '#666'}}>צעדים</span>
                </div>
              </div>
              
              <div className="scoring-item" style={{display: 'flex', flexDirection: 'column', alignItems: 'center', backgroundColor: 'white', padding: '12px', borderRadius: '8px', border: '1px solid #d1fae5', textAlign: 'center'}}>
                <div className="scoring-icon" style={{backgroundColor: '#34d399', color: 'white', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '16px', marginBottom: '8px'}}>3</div>
                <div className="scoring-label" style={{fontSize: '14px', marginBottom: '4px'}}>שלושה רמזים</div>
                <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                  <div className="scoring-points" style={{fontSize: '18px', fontWeight: 'bold', color: '#34d399'}}>1+</div>
                  <span style={{fontSize: '12px', color: '#666'}}>צעד</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Neutral Case */}
          <div className="neutral-section" style={{backgroundColor: '#fffbeb', padding: '15px', borderRadius: '10px', marginBottom: '15px', border: '1px solid #fed7aa'}}>
            <div className="scoring-item" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', padding: '12px', borderRadius: '8px', border: '1px solid #fde68a', direction: 'rtl'}}>
              <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                <div className="scoring-label">ארבעה רמזים</div>
                <div className="scoring-icon" style={{backgroundColor: '#f59e0b', color: 'white', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px'}}>4</div>
              </div>
              <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                <span style={{fontSize: '12px', color: '#666'}}>הקבוצה לא מתקדמת</span>
                <div className="scoring-points" style={{fontSize: '20px', fontWeight: 'bold', color: '#f59e0b'}}>0</div>
              </div>
            </div>
          </div>
          
          {/* Failure Cases */}
          <div className="failure-section" style={{backgroundColor: '#fef2f2', padding: '15px', borderRadius: '10px', marginBottom: '15px', border: '1px solid #fecaca'}}>
            <div className="section-header" style={{fontWeight: 'bold', color: '#dc2626', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px', direction: 'rtl'}}>
              <span>כישלון או דילוג</span>
              <span style={{backgroundColor: '#dc2626', color: 'white', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px'}}>✗</span>
            </div>
            
            <div className="scoring-grid" style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', direction: 'rtl'}}>
              <div className="scoring-item" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', padding: '12px', borderRadius: '8px', border: '1px solid #fecaca', direction: 'rtl'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                  <div className="scoring-label">חמישה רמזים</div>
                  <div className="scoring-icon" style={{backgroundColor: '#ef4444', color: 'white', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px'}}>5</div>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                  <span style={{fontSize: '12px', color: '#666'}}>צעד אחורה</span>
                  <div className="scoring-points" style={{fontSize: '20px', fontWeight: 'bold', color: '#ef4444'}}>1-</div>
                </div>
              </div>
              
              <div className="scoring-item" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'white', padding: '12px', borderRadius: '8px', border: '1px solid #fecaca', direction: 'rtl'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                  <div className="scoring-label">דילוג על קלף</div>
                  <div className="scoring-icon" style={{backgroundColor: '#dc2626', color: 'white', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px'}}>⏭</div>
                </div>
                <div style={{display: 'flex', alignItems: 'center', gap: '5px'}}>
                  <span style={{fontSize: '12px', color: '#666'}}>צעד אחורה</span>
                  <div className="scoring-points" style={{fontSize: '20px', fontWeight: 'bold', color: '#dc2626'}}>1-</div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Quick Tip */}
          <div className="tip-section" style={{backgroundColor: '#f9fafb', padding: '15px', borderRadius: '10px', border: '1px solid #e5e7eb', direction: 'rtl'}}>
            <div style={{fontWeight: 'bold', color: '#374151', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px'}}>
              <span>זכרו:</span>
              <span>💡</span>
            </div>
            <p style={{fontSize: '14px', color: '#6b7280', margin: '0'}}>
              ככל שתשתמשו ברמזים פחות, תקבלו יותר נקודות! המטרה היא לתת רמזים יעילים ומדויקים.
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
              👥 תפקידי הקופים
            </div>
            <div className="instruction-text">
              <p><strong>בכל תור, כל שחקן בקבוצה שולף קלף תפקיד:</strong></p>
            </div>
            <div className="roles-section">
              <div className="role-card">
                <div className="role-monkey monkey-speak">🙊</div>
                <div className="role-info">
                  <div className="role-title">הקוף שלא מדבר</div>
                  <div className="role-desc">מציג בפנטומימה את המילה שעל הקלף.</div>
                </div>
              </div>
              
              <div className="role-card">
                <div className="role-monkey monkey-hear">🙉</div>
                <div className="role-info">
                  <div className="role-title">הקוף שלא שומע</div>
                  <div className="role-desc">צופה בפנטומימה, מבין את המילה, ונותן רמז של מילה אחת בלבד. אסור להגיד את המילה עצמה או פעולה ישירה.</div>
                </div>
              </div>
              
              <div className="role-card">
                <div className="role-monkey monkey-see">🙈</div>
                <div className="role-info">
                  <div className="role-title">הקוף שלא רואה</div>
                  <div className="role-desc">לא רואה את הפנטומימה. מקבל את הרמז של מילה אחת ומנסה לנחש את המילה המקורית. מותר לו לנחש כמה פעמים שרוצה עד שתיגמר הדקה.</div>
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
                🚫 איסורים
              </div>
              <div className="instruction-text">
                <p><strong>הקוף שלא מדבר:</strong> אסור לדבר, אסור להוציא קולות משמעותיים, אסור להשתמש בחפצים אמיתיים.</p>
                
                <p><strong>הקוף שלא שומע:</strong> אסור להגיד את המילה עצמה, אסור להשתמש במילים נרדפות ישירות, אסור להשתמש בפעולה (רק שם עצם אחד).</p>
                
                <p><strong>הקוף שלא רואה:</strong> אסור להציץ בפנטומימה, חייב להסתמך רק על הרמז והמחשבה.</p>
                
                <p><strong>כל הקופים:</strong> אסור להשתמש באותיות ראשונות, מספר הברות או מחוות שממחישות אותיות.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Game Board */}
        <div className="game-card">
          <div className="game-card-content">
            <div className="instructions-section">
              <div className="section-title">
                🎲 הלוח
              </div>
              <div className="instruction-text">
                <p>הלוח כולל מסלול צעדים עד לנקודת הסיום.</p>
                
                <p><strong>משבצות מיוחדות:</strong></p>
                <p>⏳ <strong>זמן כפול</strong> – מקבלים דקה נוספת לתור הבא.</p>
                <p>🍌 <strong>קלף בננה</strong> – שולפים קלף תעלול שמוסיף מגבלה לאחד הקופים (למשל: הקוף שלא מדבר חייב להשתמש ביד אחת בלבד, הקוף שלא שומע חייב לעצום עין אחת, הקוף שלא רואה יכול לנחש רק שלוש פעמים וכו').</p>
              </div>
            </div>
          </div>
        </div>

        {/* Banana Cards Examples */}
        <div className="game-card">
          <div className="game-card-content">
            <div className="instructions-section">
              <div className="section-title">
                🍌 קלפי הבננה (תעלול - דוגמאות)
              </div>
              <div className="instruction-text">
                <p>"יד אחת על הראש בזמן הפנטומימה" 🙊</p>
                <p>"מותר רק שלושה ניחושים בתור הזה" 🙈</p>
              </div>
            </div>
          </div>
        </div>

        {/* Time Rules */}
        <div className="game-card">
          <div className="game-card-content">
            <div className="instructions-section">
              <div className="section-title">
                ⏱️ זמן התור
              </div>
              <div className="instruction-text">
                <p>כל תור נמשך דקה אחת (או לפי שעון החול).</p>
                <p>אם דרכתם על משבצת "⏳ כפול זמן" – התור הבא שלכם נמשך שתי דקות!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Game Versions */}
        <div className="game-card">
          <div className="game-card-content">
            <div className="instructions-section">
              <div className="section-title">
                🐵 גרסאות המשחק
              </div>
              <div className="instruction-text">
                <p><strong>גרסה קלאסית – קבוצות של 3 שחקנים</strong></p>
                <p>כל קבוצה עם שלושה שחקנים. כל אחד שולף קלף תפקיד בתחילת התור. מתקדמים לפי הצלחות.</p>
                
                <p><strong>גרסה שיתופית – 3 שחקנים בלבד</strong></p>
                <p>כל השחקנים משחקים יחד נגד המשחק. מתחילים עם 3 בננות (חיים). בכל סיבוב חייבים לנחש לפחות 3 מילים נכונות. אם לא – מאבדים בננה. אם דורכים על משבצת שעון חול או משבצת בננה – מקבלים בננה נוספת (חיים). המטרה: להגיע לסוף המסלול לפני שנגמרות הבננות.</p>
                
                <p><strong>גרסה מורחבת – קבוצות של יותר מ־3 שחקנים</strong></p>
                <p>בקבוצות גדולות – יש רק קוף אחד שלא רואה, אחד שלא שומע, וכל השאר הם "קופים שלא מדברים" (פנטומימאים). כך כולם משתתפים, וכל אחד מקבל תפקיד בכל תור.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Examples */}
        <div className="game-card">
          <div className="game-card-content">
            <div className="instructions-section">
              <div className="section-title">
                🧩 דוגמאות
              </div>
              <div className="instruction-text">
                <p><strong>קלף מילה: "גיטרה"</strong></p>
                <p>🙊 הקוף שלא מדבר - מנגן עם ידיים.</p>
                <p>🙉 הקוף שלא שומע - אומר "מיתרים".</p>
                <p>🙈 הקוף שלא רואה - אומר "גיטרה".</p>
                <p>הקבוצה זכתה ב-3 צעדים כי הקוף שלא רואה ניחש בעזרת רמז אחד בלבד.</p>
                
                <p><strong>קלף: "מטרייה"</strong></p>
                <p>🙊 הקוף שלא מדבר - עושה פנטומימה - נראה יותר כמו "מקל הליכה".</p>
                <p>🙉 הקוף שלא שומע - אומר "זקן".</p>
                <p>🙈 הקוף שלא רואה - מתחיל לנחש "סבא… מקל…" ולא מתקרב בכלל.</p>
                <p>🙊 הקוף שלא מדבר - עושה פנטומימה סימון של "לא" ומדמה אדם שפותח מטרייה והולך בגשם.</p>
                <p>🙉 הקוף שלא שומע - מבין ואומר "זלעפות".</p>
                <p>🙊 הקוף שלא מדבר - אומר "גשם...סופה..רעמים".</p>
                <p>🙉 הקוף שלא שומע - מוסיף ואומר "מגן".</p>
                <p>🙊 הקוף שלא מדבר - אומר "מטרייה".</p>
                <p>הקבוצה זכתה בצעד אחד בלבד כי השתמשו ב-3 רמזים.</p>
                
                <p><strong>קלף: "מקרר"</strong></p>
                <p>🙊 הקוף שלא מדבר - עושה פנטומימה של פתיחת דלת ולקיחת משהו.</p>
                <p>🙉 הקוף שלא שומע - מתלהב מדי ואומר ישירות: "מקרר!"</p>
                <p>🙈 הקוף שלא רואה - כמובן חוזר על זה: "מקרר!".</p>
                <p>מכיוון שהקוף שלא שומע אמר את התשובה עצמה (רמז אסור) הקלף נפסל, הקבוצה חוזרת צעד אחורה.</p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="game-card">
          <div className="game-card-content">
            <div className="instructions-section">
              <div className="section-title">
                ❓ שאלות ותשובות
              </div>
              <div className="instruction-text">
                <p><strong>ש:</strong> מה אם הקוף שלא שומע אומר בטעות את המילה עצמה?</p>
                <p><strong>ת:</strong> הקלף נפסל אוטומטית, והקבוצה חוזרת צעד אחורה.</p>
                
                <p><strong>ש:</strong> מה אם נגמר הזמן באמצע קלף?</p>
                <p><strong>ת:</strong> אם המילה לא נחשפה – הקלף נפסל.</p>
                
                <p><strong>ש:</strong> מה אם הקוף שאינו רואה לא מצליח לנחש?</p>
                <p><strong>ת:</strong> מותר לו לזרוק כמה ניחושים שרוצה בזמן, אבל אם לא פגע – הקלף נפסל.</p>
                
                <p><strong>ש:</strong> מה אם בפנטומימה יצא משהו מצחיק שהקבוצה פרצה מצחוק?</p>
                <p><strong>ת:</strong> זה מצוין! המטרה היא גם ליהנות, גם אם לא מתקדמים.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Game End */}
        <div className="game-card">
          <div className="game-card-content">
            <div className="instructions-section">
              <div className="section-title">
                🏆 סיום המשחק
              </div>
              <div className="instruction-text">
                <p><strong>גרסה קבוצתית</strong> – הקבוצה הראשונה שמגיעה לסוף הלוח מנצחת.</p>
                <p><strong>גרסה שיתופית</strong> – אם הגעתם לסוף עם לפחות בננה אחת – ניצחתם!</p>
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