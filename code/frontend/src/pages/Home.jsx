import React from "react";
const Home = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <section className="flex flex-col items-center">
      <nav className="flex flex-col items-center w-full">
        <div className="flex items-center justify-between p-4 md:px-16 lg:px-24 xl:px-32 md:py-4 w-full">
          <a href="https://prebuiltui.com">
            <svg
              width="157"
              height="40"
              viewBox="0 0 157 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M47.154 28.28q-1.54 0-2.744-.644a5.1 5.1 0 0 1-1.904-1.82q-.672-1.148-.672-2.604v-3.864q0-1.456.7-2.604a4.9 4.9 0 0 1 1.904-1.792q1.204-.672 2.716-.672 1.82 0 3.276.952a6.44 6.44 0 0 1 2.324 2.52q.868 1.567.868 3.556 0 1.96-.868 3.556a6.5 6.5 0 0 1-2.324 2.492q-1.455.924-3.276.924m-7.196 5.32V14.56h3.08v3.612l-.532 3.276.532 3.248V33.6zm6.692-8.232q1.12 0 1.96-.504a3.6 3.6 0 0 0 1.344-1.456q.504-.924.504-2.128t-.504-2.128a3.43 3.43 0 0 0-1.344-1.428q-.84-.532-1.96-.532t-1.988.532a3.43 3.43 0 0 0-1.344 1.428q-.476.924-.476 2.128t.476 2.128a3.6 3.6 0 0 0 1.344 1.456q.869.504 1.988.504M56.2 28V14.56h3.08V28zm3.08-7.476-1.064-.532q0-2.548 1.12-4.116 1.149-1.596 3.444-1.596 1.009 0 1.82.364.813.365 1.512 1.176l-2.016 2.072a2.1 2.1 0 0 0-.812-.56 3 3 0 0 0-1.036-.168q-1.287 0-2.128.812-.84.811-.84 2.548m14.157 7.756q-2.016 0-3.64-.896a7 7 0 0 1-2.548-2.52q-.924-1.596-.924-3.584t.924-3.556a6.87 6.87 0 0 1 2.492-2.52q1.596-.924 3.528-.924 1.876 0 3.304.868a6.05 6.05 0 0 1 2.268 2.38q.84 1.512.84 3.444-.001.336-.056.7a7 7 0 0 1-.112.756H68.48v-2.52h9.436l-1.148 1.008q-.056-1.232-.476-2.072a3 3 0 0 0-1.204-1.288q-.757-.448-1.876-.448-1.176 0-2.044.504a3.43 3.43 0 0 0-1.344 1.428q-.476.896-.476 2.156t.504 2.212 1.428 1.484q.924.504 2.128.504 1.035 0 1.904-.364a4 4 0 0 0 1.512-1.064l1.96 1.988a6.3 6.3 0 0 1-2.38 1.736 7.6 7.6 0 0 1-2.968.588m15.909 0q-1.54 0-2.744-.644a5.1 5.1 0 0 1-1.904-1.82q-.672-1.148-.672-2.604v-3.864q0-1.456.7-2.604a4.9 4.9 0 0 1 1.904-1.792q1.204-.672 2.716-.672 1.82 0 3.276.952a6.44 6.44 0 0 1 2.324 2.52q.867 1.567.868 3.556 0 1.96-.868 3.556a6.5 6.5 0 0 1-2.324 2.492q-1.457.924-3.276.924M82.15 28V7.84h3.08v10.024l-.532 3.248.532 3.276V28zm6.692-2.632q1.12 0 1.96-.504a3.6 3.6 0 0 0 1.344-1.456q.504-.924.504-2.128t-.504-2.128a3.43 3.43 0 0 0-1.344-1.428q-.84-.532-1.96-.532t-1.988.532a3.43 3.43 0 0 0-1.344 1.428q-.476.924-.476 2.128t.476 2.128a3.6 3.6 0 0 0 1.344 1.456q.867.504 1.988.504m15.066 2.912q-1.708 0-3.052-.756a5.5 5.5 0 0 1-2.072-2.072q-.728-1.344-.728-3.08V14.56h3.08v7.672q0 .98.308 1.68.336.672.952 1.036.644.364 1.512.364 1.344 0 2.044-.784.728-.812.728-2.296V14.56h3.08v7.812q0 1.764-.756 3.108a5.3 5.3 0 0 1-2.044 2.072q-1.317.728-3.052.728m8.977-.28V14.56h3.08V28zm1.54-15.904q-.785 0-1.316-.532-.504-.532-.504-1.316t.504-1.316a1.8 1.8 0 0 1 1.316-.532q.812 0 1.316.532t.504 1.316-.504 1.316-1.316.532M119.419 28V7.84h3.08V28zm8.552 0V8.96h3.08V28zm-3.22-10.64v-2.8h9.52v2.8zm17.274 10.92q-1.708 0-3.052-.756a5.5 5.5 0 0 1-2.072-2.072q-.728-1.344-.728-3.08V14.56h3.08v7.672q0 .98.308 1.68.336.672.952 1.036.643.364 1.512.364 1.344 0 2.044-.784.728-.812.728-2.296V14.56h3.08v7.812q0 1.764-.756 3.108a5.3 5.3 0 0 1-2.044 2.072q-1.316.728-3.052.728m8.977-.28V14.56h3.08V28zm1.54-15.904q-.784 0-1.316-.532-.504-.532-.504-1.316t.504-1.316a1.8 1.8 0 0 1 1.316-.532q.812 0 1.316.532t.504 1.316-.504 1.316-1.316.532"
                fill="#050040"
              />
              <path
                d="m8 11.3 6.75 3.884 6.75-3.885M8 34.58v-7.755L1.25 22.94m27 0-6.75 3.885v7.754M1.655 15.408l13.095 7.546 13.095-7.546M14.75 38V22.939m13.5 5.976V16.962a2.98 2.98 0 0 0-1.5-2.585L16.25 8.4a3.01 3.01 0 0 0-3 0l-10.5 5.977a3 3 0 0 0-1.5 2.585v11.953a2.98 2.98 0 0 0 1.5 2.585l10.5 5.977a3.01 3.01 0 0 0 3 0l10.5-5.977a3 3 0 0 0 1.5-2.585"
                stroke="#050040"
                stroke-width="2.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </a>
          <div
            id="menu"
            className={`${mobileOpen ? "max-md:w-full" : "max-md:w-0"} max-md:fixed max-md:top-0 max-md:z-10 max-md:left-0 max-md:transition-all max-md:duration-300 max-md:overflow-hidden max-md:h-screen max-md:bg-white/25 max-md:backdrop-blur max-md:flex-col max-md:justify-center flex items-center gap-8 text-sm`}
          >
            <a
              href="#"
              onClick={() => setMobileOpen(false)}
              className="text-[#050040] hover:text-[#050040]/70"
            >
              Home
            </a>
            <a
              href="#"
              onClick={() => setMobileOpen(false)}
              className="text-[#050040] hover:text-[#050040]/70"
            >
              Products
            </a>
            <a
              href="#"
              onClick={() => setMobileOpen(false)}
              className="text-[#050040] hover:text-[#050040]/70"
            >
              Features
            </a>
            <a
              href="#"
              onClick={() => setMobileOpen(false)}
              className="text-[#050040] hover:text-[#050040]/70"
            >
              Pricing
            </a>
            <a
              href="#"
              onClick={() => setMobileOpen(false)}
              className="text-[#050040] hover:text-[#050040]/70"
            >
              Docs
            </a>

            <button
              id="close-menu"
              onClick={() => setMobileOpen(false)}
              className="md:hidden bg-zinc-900 hover:bg-zinc-800 text-white p-2 rounded-md aspect-square font-medium transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <button className="active:scale-95 hover:bg-indigo-50/50 transition px-4 py-2 border border-indigo-600 rounded-md text-slate-800 cursor-pointer">
              Sign in
            </button>
            <button className="text-white px-4 py-2 bg-indigo-600 active:scale-95 hover:bg-indigo-700 transition rounded-md cursor-pointer">
              Get started
            </button>
          </div>
          <button
            id="open-menu"
            onClick={() => setMobileOpen(true)}
            className="md:hidden bg-zinc-900 hover:bg-zinc-800 text-white p-2 rounded-md aspect-square font-medium transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {" "}
              <path d="M4 12h16" /> <path d="M4 18h16" />{" "}
              <path d="M4 6h16" />{" "}
            </svg>
          </button>
        </div>
        <div className="w-full border-b border-slate-200"></div>
      </nav>

      <a
        href="https://prebuiltui.com"
        className="flex items-center gap-2 bg-indigo-100 rounded-full p-1 pr-3 text-sm mt-23"
      >
        <span className="bg-indigo-600 text-white text-xs px-3 py-1 rounded-full">
          NEW
        </span>
        <p className="flex items-center gap-2 text-indigo-600">
          <span className="text-sm">Try 30 days free trial option</span>
          <svg
            className="mt-px"
            width="6"
            height="9"
            viewBox="0 0 6 9"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="m1 1 4 3.5L1 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </p>
      </a>

      <h1 className="text-center text-slate-800 text-4xl md:text-5xl/16 font-semibold max-w-3xl leading-tight bg-clip-text my-2.5 px-4">
        Reliable{" "}
        <span className="bg-linear-to-r from-indigo-600 to-pink-400 bg-clip-text text-transparent">
          automation
        </span>{" "}
        to boost your team’s efficiency
      </h1>
      <p className="text-center text-base text-gray-600 max-w-md px-4">
        Workflows that never miss. automation that helps your team do more,
        effortlessly.
      </p>

      <div className="flex items-center gap-4 mt-5 justify-center z-1">
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md cursor-pointer">
          Get Started
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
          AI Features
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
