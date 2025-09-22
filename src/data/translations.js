export const translations = {
  hebrew: {
    // Common
    common: {
      newGame: "משחק חדש",
      instructions: "הוראות המשחק",
      back: "חזרה",
      next: "הבא",
      cancel: "ביטול",
      start: "התחל",
      finish: "סיים",
      skip: "דילוג",
      correct: "נכון",
      wrong: "שגוי",
      score: "ניקוד",
      time: "זמן",
      team: "קבוצה",
      players: "שחקנים",
      rounds: "סיבובים",
      total: "סה״כ",
      average: "ממוצע",
      accuracy: "דיוק",
      points: "נקודות",
      steps: "צעדים",
      hints: "רמזים",
      correctGuesses: "ניחושים נכונים",
      skips: "דילוגים",
      language: "שפה",
      hebrew: "עברית",
      english: "English"
    },

    // Home Screen
    home: {
      title: "ניקוקוד - NikkoCode",
      subtitle: "משחק מהנה ומרגש שמחבר בין חברים ומשפחה עם אתגרים יצירתיים ורגעי צחוק בלתי נגמרים",
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
        title: "סטטיסטיקות המשחק",
        players: "שחקנים",
        minutes: "דקות",
        words: "מילים",
        fun: "הנאה"
      }
    },

    // Instructions
    instructions: {
      title: "הוראות המשחק",
      whatIsGame: "מה המשחק?",
      gameDescription: "שלושת הקופים הוא משחק קבוצתי מהנה שמבוסס על האמרה המפורסמת \"לא ראיתי - לא שמעתי - לא דיברתי\".",
      gameDescription2: "בכל סיבוב, שלושה שחקנים מכל קבוצה מקבלים תפקידים שונים ועובדים יחד כדי לנחש כמה שיותר מילים תוך זמן מוגבל.",
      gameDescription3: "המטרה היא להשיג את הניקוד הגבוה ביותר על ידי עבודת צוות מושלמת בין השחקנים!",
      
      objective: "מטרת המשחק",
      objectiveDescription: "במשחק שלושת הקופים המטרה שלכם היא לעבור את הלוח ולהגיע לסוף המסע – לפני הקבוצות האחרות (או לפני שיגמרו לכם ה\"בננות\" בגרסת השיתופית).",
      objectiveDescription2: "כדי להתקדם, עליכם לשתף פעולה עם החברים לקבוצה, כל אחד בתפקיד אחר, ולעבור כמה שיותר קלפי מילים – במהירות, בלי לעבור על החוקים ובלי להיכנע לקלפי התעלול.",
      
      wordCards: "קלפי המילים",
      wordCardsDescription: "בכל קלף מילים מופיעה מילה • בכל תור מנסים להצליח כמה שיותר קלפים בזמן הנתון",
      
      scoring: "מערכת הניקוד",
      success: "הצלחה בניחוש",
      oneHint: "רמז אחד",
      twoHints: "שני רמזים", 
      threeHints: "שלושה רמזים",
      fourHints: "ארבעה רמזים",
      fiveHints: "חמישה רמזים",
      skipCard: "דילוג על קלף",
      failureOrSkip: "כישלון או דילוג",
      teamNotAdvance: "הקבוצה לא מתקדמת",
      stepBack: "צעד אחורה",
      remember: "זכרו:",
      scoringTip: "ככל שתשתמשו ברמזים פחות, תקבלו יותר נקודות! המטרה היא לתת רמזים יעילים ומדויקים.",
      
      roles: "תפקידי הקופים",
      rolesDescription: "בכל תור, כל שחקן בקבוצה שולף קלף תפקיד:",
      monkeySpeak: "הקוף שלא מדבר",
      monkeySpeakDesc: "מציג בפנטומימה את המילה שעל הקלף.",
      monkeyHear: "הקוף שלא שומע", 
      monkeyHearDesc: "צופה בפנטומימה, מבין את המילה, ונותן רמז של מילה אחת בלבד. אסור להגיד את המילה עצמה או פעולה ישירה.",
      monkeySee: "הקוף שלא רואה",
      monkeySeeDesc: "לא רואה את הפנטומימה. מקבל את הרמז של מילה אחת ומנסה לנחש את המילה המקורית. מותר לו לנחש כמה פעמים שרוצה עד שתיגמר הדקה.",
      
      restrictions: "איסורים",
      monkeySpeakRestrictions: "הקוף שלא מדבר: אסור לדבר, אסור להוציא קולות משמעותיים, אסור להשתמש בחפצים אמיתיים.",
      monkeyHearRestrictions: "הקוף שלא שומע: אסור להגיד את המילה עצמה, אסור להשתמש במילים נרדפות ישירות, אסור להשתמש בפעולה (רק שם עצם אחד).",
      monkeySeeRestrictions: "הקוף שלא רואה: אסור להציץ בפנטומימה, חייב להסתמך רק על הרמז והמחשבה.",
      allRestrictions: "כל הקופים: אסור להשתמש באותיות ראשונות, מספר הברות או מחוות שממחישות אותיות.",
      
      board: "הלוח",
      boardDescription: "הלוח כולל מסלול צעדים עד לנקודת הסיום.",
      specialSquares: "משבצות מיוחדות:",
      doubleTime: "זמן כפול – מקבלים דקה נוספת לתור הבא.",
      bananaCard: "קלף בננה – שולפים קלף תעלול שמוסיף מגבלה לאחד הקופים (למשל: הקוף שלא מדבר חייב להשתמש ביד אחת בלבד, הקוף שלא שומע חייב לעצום עין אחת, הקוף שלא רואה יכול לנחש רק שלוש פעמים וכו').",
      
      bananaCards: "קלפי הבננה (תעלול - דוגמאות)",
      bananaExample1: "\"יד אחת על הראש בזמן הפנטומימה\" 🙊",
      bananaExample2: "\"מותר רק שלושה ניחושים בתור הזה\" 🙈",
      
      timeRules: "זמן התור",
      timeDescription: "כל תור נמשך דקה אחת (או לפי שעון החול).",
      doubleTimeDescription: "אם דרכתם על משבצת \"⏳ כפול זמן\" – התור הבא שלכם נמשך שתי דקות!",
      
      gameVersions: "גרסאות המשחק",
      classicVersion: "גרסה קלאסית – קבוצות של 3 שחקנים",
      classicDescription: "כל קבוצה עם שלושה שחקנים. כל אחד שולף קלף תפקיד בתחילת התור. מתקדמים לפי הצלחות.",
      cooperativeVersion: "גרסה שיתופית – 3 שחקנים בלבד",
      cooperativeDescription: "כל השחקנים משחקים יחד נגד המשחק. מתחילים עם 3 בננות (חיים). בכל סיבוב חייבים לנחש לפחות 3 מילים נכונות. אם לא – מאבדים בננה. אם דורכים על משבצת שעון חול או משבצת בננה – מקבלים בננה נוספת (חיים). המטרה: להגיע לסוף המסלול לפני שנגמרות הבננות.",
      extendedVersion: "גרסה מורחבת – קבוצות של יותר מ־3 שחקנים",
      extendedDescription: "בקבוצות גדולות – יש רק קוף אחד שלא רואה, אחד שלא שומע, וכל השאר הם \"קופים שלא מדברים\" (פנטומימאים). כך כולם משתתפים, וכל אחד מקבל תפקיד בכל תור.",
      
      examples: "דוגמאות",
      example1: {
        word: "גיטרה",
        mime: "מנגן עם ידיים",
        hint: "מיתרים",
        guess: "גיטרה",
        result: "הקבוצה זכתה ב-3 צעדים כי הקוף שלא רואה ניחש בעזרת רמז אחד בלבד."
      },
      example2: {
        word: "מטרייה",
        mime1: "עושה פנטומימה - נראה יותר כמו \"מקל הליכה\"",
        hint1: "זקן",
        guess1: "מתחיל לנחש \"סבא… מקל…\" ולא מתקרב בכלל",
        mime2: "עושה פנטומימה סימון של \"לא\" ומדמה אדם שפותח מטרייה והולך בגשם",
        hint2: "מבין ואומר \"זלעפות\"",
        mime3: "אומר \"גשם...סופה..רעמים\"",
        hint3: "מוסיף ואומר \"מגן\"",
        mime4: "אומר \"מטרייה\"",
        result: "הקבוצה זכתה בצעד אחד בלבד כי השתמשו ב-3 רמזים."
      },
      example3: {
        word: "מקרר",
        mime: "עושה פנטומימה של פתיחת דלת ולקיחת משהו",
        hint: "מתלהב מדי ואומר ישירות: \"מקרר!\"",
        guess: "כמובן חוזר על זה: \"מקרר!\"",
        result: "מכיוון שהקוף שלא שומע אמר את התשובה עצמה (רמז אסור) הקלף נפסל, הקבוצה חוזרת צעד אחורה."
      },
      
      faq: "שאלות ותשובות",
      faq1: {
        q: "מה אם הקוף שלא שומע אומר בטעות את המילה עצמה?",
        a: "הקלף נפסל אוטומטית, והקבוצה חוזרת צעד אחורה."
      },
      faq2: {
        q: "מה אם נגמר הזמן באמצע קלף?",
        a: "אם המילה לא נחשפה – הקלף נפסל."
      },
      faq3: {
        q: "מה אם הקוף שאינו רואה לא מצליח לנחש?",
        a: "מותר לו לזרוק כמה ניחושים שרוצה בזמן, אבל אם לא פגע – הקלף נפסל."
      },
      faq4: {
        q: "מה אם בפנטומימה יצא משהו מצחיק שהקבוצה פרצה מצחוק?",
        a: "זה מצוין! המטרה היא גם ליהנות, גם אם לא מתקדמים."
      },
      
      gameEnd: "סיום המשחק",
      teamVersion: "גרסה קבוצתית – הקבוצה הראשונה שמגיעה לסוף הלוח מנצחת.",
      cooperativeVersionEnd: "גרסה שיתופית – אם הגעתם לסוף עם לפחות בננה אחת – ניצחתם!",
      
      tips: "טיפים למשחק מוצלח",
      tip1: "הקוף שלא מדבר - השתמש בפנטומימה ברורה ויצירתית",
      tip2: "הקוף שלא שומע - תן רמזים ברורים ומדויקים",
      tip3: "הקוף שלא רואה - הקשב בזהירות לכל רמז",
      tip4: "עבדו כקבוצה - תקשורת טובה היא המפתח לניצחון",
      tip5: "אל תתייאשו - לפעמים מילים קשות דורשות יצירתיות",
      tip6: "שמרו על קצב - זמן הסיבוב מוגבל",
      
      startPlaying: "בואו נתחיל לשחק!",
      backToHome: "חזרה לתפריט הראשי"
    },

    // Game Round
    gameRound: {
      timeRemaining: "זמן נותר",
      startRound: "התחל סיבוב!",
      finishGame: "סיים משחק",
      correctGuess: "ניחוש נכון",
      skip: "דילוג",
      roundScore: "ניקוד הסיבוב",
      bananaChallenge: "אתגר קלף בננה:",
      hintCounter: {
        title: "כמה רמזים השתמשתם?",
        word: "מילה",
        oneHint: "רמז אחד",
        twoHints: "שני רמזים",
        threeHints: "שלושה רמזים",
        fourHints: "ארבעה רמזים",
        points: "נקודות"
      },
      noWordsLeft: "נגמרו המילים!",
      errorLoadingWord: "שגיאה בטעינת מילה",
      loading: "טוען...",
      continue: "▶️ המשך",
      pause: "⏸️ השהה",
      reset: "🔄 אפס",
      teamTurn: "תור קבוצת",
      monkeyNotSee: "קוף שלא רואה",
      monkeyNotHear: "קוף שלא שומע",
      monkeyNotSpeak: "קוף שלא מדבר",
      guess: "מנחש",
      giveHint: "נותן רמז",
      pantomime: "פנטומימה",
      bananaChallenge: "אתגר קלף בננה:"
    },

    // Game Summary
    gameSummary: {
      loading: "טוען סיכום המשחק...",
      winner: "המנצחת הגדולה!",
      points: "נקודות",
      gameStats: "סטטיסטיקות המשחק",
      rounds: "סיבובים",
      correctGuesses: "ניחושים נכונים",
      totalWords: "מילים בסך הכל",
      overallAccuracy: "דיוק כללי",
      teamRankings: "דירוג הקבוצות",
      noParticipants: "אין משתתפים",
      roundsPlayed: "סיבובים",
      accuracy: "דיוק",
      correct: "נכונים",
      skips: "דילוגים",
      averagePerRound: "ממוצע לסיבוב",
      mvpPlayers: "שחקנים מצטיינים",
      newGame: "משחק חדש",
      backToHome: "חזרה לתפריט הראשי"
    },

    // New Game
    newGame: {
      gameSettings: "הגדרות משחק",
      timePerRound: "זמן לכל סיבוב",
      timeDescription: "בחר כמה זמן יהיה לכל קבוצה לנחש מילים",
      seconds: "שניות",
      fast: "60 שניות - מהיר ⚡",
      medium: "90 שניות - בינוני 🎯",
      relaxed: "120 שניות - רגוע 🧘",
      teams: "קבוצות",
      addTeam: "+ הוסף קבוצה",
      teamNamePlaceholder: "שם הקבוצה",
      playerPlaceholder: "שם השחקן",
      removeTeam: "הסר קבוצה",
      startGame: "התחל משחק",
      backToHome: "חזרה לתפריט הראשי"
    },

    // Role Assignment
    roleAssignment: {
      loading: "טוען...",
      roleAssignment: "חלוקת תפקידים",
      gameOptions: "אפשרויות משחק",
      monkeyNotSee: "קוף שלא רואה",
      monkeyNotHear: "קוף שלא שומע", 
      monkeysNotSpeak: "קופים שלא מדברים",
      guessWord: "מנחש את המילה",
      giveClues: "נותן רמזים מילוליים",
      doPantomime: "עושים פנטומימה",
      bananaCard: "קלף בננה",
      openCard: "פתח קלף",
      challenge: "אתגר:",
      close: "סגור",
      doubleTime: "זמן כפול",
      enableDoubleTime: "הפעל זמן כפול",
      startRound: "התחל סיבוב!",
      backToHome: "חזרה לתפריט הראשי",
      bananaChallenges: [
        "נחש את המילה רק עם תנועות ידיים",
        "נחש את המילה רק עם קולות של בעלי חיים",
        "נחש את המילה רק עם ריקוד",
        "נחש את המילה רק עם ציור באוויר",
        "נחש את המילה רק עם תנועות פנים",
        "נחש את המילה רק עם קולות של מכונות",
        "נחש את המילה רק עם תנועות גוף",
        "נחש את המילה רק עם קולות של טבע"
      ]
    }
  },

  english: {
    // Common
    common: {
      newGame: "New Game",
      instructions: "Game Instructions",
      back: "Back",
      next: "Next",
      cancel: "Cancel",
      start: "Start",
      finish: "Finish",
      skip: "Skip",
      correct: "Correct",
      wrong: "Wrong",
      score: "Score",
      time: "Time",
      team: "Team",
      players: "Players",
      rounds: "Rounds",
      total: "Total",
      average: "Average",
      accuracy: "Accuracy",
      points: "Points",
      steps: "Steps",
      hints: "Hints",
      correctGuesses: "Correct Guesses",
      skips: "Skips",
      language: "Language",
      hebrew: "עברית",
      english: "English"
    },

    // Home Screen
    home: {
      title: "KofiCode",
      subtitle: "An exciting and fun game that connects friends and family with creative challenges and endless moments of laughter",
      features: {
        pantomime: {
          title: "Creative Pantomime",
          desc: "The monkey who doesn't speak performs amazing pantomime to convey the word to group members"
        },
        hints: {
          title: "Verbal Hints",
          desc: "The monkey who doesn't hear gives verbal hints based on the pantomime they see"
        },
        guessing: {
          title: "Accurate Guessing",
          desc: "The monkey who doesn't see needs to guess the word based only on the verbal hints they hear"
        }
      },
      stats: {
        title: "Game Statistics",
        players: "Players",
        minutes: "Minutes",
        words: "Words",
        fun: "Fun"
      }
    },

    // Instructions
    instructions: {
      title: "Game Instructions",
      whatIsGame: "What is the Game?",
      gameDescription: "Three Monkeys is a fun group game based on the famous saying \"See no evil - Hear no evil - Speak no evil\".",
      gameDescription2: "In each round, three players from each team get different roles and work together to guess as many words as possible in limited time.",
      gameDescription3: "The goal is to achieve the highest score through perfect teamwork between players!",
      
      objective: "Game Objective",
      objectiveDescription: "In the Three Monkeys game, your goal is to move across the board and reach the end of the journey – before the other teams (or before you run out of \"bananas\" in the cooperative version).",
      objectiveDescription2: "To advance, you must cooperate with your team members, each in a different role, and go through as many word cards as possible – quickly, without breaking the rules and without succumbing to trick cards.",
      
      wordCards: "Word Cards",
      wordCardsDescription: "Each word card contains a word • In each turn, try to succeed with as many cards as possible in the given time",
      
      scoring: "Scoring System",
      success: "Successful Guessing",
      oneHint: "One Hint",
      twoHints: "Two Hints", 
      threeHints: "Three Hints",
      fourHints: "Four Hints",
      fiveHints: "Five Hints",
      skipCard: "Skip Card",
      failureOrSkip: "Failure or Skip",
      teamNotAdvance: "Team does not advance",
      stepBack: "Step back",
      remember: "Remember:",
      scoringTip: "The fewer hints you use, the more points you get! The goal is to give effective and accurate hints.",
      
      roles: "Monkey Roles",
      rolesDescription: "In each turn, each team player draws a role card:",
      monkeySpeak: "The Monkey Who Doesn't Speak",
      monkeySpeakDesc: "Performs pantomime of the word on the card.",
      monkeyHear: "The Monkey Who Doesn't Hear", 
      monkeyHearDesc: "Watches the pantomime, understands the word, and gives a hint of only one word. It's forbidden to say the word itself or a direct action.",
      monkeySee: "The Monkey Who Doesn't See",
      monkeySeeDesc: "Doesn't see the pantomime. Receives the one-word hint and tries to guess the original word. Can guess as many times as wanted until the minute runs out.",
      
      restrictions: "Restrictions",
      monkeySpeakRestrictions: "The monkey who doesn't speak: No talking, no meaningful sounds, no using real objects.",
      monkeyHearRestrictions: "The monkey who doesn't hear: Can't say the word itself, can't use direct synonyms, can't use actions (only one noun).",
      monkeySeeRestrictions: "The monkey who doesn't see: Can't peek at the pantomime, must rely only on the hint and thinking.",
      allRestrictions: "All monkeys: Can't use first letters, number of syllables or gestures that illustrate letters.",
      
      board: "The Board",
      boardDescription: "The board includes a path of steps to the finish point.",
      specialSquares: "Special Squares:",
      doubleTime: "Double Time – Get an extra minute for the next turn.",
      bananaCard: "Banana Card – Draw a trick card that adds a limitation to one of the monkeys (e.g., the monkey who doesn't speak must use only one hand, the monkey who doesn't hear must close one eye, the monkey who doesn't see can only guess three times, etc.).",
      
      bananaCards: "Banana Cards (Trick - Examples)",
      bananaExample1: "\"One hand on the head during pantomime\" 🙊",
      bananaExample2: "\"Only three guesses allowed this turn\" 🙈",
      
      timeRules: "Turn Time",
      timeDescription: "Each turn lasts one minute (or by hourglass).",
      doubleTimeDescription: "If you step on a \"⏳ double time\" square – your next turn lasts two minutes!",
      
      gameVersions: "Game Versions",
      classicVersion: "Classic Version – Teams of 3 Players",
      classicDescription: "Each team with three players. Each draws a role card at the beginning of the turn. Advance by successes.",
      cooperativeVersion: "Cooperative Version – Only 3 Players",
      cooperativeDescription: "All players play together against the game. Start with 3 bananas (lives). In each round, must guess at least 3 correct words. If not – lose a banana. If stepping on an hourglass square or banana square – get an additional banana (life). Goal: reach the end of the path before bananas run out.",
      extendedVersion: "Extended Version – Teams of More Than 3 Players",
      extendedDescription: "In large teams – there's only one monkey who doesn't see, one who doesn't hear, and all the rest are \"monkeys who don't speak\" (pantomimists). This way everyone participates, and each gets a role in every turn.",
      
      examples: "Examples",
      example1: {
        word: "Guitar",
        mime: "Plays with hands",
        hint: "Strings",
        guess: "Guitar",
        result: "The team won 3 steps because the blind monkey guessed with only one hint."
      },
      example2: {
        word: "Umbrella",
        mime1: "Does pantomime - looks more like \"walking stick\"",
        hint1: "Old man",
        guess1: "Starts guessing \"grandpa… stick…\" and doesn't get close at all",
        mime2: "Does pantomime sign of \"no\" and mimics a person opening an umbrella and walking in rain",
        hint2: "Understands and says \"storm\"",
        mime3: "Says \"rain...storm..thunder\"",
        hint3: "Adds and says \"shield\"",
        mime4: "Says \"umbrella\"",
        result: "The team won only one step because they used 3 hints."
      },
      example3: {
        word: "Refrigerator",
        mime: "Does pantomime of opening door and taking something",
        hint: "Gets too excited and says directly: \"Refrigerator!\"",
        guess: "Of course repeats it: \"Refrigerator!\"",
        result: "Since the hearing monkey said the answer itself (forbidden hint) the card is disqualified, the team goes back one step."
      },
      
      faq: "Questions and Answers",
      faq1: {
        q: "What if the monkey who doesn't hear accidentally says the word itself?",
        a: "The card is automatically disqualified, and the team goes back one step."
      },
      faq2: {
        q: "What if time runs out in the middle of a card?",
        a: "If the word wasn't revealed – the card is disqualified."
      },
      faq3: {
        q: "What if the monkey who doesn't see can't guess?",
        a: "Can throw as many guesses as wanted in time, but if doesn't hit – the card is disqualified."
      },
      faq4: {
        q: "What if something funny came out in pantomime and the group burst into laughter?",
        a: "That's great! The goal is also to have fun, even if not advancing."
      },
      
      gameEnd: "Game End",
      teamVersion: "Team Version – The first team to reach the end of the board wins.",
      cooperativeVersionEnd: "Cooperative Version – If you reach the end with at least one banana – you win!",
      
      tips: "Tips for Successful Game",
      tip1: "The monkey who doesn't speak - Use clear and creative pantomime",
      tip2: "The monkey who doesn't hear - Give clear and accurate hints",
      tip3: "The monkey who doesn't see - Listen carefully to every hint",
      tip4: "Work as a team - good communication is the key to victory",
      tip5: "Don't give up - sometimes difficult words require creativity",
      tip6: "Keep the pace - turn time is limited",
      
      startPlaying: "Let's Start Playing!",
      backToHome: "Back to Main Menu"
    },

    // Game Round
    gameRound: {
      timeRemaining: "Time Remaining",
      startRound: "Start Round!",
      finishGame: "Finish Game",
      correctGuess: "Correct Guess",
      skip: "Skip",
      roundScore: "Round Score",
      bananaChallenge: "Banana Card Challenge:",
      hintCounter: {
        title: "How many hints did you use?",
        word: "Word",
        oneHint: "One Hint",
        twoHints: "Two Hints",
        threeHints: "Three Hints",
        fourHints: "Four Hints",
        points: "Points"
      },
      noWordsLeft: "No words left!",
      errorLoadingWord: "Error loading word",
      loading: "Loading...",
      continue: "▶️ Continue",
      pause: "⏸️ Pause",
      reset: "🔄 Reset",
      teamTurn: "Team's turn",
      monkeyNotSee: "Monkey Who Doesn't See",
      monkeyNotHear: "Monkey Who Doesn't Hear",
      monkeyNotSpeak: "Monkey Who Doesn't Speak",
      guess: "Guesses",
      giveHint: "Gives hint",
      pantomime: "Pantomime",
      bananaChallenge: "Banana Card Challenge:"
    },

    // Game Summary
    gameSummary: {
      loading: "Loading game summary...",
      winner: "The Great Winner!",
      points: "points",
      gameStats: "Game Statistics",
      rounds: "Rounds",
      correctGuesses: "Correct Guesses",
      totalWords: "Total Words",
      overallAccuracy: "Overall Accuracy",
      teamRankings: "Team Rankings",
      noParticipants: "No participants",
      roundsPlayed: "Rounds",
      accuracy: "Accuracy",
      correct: "Correct",
      skips: "Skips",
      averagePerRound: "Average per Round",
      mvpPlayers: "Outstanding Players",
      newGame: "New Game",
      backToHome: "Back to Home"
    },

    // New Game
    newGame: {
      gameSettings: "Game Settings",
      timePerRound: "Time per Round",
      timeDescription: "Choose how much time each team has to guess words",
      seconds: "seconds",
      fast: "60 seconds - Fast ⚡",
      medium: "90 seconds - Medium 🎯",
      relaxed: "120 seconds - Relaxed 🧘",
      teams: "Teams",
      addTeam: "+ Add Team",
      teamNamePlaceholder: "Team name",
      playerPlaceholder: "Player name",
      removeTeam: "Remove Team",
      startGame: "Start Game",
      backToHome: "Back to Home"
    },

    // Role Assignment
    roleAssignment: {
      loading: "Loading...",
      roleAssignment: "Role Assignment",
      gameOptions: "Game Options",
      monkeyNotSee: "Monkey Who Doesn't See",
      monkeyNotHear: "Monkey Who Doesn't Hear",
      monkeysNotSpeak: "Monkeys Who Don't Speak",
      guessWord: "Guesses the word",
      giveClues: "Gives verbal clues",
      doPantomime: "Do pantomime",
      bananaCard: "Banana Card",
      openCard: "Open Card",
      challenge: "Challenge:",
      close: "Close",
      doubleTime: "Double Time",
      enableDoubleTime: "Enable Double Time",
      startRound: "Start Round!",
      backToHome: "Back to Home",
      bananaChallenges: [
        "Guess the word only with hand movements",
        "Guess the word only with animal sounds",
        "Guess the word only with dancing",
        "Guess the word only with air drawing",
        "Guess the word only with facial expressions",
        "Guess the word only with machine sounds",
        "Guess the word only with body movements",
        "Guess the word only with nature sounds"
      ]
    }
  }
};
