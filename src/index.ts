// ************* THIS CODE WILL CRATE A single SLIDE ANIMATION ***************

// import barba, { type ITransitionData } from '@barba/core';
// import { restartWebflow } from '@finsweet/ts-utils';
// import { gsap } from 'gsap';

// barba.init({
//   transitions: [
//     {
//       name: 'home-slide-transition',
//       once: async (data: ITransitionData) => {
//         await contentFadeIn(data.next.container, 0.25);
//         await restartWebflow();
//       },
//       leave(data: ITransitionData) {
//         // Start slide transition first
//         const slideOutPromise = slideTransition('out');
//         // Delay fade out to start it when the slide transition is halfway
//         const fadeOutDelay = 0.9; // Half of the slide transition duration
//         const fadeOutDuration = 0.1; // Shortened fade-out duration
//         const fadeOutPromise = contentFadeOut(
//           data.current.container,
//           fadeOutDelay,
//           fadeOutDuration
//         );
//         return Promise.all([slideOutPromise, fadeOutPromise]);
//       },
//       enter: async (data: ITransitionData) => {
//         gsap.set(data.next.container, { opacity: 0 });
//         await slideTransition('in');
//         await contentFadeIn(data.next.container, data.next.namespace === 'home' ? 1 : 0.5);
//         await restartWebflow();
//       },
//     },
//   ],
// });

// barba.hooks.after(async () => {
//   await restartWebflow();
// });

// const slideTransition = async (direction: 'in' | 'out') => {
//   const transitionSlide = document.createElement('div');
//   transitionSlide.className = 'transition_slide';
//   document.body.appendChild(transitionSlide);

//   if (direction === 'out') {
//     gsap.set(transitionSlide, { left: '0%', width: '0%' });
//     await gsap.to(transitionSlide, { width: '100%', duration: 1, ease: 'power2.inOut' });
//   }

//   // Slide out is the same for both 'in' and 'out'
//   gsap.set(transitionSlide, { right: '0%', left: 'auto' });
//   await gsap.to(transitionSlide, { width: '0%', duration: 0.5, ease: 'power2.inOut' });

//   transitionSlide.remove();
// };

// const contentFadeOut = async (container: HTMLElement, delay: number, duration: number) => {
//   await gsap.to(container, { opacity: 0, duration: duration, delay: delay });
// };

// const contentFadeIn = async (container: HTMLElement, duration: number) => {
//   await gsap.to(container, { opacity: 1, duration: duration });
// };

// ************* THIS CODE WILL CRATE A DOUBLE SLIDE ANIMATION ***************

// import barba, { type ITransitionData } from '@barba/core';
// import { restartWebflow } from '@finsweet/ts-utils';
// import { gsap } from 'gsap';

// barba.init({
//   transitions: [
//     {
//       name: 'home-slide-transition',
//       once: async (data: ITransitionData) => {
//         await contentFadeIn(data.next.container, 0.25);
//         await restartWebflow();
//       },
//       leave(data: ITransitionData) {
//         const slideOutPromise = slideTransition('out');
//         const fadeOutDelay = 0.9;
//         const fadeOutDuration = 0.1;
//         const fadeOutPromise = contentFadeOut(
//           data.current.container,
//           fadeOutDelay,
//           fadeOutDuration
//         );
//         return Promise.all([slideOutPromise, fadeOutPromise]);
//       },
//       enter: async (data: ITransitionData) => {
//         gsap.set(data.next.container, { opacity: 0 });
//         await slideTransition('in');
//         await contentFadeIn(data.next.container, data.next.namespace === 'home' ? 1 : 0.5);
//         await restartWebflow();
//       },
//     },
//   ],
// });

// barba.hooks.after(async () => {
//   await restartWebflow();
// });

// const slideTransition = async (direction: 'in' | 'out') => {
//   const transitionSlide = document.querySelector('.transition_slide');
//   const secondTransitionSlide = document.querySelector('.second_transition_slide');

//   if (direction === 'out') {
//     gsap.set(transitionSlide, { left: '0%', width: '0%' });
//     gsap.set(secondTransitionSlide, { left: '0%', width: '0%' });

//     const firstSlideAnimation = gsap.to(transitionSlide, {
//       width: '100%',
//       duration: 1,
//       ease: 'power2.inOut',
//     });
//     const secondSlideAnimation = gsap.to(secondTransitionSlide, {
//       width: '100%',
//       duration: 1,
//       ease: 'power2.inOut',
//       delay: 0.1,
//     });

//     await Promise.all([firstSlideAnimation, secondSlideAnimation]);
//   } else {
//     gsap.set(transitionSlide, { right: '0%', left: 'auto', width: '100%' });
//     gsap.set(secondTransitionSlide, { right: '0%', left: 'auto', width: '100%' });

//     const firstSlideAnimation = gsap.to(transitionSlide, {
//       width: '0%',
//       duration: 0.5,
//       ease: 'power2.inOut',
//     });
//     const secondSlideAnimation = gsap.to(secondTransitionSlide, {
//       width: '0%',
//       duration: 0.5,
//       ease: 'power2.inOut',
//       delay: 0.1,
//     });

//     await Promise.all([firstSlideAnimation, secondSlideAnimation]);
//   }
// };

// const contentFadeOut = async (container: HTMLElement, delay: number, duration: number) => {
//   await gsap.to(container, { opacity: 0, duration: duration, delay: delay });
// };

// const contentFadeIn = async (container: HTMLElement, duration: number) => {
//   await gsap.to(container, { opacity: 1, duration: duration });
// };

import barba, { type ITransitionData } from '@barba/core';
import { restartWebflow } from '@finsweet/ts-utils';
import { gsap } from 'gsap';

const INIT_CONFIG = {
  transitions: [
    {
      name: 'universal-slide-transition',
      once: async () => {
        await restartWebflow();
      },
      leave: async (data: ITransitionData) => {
        const slideOutAnimation = slideTransition('out');
        gsap.to(data.current.container, { opacity: 0, duration: 0.25, delay: 0.75 });
        await slideOutAnimation;
      },
      enter: async (data: ITransitionData) => {
        await slideTransition('in');
        gsap.set(data.next.container, { opacity: 1 });
        await restartWebflow();
      },
    },
  ],
};

barba.init(INIT_CONFIG);

barba.hooks.after(async () => {
  await restartWebflow();
});

const slideTransition = async (direction: 'in' | 'out') => {
  const { body } = document;
  const originalOverflowX = body.style.overflowX;
  body.style.overflowX = 'hidden'; // Prevent horizontal scroll

  const transitionSlide = document.querySelector('.transition_slide');
  const secondTransitionSlide = document.querySelector('.second_transition_slide');

  if (direction === 'out') {
    gsap.set([transitionSlide, secondTransitionSlide], { left: '0%', width: '0%' });

    const firstSlideAnimation = gsap
      .timeline()
      .to(transitionSlide, { width: '100%', duration: 1, ease: 'power2.inOut' })
      .to(transitionSlide, { left: '100%', duration: 0.5, ease: 'power2.inOut' });

    const secondSlideAnimation = gsap.to(secondTransitionSlide, {
      width: '100%',
      duration: 1,
      ease: 'power2.inOut',
      delay: 0.1,
    });

    await Promise.all([firstSlideAnimation, secondSlideAnimation]);
  } else {
    gsap.set([transitionSlide, secondTransitionSlide], {
      right: '0%',
      left: 'auto',
      width: '100%',
    });

    const firstSlideAnimation = gsap
      .timeline()
      .to(transitionSlide, { width: '0%', duration: 0.75, ease: 'power2.inOut' })
      .to(transitionSlide, { right: '100%', duration: 0.5, ease: 'power2.inOut' });

    const secondSlideAnimation = gsap.to(secondTransitionSlide, {
      width: '0%',
      duration: 1,
      ease: 'power2.inOut',
      delay: 0.1,
    });

    await Promise.all([firstSlideAnimation, secondSlideAnimation]);
  }

  body.style.overflowX = originalOverflowX; // Restore original overflow setting
  await restartWebflow(); // Restart Webflow functionality after the transition
};
