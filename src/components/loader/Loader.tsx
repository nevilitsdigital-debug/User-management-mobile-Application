
import React, { useEffect, useRef } from 'react';
import {
  View,
  Animated,
  Easing,
  Text,
} from 'react-native';
import styles from './Loader.styles';

interface LoaderProps {
  text?: string;
  fullScreen?: boolean;
}

const Loader: React.FC<LoaderProps> = ({ text = 'Loading...', fullScreen = true }) => {
  // Outer spinning ring animation (0.75s)
  const outerRotateAnim = useRef(new Animated.Value(0)).current;
  
  // Inner spinning ring animation (1.2s reverse)
  const innerRotateAnim = useRef(new Animated.Value(0)).current;
  
  // Center dot pulse animation
  const pulseScaleAnim = useRef(new Animated.Value(1)).current;
  const pulseOpacityAnim = useRef(new Animated.Value(1)).current;
  
  // Bouncing dots animations
  const bounceDot1 = useRef(new Animated.Value(0)).current;
  const bounceDot2 = useRef(new Animated.Value(0)).current;
  const bounceDot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Outer ring rotation (0.75s linear infinite)
    Animated.loop(
      Animated.timing(outerRotateAnim, {
        toValue: 1,
        duration: 750,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Inner ring rotation (1.2s linear infinite reverse)
    Animated.loop(
      Animated.timing(innerRotateAnim, {
        toValue: 1,
        duration: 1200,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Center dot pulse animation (1.5s ease-in-out infinite)
    Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(pulseScaleAnim, {
            toValue: 0.8,
            duration: 750,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseOpacityAnim, {
            toValue: 0.5,
            duration: 750,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(pulseScaleAnim, {
            toValue: 1,
            duration: 750,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(pulseOpacityAnim, {
            toValue: 1,
            duration: 750,
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
        ]),
      ])
    ).start();

    // Bouncing dots animation (1.4s ease-in-out infinite with delays)
    // Animation: 0% -> 40% (up), 40% -> 80% (down), 80% -> 100% (stay)
    const createBounceAnimation = (animValue: Animated.Value, delay: number) => {
      return Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(animValue, {
            toValue: -10,
            duration: 560, // 40% of 1.4s = 560ms (0% to 40%)
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.timing(animValue, {
            toValue: 0,
            duration: 560, // 40% of 1.4s = 560ms (40% to 80%)
            easing: Easing.inOut(Easing.ease),
            useNativeDriver: true,
          }),
          Animated.delay(280 - delay), // 20% of 1.4s = 280ms (80% to 100%)
        ])
      );
    };

    // Start bouncing animations with delays
    createBounceAnimation(bounceDot1, 0).start();
    createBounceAnimation(bounceDot2, 150).start();
    createBounceAnimation(bounceDot3, 300).start();
  }, []);

  // Interpolate rotations
  const outerRotate = outerRotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const innerRotate = innerRotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['360deg', '0deg'], // Reverse rotation
  });

  // Interpolate bounce opacity
  const bounceOpacity1 = bounceDot1.interpolate({
    inputRange: [-10, 0],
    outputRange: [1, 0.7],
    extrapolate: 'clamp',
  });

  const bounceOpacity2 = bounceDot2.interpolate({
    inputRange: [-10, 0],
    outputRange: [1, 0.7],
    extrapolate: 'clamp',
  });

  const bounceOpacity3 = bounceDot3.interpolate({
    inputRange: [-10, 0],
    outputRange: [1, 0.7],
    extrapolate: 'clamp',
  });

  const containerStyle = fullScreen ? styles.fullScreenContainer : styles.inlineContainer;

  return (
    <View style={containerStyle}>
      <View style={styles.contentContainer}>
        {/* Spinner Container */}
        <View style={styles.spinnerContainer}>
          {/* Outer Static Ring */}
          <View style={styles.outerStaticRing} />
          
          {/* Spinning Ring (Outer) */}
          <Animated.View
            style={[
              styles.spinningRing,
              {
                transform: [{ rotate: outerRotate }],
              },
            ]}
          />
          
          {/* Inner Spinning Ring */}
          <Animated.View
            style={[
              styles.innerSpinningRing,
              {
                transform: [{ rotate: innerRotate }],
              },
            ]}
          />
          
          {/* Center Dot */}
          <View style={styles.centerDotContainer}>
            <Animated.View
              style={[
                styles.centerDot,
                {
                  transform: [{ scale: pulseScaleAnim }],
                  opacity: pulseOpacityAnim,
                },
              ]}
            />
          </View>
        </View>

        {/* Loading Text and Dots */}
        <View style={styles.textContainer}>
          <Text style={styles.loadingText}>{text}</Text>
          <View style={styles.dotsContainer}>
            <Animated.View
              style={[
                styles.bounceDot,
                {
                  transform: [{ translateY: bounceDot1 }],
                  opacity: bounceOpacity1,
                  marginRight: 8,
                },
              ]}
            />
            <Animated.View
              style={[
                styles.bounceDot,
                {
                  transform: [{ translateY: bounceDot2 }],
                  opacity: bounceOpacity2,
                  marginRight: 8,
                },
              ]}
            />
            <Animated.View
              style={[
                styles.bounceDot,
                {
                  transform: [{ translateY: bounceDot3 }],
                  opacity: bounceOpacity3,
                },
              ]}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Loader;
