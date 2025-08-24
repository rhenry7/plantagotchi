import { JSX, useEffect, useState } from 'react'
import { images } from '@renderer/components/images/images'
import { Droplets, NotebookPen, Skull } from 'lucide-react'
import { PlantCardProps } from '@renderer/components/types'

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
    <div className="bg-white rounded-3xl shadow-lg p-6 mt-14 w-80 mx-auto">
      {getProgressImage()}
      {/* Plant Name */}
      <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">{plantName}</h3>
      {/* Progress Bar and Button Container */}
      <div className="flex items-center gap-3">
        {/* Progress Bar */}
        <div className="flex-1">
          <div className="text-xs text-gray-500 my-3 text-center">
            <span>{`Dehydration level is at: ${Math.round(progress)}`}%</span>
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
          onClick={() => {}}
          className="bg-black hover:bg-red-600 text-white p-3 rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl"
          title="Kill plant"
        >
          <Skull size={20} />
        </button>
        <button
          onClick={() => {}}
          className="bg-black hover:bg-gray-600 text-white p-3 rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl"
          title="Edit Plant"
        >
          <NotebookPen size={20} />
        </button>

        <button
          onClick={handleWater}
          className="bg-black hover:bg-blue-600 text-white p-3 rounded-full transition-colors duration-200 shadow-lg hover:shadow-xl"
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

export default PlantCard;
