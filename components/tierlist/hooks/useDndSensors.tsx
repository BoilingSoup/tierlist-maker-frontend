import { KeyboardSensor, MouseSensor, TouchSensor, useSensor, useSensors } from "@dnd-kit/core";

export const useDndSensors = () => {
  return useSensors(
    useSensor(MouseSensor),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 50,
        tolerance: 75,
      },
    }),
    useSensor(KeyboardSensor)
  );
};
