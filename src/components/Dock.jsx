import { useRef } from "react";
import { Tooltip } from "react-tooltip";
import gsap from "gsap";

import { dockApps } from "#constants";
import { useGSAP } from "@gsap/react";
import useWindowStore from "#store/window";

const Dock = () => {
  const { openWindow, closeWindow, windows } = useWindowStore();
  const dockRef = useRef(null);

  useGSAP(() => {
    const dock = dockRef.current;
    if (!dock) return;

    let icons = dock.querySelectorAll(".dock-icon");
    let centers = [];
    let dockLeft = 0;

    const computePositions = () => {
      const rect = dock.getBoundingClientRect();
      dockLeft = rect.left;
      icons = dock.querySelectorAll(".dock-icon");
      centers = Array.from(icons).map((icon) => {
        const r = icon.getBoundingClientRect();
        return r.left - dockLeft + r.width / 2;
      });
    };

    computePositions();

    const animateIcons = (mouseX) => {
      icons.forEach((icon, i) => {
        const center = centers[i] ?? 0;
        const distance = Math.abs(mouseX - center);
        const intensity = Math.exp(-(distance ** 2.5) / 20000);
        gsap.to(icon, {
          scale: 1 + 0.25 * intensity,
          y: -15 * intensity,
          duration: 0.2,
          ease: "power1.out",
        });
      });
    };

    const handleMouseMove = (e) => {
      animateIcons(e.clientX - dockLeft);
    };

    const resetIcons = () =>
      icons.forEach((icon) =>
        gsap.to(icon, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power1.out",
        })
      );

    const ro = new ResizeObserver(computePositions);
    ro.observe(dock);
    window.addEventListener("resize", computePositions);

    dock.addEventListener("mousemove", handleMouseMove);
    dock.addEventListener("mouseleave", resetIcons);

    return () => {
      dock.removeEventListener("mousemove", handleMouseMove);
      dock.removeEventListener("mouseleave", resetIcons);
      window.removeEventListener("resize", computePositions);
      ro.disconnect();
    };
  }, []);

  const toggleApp = (app) => {
    if (!app.canOpen) return;
    const window = windows[app.id];
    if (!window) {
      console.error(`No window found for app id: ${app.id}`);
      return;
    }
    if (window.isOpen) {
      closeWindow(app.id);
    } else {
      openWindow(app.id);
    }
  };
  return (
    <section id="dock">
      <div ref={dockRef} className="dock-container">
        {dockApps.map(({ id, name, icon, canOpen }) => (
          <div key={id} className="relative flex justify-center">
            <button
              type="button"
              className="dock-icon"
              aria-label={name}
              data-tooltip-id="dock-tooltip"
              data-tooltip-content={name}
              data-tooltip-delay-show={150}
              disabled={!canOpen}
              onClick={() => toggleApp({ id, canOpen })}
            >
              <img
                src={`/images/${icon}`}
                alt={name}
                loading="lazy"
                className={canOpen ? "" : "opacity-60"}
              />
            </button>
          </div>
        ))}
        <Tooltip id="dock-tooltip" place="top" className="tooltip" />
      </div>
    </section>
  );
};
export default Dock;
