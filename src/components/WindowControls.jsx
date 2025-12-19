import useWindowStore from "#store/window";

const WindowControls = ({ target }) => {
  const { closeWindow } = useWindowStore();

  return (
    <div id="window-controls">
      <div
        className="close"
        role="button"
        aria-label="Close window"
        onClick={() => closeWindow(target)}
        onKeyDown={(e) =>
          (e.key === "Enter" || e.key === " ") && closeWindow(target)
        }
      />
      <div className="minimize" />
      <div className="maximize" />
    </div>
  );
};
export default WindowControls;
