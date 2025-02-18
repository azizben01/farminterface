"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const EmailCode: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter(); // Initialize the router instance

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://fermeclement.site/api/sendtokenmail",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const text = await response.text(); // Read response as text
      console.log("Raw response:", text);

      try {
        const data = JSON.parse(text); // Try to parse JSON
        if (response.ok) {
          sessionStorage.setItem("sessionEmail", data.email); // Assuming the backend returns the email
          router.push("/admin/verifycode");
        } else {
          setError(
            data.error || "Échec de l'envoi du code de réinitialisation."
          );
        }
      } catch (jsonError) {
        console.error("JSON parse error:", jsonError);
        setError("Le serveur a renvoyé une réponse invalide.");
      }
    } catch (err) {
      setError("Une erreur s'est produite. Veuillez réessayer.");
      console.error("une erreur s'est produite:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-garamond text-custom-green font-bold mb-6 text-center">
          Demander la réinitialisation du mot de passe.
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block font-sans1 text-sm font-medium text-gray-700"
            >
              Addresse Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 font-sans1 text-black block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-gray-800"
              placeholder="Entrer votre addresse email"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full font-sans1 text-custom-green border border-custom-green py-1 px-2 rounded-xl hover:bg-custom-green hover:text-white"
          >
            {isLoading ? "En cours d'envoie..." : "Envoyer le code"}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailCode;
