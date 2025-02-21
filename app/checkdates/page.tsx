"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// Define the TypeScript interface for the egg incubation data
interface IncubationOeufs {
  oeufs_incuber: number;
  date_incubation: string;
  date_mirage: string;
  oeufs_fertiliser: number;
  oeufs_non_fertiliser: number;
  date_eclosion: string;
  mise_en_closoir: string;
  description: string;
  espece: string;
  id: number;
  date_creation: string;
}

// Function to properly format the date while keeping "DD-MM-YYYY HH:MM:SS"
const formatDate = (dateStr: string) => {
  if (!dateStr) return "Invalid Date"; // Handle empty/null values

  // Split date and time
  const [day, month, yearTime] = dateStr.split("-");
  const [year, time] = yearTime.split(" ");

  // Create a valid Date object
  const dateObj = new Date(`${year}-${month}-${day}T${time}`);

  if (isNaN(dateObj.getTime())) return "Invalid Date"; // Ensure date is valid

  // Return the original format: "DD-MM-YYYY HH:MM:SS"
  return `${day}-${month}-${year}`;
};

export default function Checkdates() {
  const [data, setData] = useState<IncubationOeufs[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("https://fermeclement.site/api/geteggincubation")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched Data:", data); // Debugging
        console.log("Current Date:", new Date().toISOString());

        // Ensure we handle data properly
        const records = Array.isArray(data) ? data : data.records;

        if (!Array.isArray(records)) {
          console.error("Unexpected data format:", data);
          setLoading(false);
          return;
        }

        // Filter out past records
        const filteredData = records.filter((item: IncubationOeufs) => {
          const [day, month, yearTime] = item.date_eclosion.split("-");
          const [year, time] = yearTime.split(" ");
          const formattedDate = new Date(`${year}-${month}-${day}T${time}`);
          return formattedDate >= new Date();
        });

        setData(filteredData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleBackClick = () => {
    router.push("/homepage");
  };

  if (loading) {
    return (
      <div className="text-center text-gray-600">Chargement des données...</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl underline font-bold text-center text-custom-button mb-6">
        Suivi des dates d&apos;incubation des Œufs
      </h1>
      <button
        onClick={handleBackClick}
        className="mb-4 px-4 py-2 bg-custom-button text-white rounded-lg shadow hover:bg-white hover:text-custom-button transition"
      >
        Retour
      </button>
      {data.length === 0 ? (
        <p className="text-center text-custom-button">
          Aucune date trouvée pour le moment.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {data.map((record) => (
            <div
              key={record.id}
              className="bg-white p-2 rounded-lg shadow hover:shadow-lg transition-transform transform hover:scale-105"
            >
              <h2 className="text-2xl text-center underline text-custom-green font-semibold">
                Espèces: {record.espece}
              </h2>

              <div className="mt-4 text-lg text-black font-bold">
                <br />
                <p className="text-lg font-bold text-custom-green">
                  Considérer les dates suivantes à venir :
                </p>{" "}
                <br />
                <p className="m">
                  Date de mise en incubation: {formatDate(record.date_creation)}
                </p>{" "}
                <br />
                <p>Date de Mirage: {formatDate(record.date_mirage)}</p>
                <br />
                <p>
                  Date de mise en éclosoir: {formatDate(record.mise_en_closoir)}
                </p>
                <br />
                <p>Date d&apos;éclosion: {formatDate(record.date_eclosion)}</p>
                <br />
                <p>Lot numéro: {record.id}</p>
                <br />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
