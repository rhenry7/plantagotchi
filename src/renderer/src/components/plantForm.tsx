import { JSX, useState } from "react";

export interface PlantFormData {
  name: string;
  wateringInterval: number;
  lastWatered: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PlantFormData) => void;
}

export default function PlantModal({ isOpen, onClose, onSubmit }: ModalProps): JSX.Element | null {
  const [formData, setFormData] = useState<PlantFormData>({
    name: "",
    wateringInterval: 0,
    lastWatered: "",
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "wateringInterval" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    onSubmit(formData);
    onClose(); // close modal after submit
  };

  return (
    <div className="fixed inset-0 flex items-center pt-50 justify-center mt-5 z-0 ">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-[300px] h-[500px] pt-10 mt-28">
        <h2 className="text-xl font-semibold mb-4 text-black">Edit Plant</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Watering Interval (days)</label>
            <input
              type="number"
              name="wateringInterval"
              value={formData.wateringInterval}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-gray-700">Last Watered</label>
            <input
              type="date"
              name="lastWatered"
              value={formData.lastWatered}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-black"
              required
            />
          </div>

          <div className="flex justify-end space-x-2 pt-10">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-lg bg-red-300 hover:bg-red-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
