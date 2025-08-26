import { useState, JSX } from 'react'
import {
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'
import { PlantCardProps } from '@renderer/components/types'
import PlantCard from '@renderer/components/PlantCard'

const samplePlants: PlantCardProps[] = [
  //  lastWatered: Date.now() - days * hours * minutes * millisec
  {
    id: '1',
    plantName: 'Frank The Plant',
    wateringInterval: 14, // days
    onWater: () => {},
    lastWatered: Date.now() - 1 * 24 * 60 * 60 * 1000,
  },
  {
    id: '2',
    plantName: 'Gary',
    wateringInterval: 14,
    onWater: () => {},
    lastWatered: Date.now() - 4 * 24 * 60 * 60 * 1000,
  },
  {
    id: '3',
    plantName: 'Lisa',
    wateringInterval: 14,
    onWater: () => {},
    lastWatered: Date.now() - 8 * 24 * 60 * 60 * 1000,
  },
  {
    id: '4',
    plantName: 'Spike',
    wateringInterval: 1,
    onWater: () => {},
    lastWatered: Date.now() - 10 * 24 * 60 * 60 * 1000,
  }
]



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
