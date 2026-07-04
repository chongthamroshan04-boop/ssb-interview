import Express from "express";
import multer from "multer";
import questions from "../data/questions.js";
import SessionFuction, { sessions } from "../sessions/sessions.js";

const router = Express.Router();
const upload = multer({ //"When someone uploads a file, keep it in memory instead of saving it to disk."
    storage: multer.memoryStorage(),
});


router.post("/start", (req, res) => {

  const name = req.body.username;


  const sessionId = SessionFuction(name);

  const firstQuestion = {
    ...questions[0],
    Q: `${name}. ${questions[0].Q}`
  };

  res.json({
  username: name,
   sessionId,
    question: firstQuestion
  });

});

router.post("/next", (req, res) => {

    const { sessionId } = req.body;

    const session = sessions[sessionId];

    if (!session) {
        return res.status(404).json({
            error: "Session not found"
        });
    }

    const currentQuestion = questions.find(
        q => q.id === session.currentQuestionId
    );

    if (!currentQuestion) {
        return res.status(404).json({
            error: "Question not found"
        });
    }

    if (!currentQuestion.next) {
        return res.json({
            finished: true
        });
    }

    const nextQuestion = questions.find(
        q => q.id === currentQuestion.next
    );

    session.currentQuestionId = nextQuestion.id;

    res.json({
        question: nextQuestion
    });

});

export default router;