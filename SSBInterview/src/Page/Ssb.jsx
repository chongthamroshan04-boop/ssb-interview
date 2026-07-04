import { useEffect, useRef, useState } from "react";

import useMicrophone from "../hooks/useMicrophone";
import useRecorder from "../hooks/useRecorder";
import useBrowserVoice from "../hooks/useBrowserVoice";

const TOTAL_QUESTIONS = 50;
const ANSWER_TIME_LIMIT = 60; // seconds

const Room = () => {
  const sessionId = localStorage.getItem("sessionId");

 const savedQuestion = localStorage.getItem("question");

const [question, setQuestion] = useState(
    savedQuestion ? JSON.parse(savedQuestion) : null
);
  const Microphone = useMicrophone();
  const Recorder = useRecorder(Microphone.streamRef);
  const { speak } = useBrowserVoice();

  // ---- New UI state ----
  const [isSpeaking, setIsSpeaking] = useState(false);
  // phase: "idle" -> waiting to start | "recording" | "stopped" -> saved, show playback
  const [phase, setPhase] = useState("idle");
  const [currentIndex, setCurrentIndex] = useState(1);
  const [answersRecorded, setAnswersRecorded] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(ANSWER_TIME_LIMIT);
  const [timeUp, setTimeUp] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [finished, setFinished] = useState(false);

  const timerRef = useRef(null);
  const startTimeRef = useRef(Date.now());
  const [totalMinutesTaken, setTotalMinutesTaken] = useState(0);

  // ---- Speak the question aloud ----
  function speakQuestion(q) {
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(q.Q);
    utterance.rate = 0.95;
    utterance.pitch = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);

    speechSynthesis.speak(utterance);
  }

  useEffect(() => {
    if (question) {
      speakQuestion(question);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [question]);

  // ---- Recording countdown timer ----
  useEffect(() => {
    if (phase === "recording") {
      setSecondsLeft(ANSWER_TIME_LIMIT);
      setTimeUp(false);

      timerRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            setTimeUp(true);
            clearInterval(timerRef.current);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timerRef.current);
  }, [phase]);

  const formatTime = (secs) => {
    const m = String(Math.floor(secs / 60)).padStart(2, "0");
    const s = String(secs % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  // ---- Recording controls ----
  const handleStartRecording = () => {
    Recorder.startRecording();
    setPhase("recording");
  };

  const handleStopRecording = () => {
    Recorder.stopRecording();
    clearInterval(timerRef.current);
    setPhase("stopped");
  };

  // Build a playable URL once a new audioBlob is available
  useEffect(() => {
    if (Recorder.audioBlob) {
      const url = URL.createObjectURL(Recorder.audioBlob);
      setAudioUrl(url);
      return () => URL.revokeObjectURL(url);
      
    }
  }, [Recorder.audioBlob]);

  // ---- Advance to next question ----
 const nextQuestion = async () => {
    try {

        const response = await fetch(
            "https://ssb-interview.onrender.com/interview/next",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ sessionId })
            }
        );

        if (!response.ok) {
            console.log(await response.text());
            return;
        }

        const data = await response.json();

        console.log(data);

        if (data.finished) {
            setFinished(true);
            return;
        }

        setQuestion(data.question);

        localStorage.setItem(
            "question",
            JSON.stringify(data.question)
        );

        setCurrentIndex(prev => prev + 1);

        setPhase("idle");

        setAudioUrl(null);

    } catch (err) {
        console.log(err);
    }
};

  // ---- Completion screen ----
  if (finished) {
    return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-6">
        <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl p-6 sm:p-10 text-center">
          <h1 className="text-3xl font-bold text-black mb-6">
            🎉 Interview Complete
          </h1>

          <div className="grid grid-cols-1 gap-4 text-left mt-8">
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">Questions Answered</span>
              <span className="font-semibold text-black">
                {answersRecorded}
              </span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">Time Taken</span>
              <span className="font-semibold text-black">
                {totalMinutesTaken} minutes
              </span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="text-gray-600">Answers Recorded</span>
              <span className="font-semibold text-black">
                {answersRecorded}
              </span>
            </div>
          </div>

          <p className="mt-8 text-lg text-black">
            Thank you for practising.
          </p>
        </div>
      </div>
    );
  }

  const progressPercent = Math.round((currentIndex / TOTAL_QUESTIONS) * 100);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
    <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-5 sm:p-8 lg:p-10">
       <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black"></h1>

        {/* Progress bar */}
        <div className="mt-6 mb-2">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>
              Question {currentIndex} / {TOTAL_QUESTIONS}
            </span>
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <p className="mt-6 text-lg sm:text-xl lg:text-2xl text-black leading-relaxed">{question?.Q}</p>

        {/* ---- Status box ---- */}
        <div className="mt-8 border border-gray-300 rounded-xl bg-gray-50 p-4 sm:p-6">
          {phase === "idle" && (
            <div className="text-center text-black">
              <p className="font-semibold mb-2">
                Question {currentIndex} of {TOTAL_QUESTIONS}
              </p>
              <p className="mb-4">{question?.Q}</p>
              <p>🎤 {isSpeaking ? "Listen carefully." : "Ready when you are."}</p>
              <p className="text-gray-600 text-sm mt-1">
                After the question finishes, press Start Recording.
              </p>
            </div>
          )}

          {phase === "recording" && (
            <div className="text-center">
              <p className="text-red-600 font-bold text-xl">🔴 Recording...</p>
              <p className="text-gray-700 mt-2">Speak naturally.</p>
              <p className="text-gray-500 text-sm">Don't worry about pauses.</p>
              <p className="mt-4 text-3xl sm:text-4xl font-mono font-bold text-black">
                {formatTime(secondsLeft)}
              </p>
              {timeUp && (
                <p className="text-red-600 mt-2 font-semibold">
                  Time's up. Press Stop Recording.
                </p>
              )}
            </div>
          )}

          {phase === "stopped" && (
            <div className="text-center">
              <p className="text-green-600 font-semibold text-xl mb-4">
                ✅ Recording saved
              </p>
              {audioUrl && (
                <audio controls src={audioUrl} className="mx-auto mb-4" />
              )}
            </div>
          )}
        </div>

        {/* ---- Controls ---- */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4">
          {phase === "idle" && (
            <button
              onClick={handleStartRecording}
              disabled={isSpeaking}
              className={`px-6 py-3 rounded-lg text-white ${
                isSpeaking
                  ? "bg-green-300 cursor-not-allowed"
                  : "bg-green-600 cursor-pointer"
              }`}
            >
              Start Recording
            </button>
          )}

          {phase === "recording" && (
            <button
              onClick={handleStopRecording}
              className="w-full sm:w-auto bg-green-600 hover:bg-green-700 transition text-white px-6 py-3 rounded-xl font-semibold cursor-pointer"
            >
              Stop Recording
            </button>
          )}

          {phase === "stopped" && (
            <button
              onClick={nextQuestion}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg cursor-pointer"
            >
              ➡ Next Question
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Room;