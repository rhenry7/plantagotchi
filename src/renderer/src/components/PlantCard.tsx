import { JSX, useEffect, useState } from 'react'

type PlantCardProps = {
  plantName: string;
  imageSrc: string; // your pixel art
  waterInterval: number; // in hours
};

export default function PlantCard({
  plantName,
  imageSrc,
  waterInterval
}: PlantCardProps): JSX.Element {
  const [lastWatered, setLastWatered] = useState<number>(Date.now());
  const [progress, setProgress] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Date.now() - lastWatered;
      const percent = Math.min((elapsed / (waterInterval * 60 * 60 * 1000)) * 100, 100);
      setProgress(percent);
    }, 1000);

    return () => clearInterval(interval);
  }, [lastWatered, waterInterval]);

  function handleWater():void {
    setLastWatered(Date.now());
    setProgress(0);
  }

  return (
    <div className="w-80 rounded-2xl bg-green-100 shadow-lg p-4 flex flex-col items-center">
      <img src={imageSrc} alt={plantName} className="w-40 h-40 object-contain" />
      <div className="w-full flex items-center mt-4 gap-2">
        <div className="flex-1 bg-gray-300 rounded-full h-4 overflow-hidden">
          <div
            className="bg-green-500 h-4 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>
        <button
          onClick={handleWater}
          className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
        >
          Water
        </button>
      </div>
    </div>
  );
}
