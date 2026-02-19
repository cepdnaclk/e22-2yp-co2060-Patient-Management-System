import React from "react";
const Home = () => {
  return (
    <section className="flex flex-col items-center">
      <h1 className="pt-20 text-center text-slate-800 text-4xl md:text-5xl/16 font-semibold max-w-3xl leading-tight bg-clip-text my-2.5 px-4">
        Patient{" "}
        <span className="bg-linear-to-r from-indigo-600 to-pink-400 bg-clip-text text-transparent">
          Management
        </span>{" "}
        System
      </h1>
      <p className="text-center text-base text-gray-600 max-w-md px-4">
        Workflows that never miss. automation that helps your team do more,
        effortlessly.
      </p>

      <div className="flex items-center gap-4 mt-5 justify-center z-1">
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md cursor-pointer">
          Login
        </button>
        <button className="flex items-center gap-2 text-indigo-600 border border-indigo-600 hover:bg-indigo-50/50 px-6 py-3 rounded-md active:scale-95 transition cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z" />
            <path d="M20 2v4" />
            <path d="M22 4h-4" />
            <circle cx="4" cy="20" r="2" />
          </svg>
          Sign Up
        </button>
      </div>

      <div className="relative mt-12 w-full max-w-4xl px-4">
        <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 w-full h-full bg-[#d7bef4] blur-[100px] opacity-70 z-0"></div>
        <img
          className="relative z-1 w-full object-cover object-top"
          src="https://assets.prebuiltui.com/images/components/hero-section/hero-dashImage2.png"
          alt=""
        />
      </div>
    </section>
  );
};

export default Home;
