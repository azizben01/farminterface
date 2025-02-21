// pages/inscription.tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PiEye, PiEyeSlash } from "react-icons/pi";

const Inscription = () => {
  const [username, setUsername] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [NumeroTelephone, setNumeroTelephone] = useState("");
  const [MotDePasse, setMotDePasse] = useState("");
  const [confirmMotDePasse, setConfirmMotDePasse] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (MotDePasse !== confirmMotDePasse) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }
    // Log the data before sending the request
    const formData = {
      username,
      nom,
      prenom,
      NumeroTelephone,
      MotDePasse,
    };

    console.log("Data being sent to backend:", formData);

    // Simulate registration API call
    try {
      const response = await fetch(
        "https://fermeclement.site/api/userregister",
        // "http://192.168.1.8:5050/userregister",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            nom,
            prenom,
            numero_telephone: NumeroTelephone,
            mot_de_passe: MotDePasse,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de l'inscription.");
      }
      alert(
        "Nouvel employé a été enregistrer. Vous serez rediriger sur la page de connexion maintenant!"
      );
      // Redirect to login page after successful registration
      router.push("/userlogin");
    } catch (err) {
      setError("Une erreur s'est produite. Veuillez réessayer.");
      console.error("Une erreur s'est produte. Veuillez réessayer:", err);
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
      <div className="relative bg-white bg-opacity-60 rounded-xl shadow-xl flex flex-col items-center justify-center w-11/12 sm:w-[600px] md:w-[700px] lg:w-[700px] xl:w-[800px] p-6 sm:p-8 md:p-10 lg:p-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-4xl font-extrabold text-custom-button">
          Fiche D&apos;inscription
        </h1>

        {error && <p className="text-red-500">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          {/* Username */}
          <div className="space-y-1">
            <label
              htmlFor="username"
              className="block text-left text-black font-bold"
            >
              Nom d&apos;utilisateur
            </label>
            <input
              type="text"
              id="username"
              placeholder="Nom d'utilisateur. Ex: Felix06"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 bg-gray-200 text-gray-900 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
              required
            />
          </div>

          {/* Last Name */}
          <div className="space-y-1">
            <label
              htmlFor="nom"
              className="block text-left text-black font-bold"
            >
              Nom
            </label>
            <input
              type="text"
              id="nom"
              placeholder="Nom"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              className="w-full px-4 py-2 bg-gray-200 text-gray-900 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
              required
            />
          </div>

          {/* First Name */}
          <div className="space-y-1">
            <label
              htmlFor="prenom"
              className="block text-left text-black font-bold"
            >
              Prénom
            </label>
            <input
              type="text"
              id="prenom"
              placeholder="Prénom"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              className="w-full px-4 py-2 bg-gray-200 text-gray-900 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
              required
            />
          </div>

          {/* Phone Number */}
          <div className="space-y-1">
            <label
              htmlFor="telephone"
              className="block text-left text-black font-bold"
            >
              Numéro de téléphone
            </label>
            <input
              type="tel"
              id="NumeroTelephone"
              placeholder="Numéro de téléphone"
              value={NumeroTelephone}
              // onChange={(e) => setNumeroTelephone(e.target.value)}
              onChange={(e) => {
                // Allow only numeric input
                const numericValue = e.target.value.replace(/\D/g, ""); // Remove non-digits
                setNumeroTelephone(numericValue);
              }}
              className="w-full px-4 py-2 bg-gray-200 text-gray-900 rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
              required
            />
          </div>

          {/* Password */}
          <div className="relative space-y-1">
            <label
              htmlFor="password"
              className="block text-left text-black font-bold"
            >
              Nouveau mot de passe
            </label>
            <input
              type={passwordVisible ? "text" : "password"}
              id="MotDePasse"
              placeholder="Nouveau mot de passe"
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

          {/* Confirm Password */}
          <div className="relative space-y-1">
            <label
              htmlFor="confirmPassword"
              className="block text-left text-black font-bold"
            >
              Confirmer mot de passe
            </label>
            <input
              type={passwordVisible ? "text" : "password"}
              id="confirmMotDePasse"
              placeholder="Confirmer mot de passe"
              value={confirmMotDePasse}
              onChange={(e) => setConfirmMotDePasse(e.target.value)}
              className="w-full px-4 py-2 bg-gray-200 text-black rounded-full focus:outline-none focus:ring-2 focus:ring-gray-500 transition duration-300"
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-custom-button text-white px-6 py-2 rounded-3xl font-bold sm:text-xl md:text-xl lg:text-xl hover:bg-gray-200 hover:text-custom-button transition duration-300"
          >
            S&apos;inscrire
          </button>
        </form>

        <p className="text-gray-700 font-bold mt-5">
          Déjà inscrit?{" "}
          <Link href="/userlogin" className="text-gray-900 underline">
            Se connecter
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Inscription;
