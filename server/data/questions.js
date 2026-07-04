// 50 SSB (Services Selection Board) Interview Questions
// Mix of Easy, Medium, and Hard difficulty
// Each question links to the next via the "next" field (linked-list style, like your original)

const questions = [
  // ---------- EASY (Personal / Warm-up) ----------
  { id: 1, level: "Easy", Q: "Good Morning", next: 2 },
  { id: 2, level: "Easy", Q: "Introduce yourself in 1 minute", next: 3 },
  { id: 3, level: "Easy", Q: "Did you have breakfast? What did you have for breakfast?", next: 4 },
  { id: 4, level: "Easy", Q: "Where are you from? How many districts are there in your state?", next: 5 },
  { id: 5, level: "Easy", Q: "Did you come here for the interview? How did you travel from your home to here?", next: 6 },
  { id: 6, level: "Easy", Q: "Tell me about your family background.", next: 7 },
  { id: 7, level: "Easy", Q: "What is your father's / mother's occupation?", next: 8 },
  { id: 8, level: "Easy", Q: "What is your daily routine like?", next: 9 },
  { id: 9, level: "Easy", Q: "What are your hobbies?", next: 10 },
  { id: 10, level: "Easy", Q: "What subjects did you study in your last qualification?", next: 11 },
  { id: 11, level: "Easy", Q: "Who is your favorite teacher and why?", next: 12 },
  { id: 12, level: "Easy", Q: "What newspaper do you read daily?", next: 13 },
  { id: 13, level: "Easy", Q: "Tell me about your school/college.", next: 14 },
  { id: 14, level: "Easy", Q: "What is the capital of your state? Who is the current Chief Minister?", next: 15 },
  { id: 15, level: "Easy", Q: "Do you play any sports? Which one, and at what level?", next: 16 },

  // ---------- MEDIUM (Motivation / Awareness / Personality) ----------
  { id: 16, level: "Medium", Q: "Why do you want to join the Armed Forces?", next: 17 },
  { id: 17, level: "Medium", Q: "What does serving the country mean to you?", next: 18 },
  { id: 18, level: "Medium", Q: "What do you know about the role you are applying for (Army/Navy/Air Force)?", next: 19 },
  { id: 19, level: "Medium", Q: "Who is the current Chief of Army Staff / Naval Staff / Air Staff?", next: 20 },
  { id: 20, level: "Medium", Q: "What are the qualities of a good leader?", next: 21 },
  { id: 21, level: "Medium", Q: "Tell me about a time you took the lead in a group activity.", next: 22 },
  { id: 22, level: "Medium", Q: "What are your strengths and weaknesses?", next: 23 },
  { id: 23, level: "Medium", Q: "How do you handle failure or criticism?", next: 24 },
  { id: 24, level: "Medium", Q: "What is the difference between courage and recklessness?", next: 25 },
  { id: 25, level: "Medium", Q: "What do you understand by discipline?", next: 26 },
  { id: 26, level: "Medium", Q: "Have you ever faced a conflict with a friend? How did you resolve it?", next: 27 },
  { id: 27, level: "Medium", Q: "What is your opinion on the current border tensions India faces?", next: 28 },
  { id: 28, level: "Medium", Q: "Why did you choose this particular academy/entry scheme?", next: 29 },
  { id: 29, level: "Medium", Q: "If you don't get selected this time, what will you do next?", next: 30 },
  { id: 30, level: "Medium", Q: "What is the difference between the Army, Navy, and Air Force in terms of roles?", next: 31 },
  { id: 31, level: "Medium", Q: "How do you keep yourself physically fit?", next: 32 },
  { id: 32, level: "Medium", Q: "What is your understanding of teamwork versus individual achievement?", next: 33 },
  { id: 33, level: "Medium", Q: "Tell me about a recent current affairs topic that interests you.", next: 34 },
  { id: 34, level: "Medium", Q: "What will you do if your senior officer gives you an order you disagree with?", next: 35 },
  { id: 35, level: "Medium", Q: "How do you manage stress and time pressure?", next: 36 },

  // ---------- HARD (Situational / Psychological / Ethical Dilemmas) ----------
  { id: 36, level: "Hard", Q: "You are the leader of a team of 5 people. You have two choices: complete the mission on time by taking a risky shortcut, or take a safer route and miss the deadline. What do you choose and why?", next: 37 },
  { id: 37, level: "Hard", Q: "During an operation, you discover that a close friend in your unit has broken a rule. Do you report him? Why or why not?", next: 38 },
  { id: 38, level: "Hard", Q: "If you are ordered to do something that conflicts with your personal moral values, what will you do?", next: 39 },
  { id: 39, level: "Hard", Q: "You are leading a patrol and one of your subordinates gets seriously injured far from base with limited resources. What is your immediate course of action?", next: 40 },
  { id: 40, level: "Hard", Q: "How would you handle a situation where two of your team members are constantly in conflict, affecting the mission?", next: 41 },
  { id: 41, level: "Hard", Q: "If you had to choose between saving your unit's mission objective or saving a civilian's life at great risk, what would you decide?", next: 42 },
  { id: 42, level: "Hard", Q: "What would you do if you found corruption being practiced by a senior officer you respect?", next: 43 },
  { id: 43, level: "Hard", Q: "How would you motivate a demoralized team after a failed mission?", next: 44 },
  { id: 44, level: "Hard", Q: "You strongly disagree with a strategic decision made by your commanding officer. How do you express your concern without undermining authority?", next: 45 },
  { id: 45, level: "Hard", Q: "If national security required an action that conflicted with international law, how should the Armed Forces respond?", next: 46 },
  { id: 46, level: "Hard", Q: "How do you balance personal ambition with the collective good of your unit?", next: 47 },
  { id: 47, level: "Hard", Q: "Describe a hypothetical situation where you must make a life-or-death decision within seconds. What factors guide your decision-making?", next: 48 },
  { id: 48, level: "Hard", Q: "What is your view on the ethical use of force during counter-insurgency operations?", next: 49 },
  { id: 49, level: "Hard", Q: "If you witness a fellow officer showing signs of severe psychological stress that could affect the mission, how would you handle it?", next: 50 },
  { id: 50, level: "Hard", Q: "As a future officer, how would you handle a situation where following orders could mean risking the lives of the very civilians you are meant to protect?", next: null },
];

export default questions;