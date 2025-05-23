// pages/connexion.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PiEyeSlash, PiEye } from "react-icons/pi";

const Connexion = () => {
  const [username, setUsername] = useState("");
  const [MotDePasse, setMotDePasse] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = {
      username,
      mot_de_passe: MotDePasse,
    };

    console.log("Data being sent to backend:", formData);

    // Simulate login API call
    try {
      const response = await fetch(
        "https://fermeclement.site/api/userlogin",
        //"http://192.168.1.8:5050/userlogin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, mot_de_passe: MotDePasse }),
        }
      );

      if (!response.ok) {
        throw new Error("Nom d'utilisateur ou mot de passe incorrect.");
      }

      // Redirect to dashboard or home page after successful login
      alert("Connexion réussite!");
      router.push("/homepage");
    } catch (err) {
      setError("Nom d'utilisateur ou mot de passe incorrect.");
      console.error("Nom d'utilisateur ou mot de passe incorrect:", err);
    }
  };

  return (
    <main className="h-screen container mx-auto p-4 text-center flex flex-col justify-center items-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center md:bg-fixed"
        style={{ backgroundImage: "url('/images/trees.jpg')" }}
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black opacity-70" />

      {/* Content */}
      <div className="relative space-y-6 bg-white bg-opacity-60 rounded-xl shadow-xl flex flex-col items-center justify-center w-11/12 sm:w-[600px] md:w-[700px] lg:w-[700px] xl:w-[800px] p-6 sm:p-8 md:p-10 lg:p-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl font-extrabold text-custom-button sm:pb-10 md:pb-10 lg:pb-10 xl:pb-10">
          Connexion
        </h1>

        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 bg-gray-200 text-gray-900 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
            required
          />
          <div className="relative">
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Mot de passe"
              value={MotDePasse}
              onChange={(e) => setMotDePasse(e.target.value)}
              className="w-full px-4 py-2 bg-gray-200 text-gray-900 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
              required
            />
            <button
              type="button"
              onClick={() => setPasswordVisible(!passwordVisible)}
              className="absolute right-5 bottom-3 text-gray-800"
            >
              {passwordVisible ? (
                <PiEyeSlash className="text-xl" />
              ) : (
                <PiEye className="text-xl" />
              )}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-custom-button text-white px-6 py-2 rounded-3xl font-bold sm:text-xl md:text-xl lg:text-xl hover:bg-gray-200 hover:text-custom-button transition duration-300"
          >
            Se connecter
          </button>
        </form>

        <p className="text-gray-700 font-bold">
          Pas encore inscrit?{" "}
          <Link href="/userregistration" className="text-gray-900 underline">
            S&apos;inscrire
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Connexion;
