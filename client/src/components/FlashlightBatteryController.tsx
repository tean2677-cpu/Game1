import { useEffect } from "react";
import { useFlashlight } from "@/lib/stores/useBedroomGame";

export function FlashlightBatteryController() {
  const isLightOn = useFlashlight((state) => state.isLightOn);
  const drainBattery = useFlashlight((state) => state.drainBattery);

  useEffect(() => {
    if (!isLightOn) return;

    const drainInterval = setInterval(() => {
      drainBattery(1);
    }, 27000); // 27 seconds

    return () => clearInterval(drainInterval);
  }, [isLightOn, drainBattery]);

  return null;
}