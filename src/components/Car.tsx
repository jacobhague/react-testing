import { useState, useEffect } from 'react'
import carImage from './assets/car.jpg'

const turningRadius = 250.0;
const acceleration = 0.1;
const maxSpeed = 15.0;


let angleRad = 0.0;
let trueX = 0.0;
let trueY = 0.0;
let speed = 0.0;

function Car() {

  const [position, setPosition] = useState({ x: 0, y: 0, angle: 0 });

  const [pressedKeys, setPressedKeys] = useState(new Set());




  useEffect(() => {
    const handleKeyDown = (e: any) => {
      setPressedKeys(prev => new Set(prev.add(e.key)));
    };

    const handleKeyUp = (e: any) => {
      setPressedKeys(prev => {
        prev.delete(e.key);
        return new Set(prev);
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  //sets speed
  useEffect(() => {
  const interval = setInterval(() => {

    if (pressedKeys.has('w') || pressedKeys.has('s')) {

      if (pressedKeys.has('w') && speed < maxSpeed) {
        
        if (speed > 0) speed += acceleration;
        else speed += acceleration * 3;

      }

      if (pressedKeys.has('s') && speed > maxSpeed * -1) {
        
        if (speed < 0) speed -= acceleration;
        else speed -= acceleration * 3;

      }

  } else {
     
    if (speed > 0 && speed > acceleration) speed -= acceleration;
    if (speed < 0 && speed < acceleration*-1) speed += acceleration;
    if (speed > 0 && speed < acceleration) speed = 0;
    if (speed < 0 && speed > acceleration*-1) speed = 0;


  }

    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [pressedKeys, position]);


  // sets position
    useEffect(() => {
    const interval = setInterval(() => {

      let newX = position.x;
      let newY = position.y;
      let newAngle = position.angle;
      


      if (speed > 0) {
        

        trueY -= speed * Math.cos(angleRad);
        trueX += speed * Math.sin(angleRad);

        if(pressedKeys.has('a')) angleRad -= speed / turningRadius;
        if(pressedKeys.has('d')) angleRad += speed / turningRadius;

      }

      if (speed < 0) {

        trueY -= speed * Math.cos(angleRad);
        trueX += speed * Math.sin(angleRad);

        if(pressedKeys.has('a')) angleRad -= speed / turningRadius;
        if(pressedKeys.has('d')) angleRad += speed / turningRadius;

      }

      
      if (angleRad > Math.PI) angleRad = Math.PI*-2 + angleRad;
      if (angleRad < Math.PI*-1) angleRad = Math.PI*2 + angleRad;

      newX = Math.floor(trueX);
      newY = Math.floor(trueY);
      
      newAngle = Math.round(angleRad / Math.PI * 180);

  

      if (newX !== position.x || newY !== position.y || newAngle !== position.angle) {
        setPosition({ x: newX, y: newY, angle: newAngle });
      }
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [pressedKeys, position]);


  return (
    <div
      style={{
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        rotate: `${position.angle}deg`,
        width: '100px',
        height: '180px',
      }}
    >
      <img src={carImage} alt="A car" />

    </div>
  );
};

export default Car