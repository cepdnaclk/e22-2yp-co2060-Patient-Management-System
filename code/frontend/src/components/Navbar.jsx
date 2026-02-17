import React from 'react';

const Navbar = () => {
    const navLinks = [
        { name: 'Dashboard', path: '/' },
        { name: 'Patients', path: '/patients' },
        { name: 'Profile', path: '/profile' },
        { name: 'Settings', path: '/settings' },
    ];

    const [isScrolled, setIsScrolled] = React.useState(false);
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
            // <nav className={`fixed top-0 left-0 bg-indigo-600 w-full flex items-center justify-between px-4 md:px-16 lg:px-24 xl:px-32 transition-all duration-500 z-50 ${isScrolled ? "bg-white/80 shadow-md text-gray-700 backdrop-blur-lg py-3 md:py-4" : "py-4 md:py-6"}`}>

            //     {/* Logo */}
            //     <a href="/" className="flex items-center gap-2">
            //         <span className={`text-xl font-bold ${isScrolled ? "text-gray-800" : "text-white"}`}>
            //             Patient Management System
            //         </span>
            //     </a>

            //     {/* Desktop Nav */}
            //     <div className="hidden md:flex items-center gap-4 lg:gap-8">
            //         {navLinks.map((link, i) => (
            //             <a key={i} href={link.path} className={`group flex flex-col gap-0.5 ${isScrolled ? "text-gray-700" : "text-white"}`}>
            //                 {link.name}
            //                 <div className={`${isScrolled ? "bg-gray-700" : "bg-white"} h-0.5 w-0 group-hover:w-full transition-all duration-300`} />
            //             </a>
            //         ))}
            //         <button className={`border px-4 py-1 text-sm font-light rounded-full cursor-pointer ${isScrolled ? 'text-gray-700 border-gray-700' : 'text-white border-white'} transition-all`}>
            //             Logout
            //         </button>
            //     </div>

            //     {/* Desktop Right */}
            //     <div className="hidden md:flex items-center gap-4">
            //         <svg className={`h-6 w-6 text-white transition-all duration-500 ${isScrolled ? "invert" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            //             <circle cx="11" cy="11" r="8" />
            //             <line x1="21" y1="21" x2="16.65" y2="16.65" />
            //         </svg>
            //         <button className={`px-6 py-2.5 rounded-full ml-4 transition-all duration-500 ${isScrolled ? "text-white bg-indigo-600" : "bg-white text-indigo-600"}`}>
            //             Profile
            //         </button>
            //     </div>

            //     {/* Mobile Menu Button */}
            //     <div className="flex items-center gap-3 md:hidden">
            //         <svg onClick={() => setIsMenuOpen(!isMenuOpen)} className={`h-6 w-6 cursor-pointer ${isScrolled ? "invert" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            //             <line x1="4" y1="6" x2="20" y2="6" />
            //             <line x1="4" y1="12" x2="20" y2="12" />
            //             <line x1="4" y1="18" x2="20" y2="18" />
            //         </svg>
            //     </div>

            //     {/* Mobile Menu */}
            //     <div className={`fixed top-0 left-0 w-full h-screen bg-white text-base flex flex-col md:hidden items-center justify-center gap-6 font-medium text-gray-800 transition-all duration-500 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}`}>
            //         <button className="absolute top-4 right-4" onClick={() => setIsMenuOpen(false)}>
            //             <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            //                 <line x1="18" y1="6" x2="6" y2="18" />
            //                 <line x1="6" y1="6" x2="18" y2="18" />
            //             </svg>
            //         </button>

            //         {navLinks.map((link, i) => (
            //             <a key={i} href={link.path} onClick={() => setIsMenuOpen(false)}>
            //                 {link.name}
            //             </a>
            //         ))}

            //         <button className="border px-4 py-1 text-sm font-light rounded-full cursor-pointer transition-all border-gray-800 text-gray-800">
            //             Logout
            //         </button>

            //         <button className="bg-indigo-600 text-white px-6 py-2.5 rounded-full transition-all duration-500">
            //             Profile
            //         </button>
            //     </div>
            // </nav>
            <header class="flex shadow-md py-4 px-4 sm:px-10 bg-white min-h-[70px] tracking-wide relative z-50">
      <div class="flex flex-wrap items-center justify-between gap-5 w-full">
        <a href="javascript:void(0)" class="max-sm:hidden"><img src="https://readymadeui.com/readymadeui.svg" alt="logo" class="w-36" /></a>
        <a href="javascript:void(0)" class="hidden max-sm:block"><img src="https://readymadeui.com/readymadeui-short.svg" alt="logo" class="w-9" /></a>

        <div id="collapseMenu"
          class="max-lg:hidden lg:!block max-lg:before:fixed max-lg:before:bg-black max-lg:before:opacity-50 max-lg:before:inset-0 max-lg:before:z-50">
          <button id="toggleClose" class="lg:hidden fixed top-2 right-4 z-[100] rounded-full bg-white w-9 h-9 flex items-center justify-center border border-gray-200 cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 fill-black" viewBox="0 0 320.591 320.591">
              <path
                d="M30.391 318.583a30.37 30.37 0 0 1-21.56-7.288c-11.774-11.844-11.774-30.973 0-42.817L266.643 10.665c12.246-11.459 31.462-10.822 42.921 1.424 10.362 11.074 10.966 28.095 1.414 39.875L51.647 311.295a30.366 30.366 0 0 1-21.256 7.288z"
                data-original="#000000"></path>
              <path
                d="M287.9 318.583a30.37 30.37 0 0 1-21.257-8.806L8.83 51.963C-2.078 39.225-.595 20.055 12.143 9.146c11.369-9.736 28.136-9.736 39.504 0l259.331 257.813c12.243 11.462 12.876 30.679 1.414 42.922-.456.487-.927.958-1.414 1.414a30.368 30.368 0 0 1-23.078 7.288z"
                data-original="#000000"></path>
            </svg>
          </button>

          <ul
            class="lg:flex gap-x-4 max-lg:space-y-3 max-lg:fixed max-lg:bg-white max-lg:w-1/2 max-lg:min-w-[300px] max-lg:top-0 max-lg:left-0 max-lg:p-6 max-lg:h-full max-lg:shadow-md max-lg:overflow-auto z-50">
            <li class="mb-6 hidden max-lg:block">
              <a href="javascript:void(0)"><img src="https://readymadeui.com/readymadeui.svg" alt="logo" class="w-36" />
              </a>
            </li>
            <li class="max-lg:border-b max-lg:border-gray-300 max-lg:py-3 px-3">
              <a href='javascript:void(0)'
                class="hover:text-blue-700 text-blue-700 block font-medium text-[15px]">Home</a>
            </li>
            <li class="max-lg:border-b max-lg:border-gray-300 max-lg:py-3 px-3"><a href='javascript:void(0)'
              class="hover:text-blue-700 text-slate-900 block font-medium text-[15px]">Team</a>
            </li>
            <li class="max-lg:border-b max-lg:border-gray-300 max-lg:py-3 px-3"><a href='javascript:void(0)'
              class="hover:text-blue-700 text-slate-900 block font-medium text-[15px]">Feature</a>
            </li>
            <li class="max-lg:border-b max-lg:border-gray-300 max-lg:py-3 px-3"><a href='javascript:void(0)'
              class="hover:text-blue-700 text-slate-900 block font-medium text-[15px]">Blog</a>
            </li>
            <li class="max-lg:border-b max-lg:border-gray-300 max-lg:py-3 px-3"><a href='javascript:void(0)'
              class="hover:text-blue-700 text-slate-900 block font-medium text-[15px]">About</a>
            </li>
            <li class="max-lg:border-b max-lg:border-gray-300 max-lg:py-3 px-3"><a href='javascript:void(0)'
              class="hover:text-blue-700 text-slate-900 block font-medium text-[15px]">Contact</a>
            </li>
          </ul>
        </div>

        <div class="flex max-lg:ml-auto space-x-4">
          <button
            class="px-4 py-2 text-sm rounded-full font-medium cursor-pointer tracking-wide text-slate-900 border border-gray-400 bg-transparent hover:bg-gray-50 transition-all">Login</button>
          <button
            class="px-4 py-2 text-sm rounded-full font-medium cursor-pointer tracking-wide text-white border border-blue-600 bg-blue-600 hover:bg-blue-700 transition-all">Sign
            up</button>

          <button id="toggleOpen" class="lg:hidden cursor-pointer">
            <svg class="w-7 h-7" fill="#000" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
    );
}

export default Navbar;


