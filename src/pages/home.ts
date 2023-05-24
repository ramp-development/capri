import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

export const home = () => {
  console.log('home');

  gsap.registerPlugin(ScrollTrigger, SplitText);

  //   ScrollSmoother.create({ smooth: 1 });

  const header = document.querySelector<HTMLHeadElement>('header');
  const list = document.querySelector<HTMLDivElement>('.projects_list');
  const images = list?.querySelectorAll<HTMLImageElement>('img');
  if (!header || !list || !images) return;

  const headerHeight = list.offsetWidth;
  const toMove = ((list.childElementCount - 1) / list.childElementCount) * 100;
  header.style.height = `${headerHeight}px`;

  //   const proxy = { scale: 1 };
  //   const xSetter = gsap.utils.pipe(gsap.utils.clamp(1, 2), gsap.quickSetter('img', 'scale'));

  const headerTl = gsap.timeline({
    defaults: {
      ease: 'none',
    },
    scrollTrigger: {
      trigger: header,
      start: 'top top',
      end: 'bottom top',
      scrub: 1,
      //   onUpdate: (self) => {
      //     const scale = gsap.utils.clamp(1, 2, self.getVelocity() / 10000);
      //     // only do something if the skew is MORE severe. Remember, we're always tweening back to 0, so if the user slows their scrolling quickly, it's more natural to just let the tween handle that smoothly rather than jumping to the smaller skew.
      //     if (Math.abs(scale) > Math.abs(proxy.scale)) {
      //       proxy.scale = scale;
      //       gsap.to(proxy, {
      //         scale: 1,
      //         duration: 0.8,
      //         ease: 'power3',
      //         overwrite: true,
      //         onUpdate: () => xSetter(proxy.scale),
      //       });
      //     }
      //   },
    },
  });

  headerTl
    .to(list, {
      xPercent: -toMove,
    })
    .to(
      images,
      {
        xPercent: -50,
      },
      '<'
    );

  const takeover = document.querySelector<HTMLDivElement>('.takeover');
  const takeoverContent = takeover?.querySelector<HTMLDivElement>('.takeover_content');
  const takeoverCTA = takeover?.querySelector<HTMLDivElement>('.takeover_cta');

  const takeoverTl = gsap.timeline({
    defaults: { duration: 1, ease: 'power2.out', stagger: 0.01, force3D: true },
    scrollTrigger: {
      trigger: takeover,
      start: 'top center',
    },
  });

  [...takeoverContent?.children].forEach((child, index) => {
    const formatted = new SplitText(child, { type: 'lines' });
    formatted.lines.forEach((line) => line.classList.add('split-mask'));

    takeoverTl.from(
      formatted.lines,
      {
        opacity: 0,
        rotationX: -95,
        translateY: '100%',
        stagger: 0.1,
      },
      index === 0 ? '<' : '<1'
    );
  });
};
