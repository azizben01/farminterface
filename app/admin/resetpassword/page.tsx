"use client";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";

const ResetPassword: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const router = useRouter();

  // Retrieve the email from session storage
  useEffect(() => {
    const storedEmail = sessionStorage.getItem("resetEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      // Redirect to the email verification page if no email is found
      router.push("/admin/verifycode");
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(
        "https://homeabomolawfirmltd.com/api/resetpassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Clear the email from session storage after successful reset
        sessionStorage.removeItem("resetEmail");
        router.push("/admin/login"); // Redirect to the login page
      } else {
        setError(data.error || "Échec de la réinitialisation du mot de passe.");
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
        <h1 className="text-2xl font-garamond text-goldcolor font-bold mb-6 text-center">
          Réinitialiser votre mot de passe
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block font-sans1 text-sm font-medium text-gray-700"
            >
              Nouveau mot de passe
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 font-sans1 text-black block w-full px-3 py-2 border border-gray-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-800"
              placeholder="Enter your new password"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full font-sans1 text-goldcolor border border-goldcolor py-1 px-2 rounded-xl hover:bg-goldcolor hover:text-white"
          >
            {isLoading
              ? "Réinitialisation en cours..."
              : "Réinitialiser le mot de passe"}
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

export default ResetPassword;
