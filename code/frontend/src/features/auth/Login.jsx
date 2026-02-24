import axios from "axios";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const history = useNavigate();

  const handleLogin = async () => {
    try {
      if (!username || !password) {
        setError("Please enter both username and password.");
        return;
      }

      const response = await axios.post("http://localhost:8081/auth/signin", {
        username,
        password,
      });
      console.log("Login successful:", response.data);
      history("/dashboard");
    } catch (error) {
      console.error(
        "Login failed:",
        error.response ? error.response.data : error.message,
      );
      setError("Invalid username or password.");
    }
  };
  return (
    <div>
      <div class="bg-linear-to-r from-blue-800 to-blue-400">
        <div class="min-h-screen flex fle-col items-center justify-center p-6">
          <div class="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
            <div class="max-w-lg max-md:mx-auto max-md:text-center">
              <h1 class="text-4xl font-semibold leading-tight! text-white">
                Secure Your Health
              </h1>

              <p class="text-[15px] mt-12 text-white">
                Don't have an account{" "}
                <NavLink
                  to="/signup"
                  class="text-white underline font-semibold  ml-1 "
                >
                  Register here
                </NavLink>
              </p>
            </div>

            <form class="bg-white rounded-xl px-8 py-12 max-w-md md:ml-auto max-md:mx-auto w-full">
              <h2 class="text-slate-900 text-3xl font-bold mb-12">Sign in</h2>
              <div class="space-y-4">
                <div>
                  <input
                    name="email"
                    type="email"
                    autocomplete="email"
                    required
                    class="bg-gray-100 focus:bg-transparent w-full text-sm px-4 py-3 rounded-md outline-gray-800"
                    placeholder="Email address"
                    id="email"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div>
                  <input
                    name="password"
                    type="password"
                    autocomplete="current-password"
                    required
                    class="bg-gray-100 focus:bg-transparent w-full text-sm px-4 py-3 rounded-md outline-gray-800"
                    placeholder="Password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div class="text-sm text-right">
                  <a
                    href="jajvascript:void(0);"
                    class="text-blue-600 font-medium hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>
              <div class="mt-12">
                <button
                  type="button"
                  class="w-full shadow-xl py-2 px-6 text-[15px] font-medium rounded-md text-white bg-slate-800 hover:bg-slate-900 focus:outline-0 cursor-pointer"
                >
                  Sign in
                </button>
              </div>

              <p class="my-6 text-sm text-slate-600 text-center">
                or continue with
              </p>

              <div class="space-x-6 flex justify-center">
                <button type="button" class="border-0 outline-0 cursor-pointer">
                  {" "}
                  <img src="/google-48.png" alt="logo" className="w-7 h-7 " />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
