import { randomUUID } from "crypto";
import questions from "../data/questions.js";
export const sessions = {};

function SessionFuction(username) {

    const SessionID = randomUUID();

    sessions[SessionID] = {
        username,
        currentQuestionId: questions[0].id,
        answers: [],
        startTime: Date.now()
    };

    return SessionID;
}

export default SessionFuction;