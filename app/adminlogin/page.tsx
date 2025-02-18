"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { PiEye, PiEyeSlash } from "react-icons/pi";

const Adminlogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("https://fermeclement.site/api/adminlogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Mot de passe ou email non correcte!");
      }

      const data = await response.json();

      if (data.message === "Login successful") {
        router.push(`/admindashboard`);
        // Store the email or reset token in sessionStorage
        sessionStorage.setItem("loginEmail", data.email);
      } else {
        setError(
          "Une erreur s'est produite lors de la tentative de connexion. Veuillez réessayer!"
        );
      }
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Erreur inconnue. Veuillez contacter votre administrateur!");
      }
    }
  };

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
      <div className="relative flex flex-col justify-center items-center w-full max-w-lg bg-white rounded-xl shadow-lg overflow-hidden p-6 lg:p-10">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-4">
          Se connecter
        </h2>
        <p className="text-gray-700 text-center mb-8">
          Entrez votre adresse e-mail et mot de passe pour vous connecter.
        </p>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form className="space-y-6 w-full" onSubmit={handleLogin}>
          {/* Email Input */}
          <div>
            <input
              type="email"
              placeholder="Adresse e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-900 w-full px-4 py-2 bg-white text-black rounded-full transition duration-300"
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
              className="border border-gray-900 w-full px-4 py-2 bg-white text-black rounded-full transition duration-300"
              required
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute inset-y-0 right-4 flex items-center text-gray-800 hover:text-gray-200"
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
            className="w-full bg-custom-green text-white font-semibold py-2 rounded-full hover:bg-custom-button hover:text-white hover:shadow-md transition-transform transform duration-500 hover:scale-105"
          >
            Se connecter
          </button>
        </form>

        {/* Footer Section */}
        <p className="text-gray-600 text-sm text-center mt-6">
          Mot de passe oublier ?
          <a
            href="/admin/requestemailcode"
            className="hover:text-gray-800 underline transition"
          >
            Changez le ici
          </a>
        </p>
      </div>
    </main>
  );
};

export default Adminlogin;
