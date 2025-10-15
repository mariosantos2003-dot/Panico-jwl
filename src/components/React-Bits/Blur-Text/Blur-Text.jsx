import { motion } from 'framer-motion';
import { useEffect, useRef, useState, useMemo } from 'react';
import { getOptimizedAnimationConfig } from '../../../utils/deviceDetection';

const buildKeyframes = (from, steps) => {
  const keys = new Set([
    ...Object.keys(from),
    ...steps.flatMap((s) => Object.keys(s)),
  ]);

  const keyframes = {};
  keys.forEach((k) => {
    keyframes[k] = [from[k], ...steps.map((s) => s[k])];
  });
  return keyframes;
};

const BlurText = ({
  text = '',
  delay = 200,
  className = '',
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = (t) => t,
  onAnimationComplete,
  stepDuration = 0.35,
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef(null);
  
  // Usar configuración optimizada del dispositivo
  const animConfig = useMemo(() => getOptimizedAnimationConfig(), []);
  const optimizedDelay = delay * animConfig.delayMultiplier;
  const optimizedStepDuration = stepDuration * animConfig.durationMultiplier;

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threshold, rootMargin]);

  const defaultFrom = useMemo(
    () =>
      direction === 'top'
        ? { 
            filter: `blur(${animConfig.maxBlur}px)`,
            opacity: 0, 
            y: animConfig.disableComplexAnimations ? -25 : -50
          }
        : { 
            filter: `blur(${animConfig.maxBlur}px)`,
            opacity: 0, 
            y: animConfig.disableComplexAnimations ? 25 : 50
          },
    [direction, animConfig]
  );

  const defaultTo = useMemo(
    () => animConfig.simplifyAnimations 
      ? [
          // Simplificar animación en dispositivos de baja potencia
          { filter: 'blur(0px)', opacity: 1, y: 0 },
        ]
      : [
          {
            filter: 'blur(5px)',
            opacity: 0.5,
            y: direction === 'top' ? 5 : -5,
          },
          { filter: 'blur(0px)', opacity: 1, y: 0 },
        ],
    [direction, animConfig]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  const stepCount = toSnapshots.length + 1;
  const totalDuration = optimizedStepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) =>
    stepCount === 1 ? 0 : i / (stepCount - 1)
  );

  return (
    <p
      ref={ref}
      className={className}
      style={{ display: 'flex', flexWrap: 'wrap' }}
    >
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

        const spanTransition = {
          duration: totalDuration,
          times,
          delay: (index * optimizedDelay) / 1000,
        };
        (spanTransition).ease = easing;

        return (
          <motion.span
            className="inline-block"
            style={{ willChange: inView ? 'transform, filter, opacity' : 'auto' }}
            key={index}
            initial={fromSnapshot}
            animate={inView ? animateKeyframes : fromSnapshot}
            transition={spanTransition}
            onAnimationComplete={
              index === elements.length - 1 ? onAnimationComplete : undefined
            }
          >
            {segment === ' ' ? '\u00A0' : segment}
            {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
          </motion.span>
        );
      })}
    </p>
  );
};

export default BlurText;