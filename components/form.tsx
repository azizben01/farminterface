// components/Form.tsx
import { useState } from "react";

type FormProps = {
  onSubmit: (data: Record<string, string>) => void;
};

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    date: "",
    eggs: "",
    chicks: "",
    needs: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-6 shadow rounded-md"
    >
      <div>
        <label className="block text-sm font-medium">Date</label>
        <input
          type="date"
          name="date"
          onChange={handleChange}
          value={formData.date}
          className="w-full border-gray-300 rounded-md p-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Number of Eggs</label>
        <input
          type="number"
          name="eggs"
          onChange={handleChange}
          value={formData.eggs}
          className="w-full border-gray-300 rounded-md p-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Number of Chicks</label>
        <input
          type="number"
          name="chicks"
          onChange={handleChange}
          value={formData.chicks}
          className="w-full border-gray-300 rounded-md p-2"
        />
      </div>
      <div>
        <label className="block text-sm font-medium">Needs</label>
        <input
          type="text"
          name="needs"
          onChange={handleChange}
          value={formData.needs}
          className="w-full border-gray-300 rounded-md p-2"
        />
      </div>
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
