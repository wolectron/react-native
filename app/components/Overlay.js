import color from 'color';
import { Animated } from 'react-native';
import { DarkTheme } from 'react-native-paper';

export default function overlay(
  elevation = 1,
  surfaceColor = DarkTheme.colors.surface
) {
  if (elevation instanceof Animated.Value) {
    const inputRange = [0, 1, 2, 3, 8, 24];
    return elevation.interpolate({
      inputRange,
      outputRange: inputRange.map(elevation => {
        return calculateColor(surfaceColor, elevation);
      }),
    });
  }
  return calculateColor(surfaceColor, elevation);
}
function calculateColor(surfaceColor, elevation) {
  let overlayTransparency;
  if (elevation >= 1 && elevation <= 24) {
    overlayTransparency = elevationOverlayTransparency[elevation];
  } else if (elevation > 24) {
    overlayTransparency = elevationOverlayTransparency[24];
  } else {
    overlayTransparency = elevationOverlayTransparency[1];
  }
  return color(surfaceColor)
    .mix(color('white'), overlayTransparency * 0.01)
    .hex();
}
const elevationOverlayTransparency = [
  5,
  7,
  8,
  9,
  10,
  11,
  11.5,
  12,
  12.5,
  13,
  13.5,
  14,
  14.25,
  14.5,
  14.75,
  15,
  15.12,
  15.24,
  15.36,
  15.48,
  15.6,
  15.72,
  15.84,
  16,
];