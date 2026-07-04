import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [surname, setSurname] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const Rule = () => {
    if (surname.trim() !== "" && name.trim() !== "") {
      localStorage.setItem("name", name);
      localStorage.setItem("surname", surname);

      navigate("/spinner");
    } else {
      alert("Please enter your surname and first name.");
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center relative overflow-hidden px-4 sm:px-6 py-8">

      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        <div className="absolute -top-40 -left-40 w-[420px] h-[420px] md:w-[620px] md:h-[620px] bg-red-700/10 rounded-full blur-[130px]" />

        <div className="absolute -bottom-40 -right-40 w-[420px] h-[420px] md:w-[620px] md:h-[620px] bg-red-900/10 rounded-full blur-[130px]" />

        <div className="absolute inset-0 opacity-[0.03]
        [background-image:linear-gradient(#ffffff_1px,transparent_1px),linear-gradient(90deg,#ffffff_1px,transparent_1px)]
        [background-size:40px_40px]" />

      </div>

      {/* Card */}
      <div
        className="
        relative
        w-full
        max-w-md
        lg:max-w-lg
        bg-neutral-950/90
        backdrop-blur-xl
        border
        border-neutral-800
        rounded-3xl
        shadow-2xl
        px-6
        sm:px-10
        py-8
        sm:py-12
        "
      >
        {/* Live Badge */}
        <div className="flex justify-center mb-8">

          <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-red-900/40 bg-red-950/30">

            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
            </span>

            <span className="uppercase tracking-[0.2em] text-red-400 text-[10px] font-semibold">
              Live Session
            </span>

          </div>

        </div>

        {/* Heading */}
        <div className="text-center">

          <h1 className="text-3xl sm:text-4xl font-bold text-white">
            Step into the chair
          </h1>

          <p className="mt-4 text-sm sm:text-base text-neutral-400 leading-relaxed max-w-sm mx-auto">
            Tell us who's interviewing today. We'll prepare your first interview
            question immediately.
          </p>

        </div>

        {/* Form */}
        <div className="mt-10 space-y-5">

          {/* Surname */}
          <div>

            <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">
              Surname
            </label>

            <input
              type="text"
              placeholder="e.g. Sharma"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              className="
              w-full
              rounded-2xl
              border
              border-neutral-800
              bg-neutral-900
              px-4
              py-3.5
              text-white
              placeholder-neutral-600
              outline-none
              transition
              focus:border-red-600
              focus:ring-4
              focus:ring-red-600/20
              "
            />

          </div>

          {/* First Name */}
          <div>

            <label className="block text-xs uppercase tracking-widest text-neutral-500 mb-2">
              First Name
            </label>

            <input
              type="text"
              placeholder="e.g. Roshan"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="
              w-full
              rounded-2xl
              border
              border-neutral-800
              bg-neutral-900
              px-4
              py-3.5
              text-white
              placeholder-neutral-600
              outline-none
              transition
              focus:border-red-600
              focus:ring-4
              focus:ring-red-600/20
              "
            />

          </div>

        </div>

        {/* Button */}
        <button
          onClick={Rule}
          className="
          mt-8
          w-full
          rounded-2xl
          bg-red-600
          hover:bg-red-700
          active:scale-95
          transition
          text-white
          py-4
          font-semibold
          text-base
          shadow-lg
          shadow-red-900/40
          "
        >
          Start Interview
        </button>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-neutral-500">
          Your name stays on this device only.
        </p>

      </div>

    </div>
  );
};

export default Navbar;