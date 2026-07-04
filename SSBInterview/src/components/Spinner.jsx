import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Spinner = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("name");
    const surname = localStorage.getItem("surname");

    fetch("http://localhost:5000/interview/start", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        surname,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Backend returned:", data);

        localStorage.setItem("sessionId", data.sessionId);
        localStorage.setItem(
          "question",
          JSON.stringify(data.question)
        );

        setTimeout(() => {
          navigate("/ssb");
        }, 1800);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-xl p-8 sm:p-10 text-center">

        {/* Spinner */}
        <div className="flex justify-center">
          <div className="w-16 h-16 border-[6px] border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>

        {/* Title */}
        <h1 className="mt-8 text-2xl sm:text-3xl font-bold text-gray-900">
          Preparing Your Interview
        </h1>

        {/* Description */}
        <p className="mt-4 text-gray-600 text-sm sm:text-base leading-relaxed">
          Please wait while we create your interview session and load your first
          question.
        </p>

        {/* Progress */}
        <div className="mt-8">
          <div className="w-full h-2 rounded-full bg-gray-200 overflow-hidden">
            <div className="h-full w-1/2 bg-blue-600 animate-pulse rounded-full"></div>
          </div>
        </div>

        {/* Status */}
        <p className="mt-6 text-blue-600 font-medium animate-pulse">
          Starting...
        </p>
      </div>
    </div>
  );
};

export default Spinner;