import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mobile, setMobileNumber] = useState("");
  const [error, setError] = useState(""); // State to manage error messages
  const history = useNavigate();

  const handleSignup = async () => {
    try {
      // Check for empty fields
      if (!fullName || !email || !password || !confirmPassword || !mobile) {
        setError("Please fill in all fields.");
        return;
      }

      if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const response = await axios.post("http://localhost:8081/auth/signup", {
        fullName,
        email,
        password,
        role,
        mobile,
      });
      // Handle successful signup
      console.log(response.data);
      saveLogin(response.data.token, response.data.user);
      navigate("/");

    } catch (error) {
      // Handle signup error
      console.error("Signup failed:", error);

      // FIX: Extract the specific string message, or use a fallback string
      const errorMessage =
        error.response?.data?.message || "Signup failed. Please try again.";
      setError(errorMessage);
      setError(error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <div className="text-center bg-linear-to-r from-blue-800 to-blue-400 min-h-45 sm:p-6 p-4">
        <h1 className="sm:text-3xl text-2xl text-white font-medium mt-3">
          Create your free account
        </h1>
        {error && <p className="text-danger">{error}</p>}
      </div>

      <div className="mx-4 mb-4 -mt-20">
        <form className="max-w-4xl max-md:max-w-xl mx-auto bg-white [box-shadow:0_2px_13px_-6px_rgba(0,0,0,0.4)] sm:p-8 p-4 rounded-md">
          <div className="grid md:grid-cols-1">
            <button
              type="button"
              className="w-full px-4 py-2.5 flex items-center justify-center rounded-md text-slate-900 text-sm font-medium tracking-wider cursor-pointer border-0 outline-0 bg-slate-100 hover:bg-slate-200"
            >
              <img
                src="/google-48.png"
                alt="logo"
                className="w-7.5 h-7.5 mr-2"
              />
              Continue with Google
            </button>
          </div>

          <div className="my-6 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
            <p className="mx-4 text-center text-slate-500">Or</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <label className="text-slate-900 text-sm font-medium mb-2 block">
                First Name
              </label>
              <input
                name="firstname"
                className="bg-slate-100 focus:bg-transparent w-full text-sm text-slate-900 px-4 py-2.5 rounded-sm border border-gray-200 focus:border-blue-600 outline-0 transition-all"
                id="firstName"
                placeholder={"First Name"}
                value={firstName}
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-slate-900 text-sm font-medium mb-2 block">
                Last Name
              </label>
              <input
                name="lasttname"
                className="bg-slate-100 focus:bg-transparent w-full text-sm text-slate-900 px-4 py-2.5 rounded-sm border border-gray-200 focus:border-blue-600 outline-0 transition-all"
                id="lastName"
                placeholder={"Last Name"}
                value={lastName}
                type="text"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div>
              <label className="text-slate-900 text-sm font-medium mb-2 block">
                Email Id
              </label>
              <input
                name="email"
                className="bg-slate-100 focus:bg-transparent w-full text-sm text-slate-900 px-4 py-2.5 rounded-sm border border-gray-200 focus:border-blue-600 outline-0 transition-all"
                placeholder="Email Address"
                id="email"
                value={email}
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="text-slate-900 text-sm font-medium mb-2 block">
                Mobile No.
              </label>
              <input
                name="number"
                className="bg-slate-100 focus:bg-transparent w-full text-sm text-slate-900 px-4 py-2.5 rounded-sm border border-gray-200 focus:border-blue-600 outline-0 transition-all"
                placeholder="Mobile Number"
                id="mobileNumber"
                value={mobile}
                type="text"
                onChange={(e) => setMobileNumber(e.target.value)}
              />
            </div>
            <div>
              <label className="text-slate-900 text-sm font-medium mb-2 block">
                Password
              </label>
              <input
                name="password"
                className="bg-slate-100 focus:bg-transparent w-full text-sm text-slate-900 px-4 py-2.5 rounded-sm border border-gray-200 focus:border-blue-600 outline-0 transition-all"
                placeholder="Password"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <label className="text-slate-900 text-sm font-medium mb-2 block">
                Confirm Password
              </label>
              <input
                name="cpassword"
                className="bg-slate-100 focus:bg-transparent w-full text-sm text-slate-900 px-4 py-2.5 rounded-sm border border-gray-200 focus:border-blue-600 outline-0 transition-all"
                placeholder="Confirm Password"
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="mt-8">
            <button
              type="button"
              className="w-full py-2.5 px-5 text-sm font-medium tracking-wider rounded-sm cursor-pointer text-white bg-blue-600 hover:bg-blue-700 focus:outline-0"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
