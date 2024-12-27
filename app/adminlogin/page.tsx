"use client";
import { useState } from "react";
import { PiEye, PiEyeSlash } from "react-icons/pi";

const Adminlogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <main className="flex items-center justify-center min-h-screen bg-gray-900">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/farmpic.jpg')" }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 opacity-80" />

      {/* Centered Login Card */}
      <div className="relative flex flex-col justify-center items-center w-full max-w-lg bg-gray-800 bg-opacity-90 rounded-xl shadow-lg overflow-hidden p-6 lg:p-10">
        <h2 className="text-3xl font-bold text-white text-center mb-4">
          Se connecter
        </h2>
        <p className="text-gray-300 text-center mb-8">
          Entrez votre adresse e-mail et mot de passe pour vous connecter.
        </p>

        <form className="space-y-6 w-full" onSubmit={() => {}}>
          {/* Email Input */}
          <div>
            <input
              type="email"
              placeholder="Adresse e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
              required
            />
          </div>

          {/* Password Input with Toggle */}
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 text-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
              required
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-200"
            >
              {passwordVisible ? (
                <PiEyeSlash className="text-xl" />
              ) : (
                <PiEye className="text-xl" />
              )}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-gray-600 to-gray-500 text-white font-semibold py-2 rounded-full hover:from-gray-500 hover:to-gray-400 hover:shadow-md transition-transform transform duration-500 hover:scale-105"
          >
            Se connecter
          </button>
        </form>

        {/* Footer Section */}
        <p className="text-gray-400 text-sm text-center mt-6">
          Mot de passe oublier ?
          <a
            href="#"
            className="text-gray-200 hover:text-gray-100 underline transition"
          >
            Changez le ici
          </a>
        </p>
        <a href="admindashboard">Go to admin dashboard</a>
      </div>
    </main>
  );
};

export default Adminlogin;
