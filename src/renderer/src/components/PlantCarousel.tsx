import { useState, useEffect, JSX } from 'react'
import {
  ArrowLeft,
  ArrowLeftCircle,
  ChevronLeft,
  ChevronRight,
  Droplets,
  NotebookPen,
  Plus,
  Skull
} from 'lucide-react'
import { images } from "@renderer/components/images/images";

const samplePlants: PlantCardProps[] = [
  //  lastWatered: Date.now() - days * hours * minutes * millisec
  {
    id: '1',
    plantName: 'Snake Plant',
    wateringInterval: 14, // days
    onWater: () => {},
    lastWatered: Date.now() - 1 * 24 * 60 * 60 * 1000,
  },
  {
    id: '2',
    plantName: 'Pothos',
    wateringInterval: 14,
    onWater: () => {},
    lastWatered: Date.now() - 4 * 24 * 60 * 60 * 1000,
  },
  {
    id: '3',
    plantName: 'Peace Lily',
    wateringInterval: 14,
    onWater: () => {},
    lastWatered: Date.now() - 8 * 24 * 60 * 60 * 1000,
  },
  {
    id: '4',
    plantName: 'Rubber Plant',
    wateringInterval: 1,
    onWater: () => {},
    lastWatered: Date.now() - 10 * 24 * 60 * 60 * 1000,
  }
]

type PlantCardProps = {
  plantName: string;
  id?: string;
  imageSrc?: string | null; // your pixel art
  lastWatered: number | null;
  wateringInterval: number; // in hours
  onWater: (now: number) => void;
};

const PlantCard = ({
  plantName = 'My Plant',
                     wateringInterval = 7, // days
                     lastWatered = null,
                     onWater,
                   }: PlantCardProps): JSX.Element => {
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState('');
  const [lastWateredTime, setLastWateredTime] = useState(lastWatered || Date.now());

  useEffect(() => {
    const updateProgress = (): void => {
      const now = Date.now();
      const timeSinceWatered = now - lastWateredTime;
      const totalWateringTime = wateringInterval * 24 * 60 * 60 * 1000; // Convert days to ms

      const progressPercentage = Math.min((timeSinceWatered / totalWateringTime) * 100, 100);
      setProgress(progressPercentage);

      // Calculate time left
      const timeRemaining = totalWateringTime - timeSinceWatered;
      if (timeRemaining > 0) {
        const daysLeft = Math.ceil(timeRemaining / (24 * 60 * 60 * 1000));
        const hoursLeft = Math.ceil(timeRemaining / (60 * 60 * 1000));

        if (daysLeft > 1) {
          setTimeLeft(`${daysLeft} days`);
        } else if (hoursLeft > 1) {
          setTimeLeft(`${hoursLeft} hours`);
        } else {
          setTimeLeft('Soon');
        }
      } else {
        setTimeLeft('Water now!');
      }
    };

    updateProgress();
    const interval = setInterval(updateProgress, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [lastWateredTime, wateringInterval]);

  const handleWater = (): void => {
    const now = Date.now();
    setLastWateredTime(now);
    setProgress(0);
    if (onWater) {
      onWater(now);
    }
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const getProgressColor = () => {
    if (progress < 25) {
      return '#3bd100'
    } else if (progress < 50) {
      return '#d1ce00'
    } else if (progress < 75) {
      return '#d16f00'
    } else {
      return '#d10000'
    }
  };

  const getProgressImage = () => {
    if (progress < 25) {
      return <img  className="max-h-full max-w-full" src={images.healthy} />;
    } else if (progress < 50) {
      return <img className="max-h-full max-w-full" src={images.good} />;
    } else if (progress < 75) {
      return <img className="max-h-full max-w-full" src={images.bad} />;
    } else {
      return <img className="max-h-full max-w-full" src={images.dead} />;
    }
  };
/*
<div
  class="relative w-80 h-96 mx-auto bg-[url('/images/egg-shape.png')] bg-cover bg-center p-6 shadow-lg"
>
 */
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mt-14 w-80 mx-auto">
      <button
        onClick={handleWater}
        className="bg-green-500 hover:bg-green-700 text-white p-3 rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl"
        title="Add a new plant"
      >
        <Plus size={20} />
      </button>
      {/* Plant Image Container */}
      {getProgressImage()}
      {/* Plant Name */}
      <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">{plantName}</h3>
      {/* Progress Bar and Button Container */}
      <div className="flex items-center gap-3">
        {/* Progress Bar */}
        <div className="flex-1">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Water in: {timeLeft}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="h-3 rounded-full transition-all duration-300 ease-out"
              style={{
                width: `${progress}%`,
                backgroundColor: getProgressColor()
              }}
            />
          </div>
        </div>
      </div>
<div className="flex items-center gap-14 m-2 p-2">

  <button
    onClick={handleWater}
    className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl"
    title="Water plant"
  >
    <Skull size={20} />
  </button>
  <button
    onClick={handleWater}
    className="bg-gray-500 hover:bg-gray-600 text-white p-3 rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl"
    title="Water plant"
  >
    <NotebookPen size={20} />
  </button>

  <button
    onClick={handleWater}
    className="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl"
    title="Water plant"
  >
    <Droplets size={20} />
  </button>
</div>
      {/* Last Watered Info */}
      <div className="text-xs text-gray-500 mt-3 text-center">
        Last watered: {new Date(lastWateredTime).toLocaleDateString()}
      </div>
    </div>
  )
};


type PlantCarouselProps = {
  plants?: PlantCardProps[],
  onUpdatePlant?: (plantId: string, wateredTime: number) => void
}

const PlantCarousel = ({
  plants = samplePlants,
  onUpdatePlant
}: PlantCarouselProps): JSX.Element => {
  const [plantsData, setPlantsData] = useState(plants);
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleWaterPlant = (plantId, wateredTime): void => {
    setPlantsData(prevPlants =>
      prevPlants.map(plant =>
        plant.id === plantId
          ? { ...plant, lastWatered: wateredTime }
          : plant
      )
    );

    if (onUpdatePlant) {
      onUpdatePlant(plantId, wateredTime);
    }
  };

  const nextSlide = (): void => {
    setActiveIndex(prev => (prev + 1) % plantsData.length);
  };

  const prevSlide = (): void => {
    setActiveIndex(prev => (prev - 1 + plantsData.length) % plantsData.length);
  };

  const goToSlide = (index): void => {
    setActiveIndex(index);
  };

  // Touch handlers for swipe
  const handleTouchStart = (e): void => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e): void => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (): void => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      nextSlide(); // Swipe left - next slide
    }

    if (distance < -minSwipeDistance) {
      prevSlide(); // Swipe right - previous slide
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header */}
      {/*<div className="text-center mb-6">*/}
      {/*  <h2 className="text-2xl font-bold text-gray-800 mb-2">My Plants</h2>*/}
      {/*  <p className="text-gray-600">*/}
      {/*    {activeIndex + 1} of {plantsData.length}*/}
      {/*  </p>*/}
      {/*</div>*/}

      {/* Custom Swiper Container */}
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-300 ease-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {plantsData.map((plant) => (
            <div key={plant.id} className="w-full flex-shrink-0 px-2">
              <PlantCard
                plantName={plant.plantName}
                wateringInterval={plant.wateringInterval}
                lastWatered={plant.lastWatered}
                onWater={(wateredTime) => handleWaterPlant(plant.id, wateredTime)}
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {plantsData.length > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200"
            >
              <ChevronLeft size={30} color={"#000000"} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all duration-200"
            >
              <ChevronRight size={30} color={"#000000"} />
            </button>
          </>
        )}
      </div>

      {/* Navigation Dots */}
      {plantsData.length > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {plantsData.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                index === activeIndex ? 'bg-blue-500' : 'bg-gray-300'
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      )}

    </div>
  );
};

export default PlantCarousel;
