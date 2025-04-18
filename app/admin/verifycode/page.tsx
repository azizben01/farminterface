"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Verifycode: React.FC = () => {
  const [code, setCode] = useState<number | "">(""); // Allow number or empty string
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const router = useRouter(); // Initialize the router instance

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission from reloading the page
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("https://fermeclement.site/api/Verifycode", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: Number(code) }),
      });

      const data = await response.json();

      if (response.ok) {
        router.push("/admin/resetpassword");
      } else {
        setError(
          data.error ||
            "Le code est incorrect. Si le probleme persiste, contactez votre adminstrateur"
        );
      }
    } catch (err) {
      setError(
        "Une erreur s'est produite. Veuillez réessayer. Si le probleme persiste, contactez votre administrateur"
      );
      console.error("une erreur s'est produite:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-garamond text-custom-green font-bold mb-6 text-center">
          Saisissez le code envoyé sur votre adresse email.
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block font-sans1 text-sm font-medium text-gray-700"
            >
              Code de vérification
            </label>
            <input
              type="number"
              id="number"
              value={code}
              onChange={(e) => setCode(Number(e.target.value))}
              className="mt-1 font-sans1 text-black block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
              placeholder="Enter your code"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full font-sans1 text-custom-green border border-custom-green py-1 px-2 rounded-xl hover:bg-custom-green hover:text-white"
          >
            {isLoading ? "Verificaiton en cours..." : "Verifier      le code"}
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

export default Verifycode;
