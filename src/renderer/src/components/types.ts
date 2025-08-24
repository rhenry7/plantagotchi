
export type PlantCardProps = {
  plantName: string;
  id?: string;
  imageSrc?: string | null; // your pixel art
  lastWatered: number | null;
  wateringInterval: number; // in hours
  onWater: (now: number) => void;
};
