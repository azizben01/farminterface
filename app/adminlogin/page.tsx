"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import { PiEnvelope, PiEye, PiEyeSlash, PiLock } from "react-icons/pi";

const Adminlogin = () => {
  const [email, setEmail] = useState("");
  const [MotDePasse, setMotDePasse] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("https://fermeclement.site/api/adminlogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, mot_de_passe: MotDePasse }),
      });

      if (!response.ok) {
        throw new Error("Mot de passe ou email incorrecte!");
      }

      const data = await response.json();

      if (data.message === "Login successful") {
        router.push(`/admindashboard`);
        // // Store the email or reset token in sessionStorage
        // sessionStorage.setItem("loginEmail", data.email);
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
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black opacity-70" />
      {/* Centered Login Card */}
      <div className="w-full max-w-xl mx-4 sm:mx-6 md:mx-8 bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-white/20">
        {/* Brand Header */}
        <div className="bg-custom-button p-4 sm:p-6 flex flex-col items-center">
          <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 relative mb-4">
            <Image
              src="/images/logo.png"
              alt="Ferme Clément Admin"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center">
            Espace Administrateur
          </h1>
        </div>

        {/* Form Section */}
        <div className="p-4 sm:p-6 md:p-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 text-center mb-2">
            Connexion Sécurisée
          </h2>
          <p className="text-sm sm:text-base text-gray-600 text-center mb-6">
            Accédez à votre tableau de bord
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 flex-shrink-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-xs sm:text-sm">{error}</span>
            </div>
          )}

          <form className="space-y-4 sm:space-y-5" onSubmit={handleLogin}>
            {/* Email Field */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <PiEnvelope className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  placeholder="admin@ferme-clement.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block text-black w-full pl-10 pr-3 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg bg-white/50 focus:ring-2 focus:ring-custom-button focus:border-transparent transition duration-200"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">
                Mot de passe
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <PiLock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={passwordVisible ? "text" : "password"}
                  placeholder="••••••••"
                  value={MotDePasse}
                  onChange={(e) => setMotDePasse(e.target.value)}
                  className="block text-black w-full pl-10 pr-10 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg bg-white/50 focus:ring-2 focus:ring-custom-button focus:border-transparent transition duration-200"
                  required
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {passwordVisible ? (
                    <PiEyeSlash className="h-5 w-5" />
                  ) : (
                    <PiEye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="text-xs sm:text-sm">
                <a
                  href="/admin/requestemailcode"
                  className="font-medium text-custom-button hover:text-custom-button-dark"
                >
                  Mot de passe oublié?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-2.5 sm:py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm sm:text-base font-medium text-white bg-custom-button hover:bg-custom-button-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-custom-button transition duration-200 ${
                isLoading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span className="text-sm sm:text-base">
                    Connexion en cours...
                  </span>
                </>
              ) : (
                "Se connecter"
              )}
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="px-4 sm:px-8 py-3 sm:py-4 bg-gray-50 text-center">
          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Ferme Clément. Tous droits réservés.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Adminlogin;
