import React, { useState, useEffect } from "react";
import notesImage from "../assets/note.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../redux/actions/UserActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      toast.error(`Signup unsuccessful`);
    }
    if (user) {
      toast.success("Signup successful! Redirecting to login...");
      setTimeout(() => navigate("/"), 3000); // Redirect after 3 seconds
    }
  }, [error, user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signupUser({ name, email, password }));
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-24 w-auto"
          src={notesImage}
          alt="Your Company"
        />
        <h2 className="mt-10 text-center font-extrabold text-5xl md:text-5xl lg:text-5xl  leading-9 tracking-tight text-gray-900">
          Lets get you{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
            Signed up
          </span>
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
            </div>
            <div className="mt-2">
              <input
                type="name"
                name="name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                placeholder="Enter Your Name"
                required
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                E-Mail
              </label>
            </div>
            <div className="mt-2">
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                placeholder="Enter Your E-Mail"
                required
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                placeholder="Type your password"
                required
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {loading ? "Processing..." : "Sign up"}
            </button>
          </div>
        </form>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <p className="mt-5 text-center text-sm text-gray-500">
          Already a member?{" "}
          <a
            href="/"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
