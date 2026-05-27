import "./style.css";
import { inView, animate, stagger, scroll } from "motion";

inView(".fade-target h2", (element) => {
  animate(element, { opacity: [0, 1], y: [40, 0] }, { duration: 1 });
});

inView(".cards", () => {
  animate(
    ".card",
    { opacity: [0, 1], y: [40, 0] },
    { duration: 0.5, delay: stagger(0.5) },
  );
});

scroll(animate(".progress-bar", { scaleX: [0, 1] }));

scroll(
  animate(".hero-title", { opacity: [1, 0], y: [0, -100] }),
  {
    target: document.querySelector(".hero"),
    offset: ["start 0.3", "start 0"],
  },
);

scroll(
  animate(".parallax-bg", { y: [0, -500] }),
  { target: document.querySelector(".parallax-section") },
);
