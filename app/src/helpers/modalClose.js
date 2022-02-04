export default function modalClose({ ref, setState, state }) {
  function handleClickOutside(e) {
    if (ref.current && !ref.current.contains(e.target)) setState(false);
  };

  function handleEscapeKey(e) {
    if (e.keyCode === 27) setState(false);
  }

  if (state) {
    document.addEventListener("click", handleClickOutside, false);
    document.addEventListener("keydown", handleEscapeKey, false);

    return () => {
      document.removeEventListener("click", handleClickOutside, false);
      document.removeEventListener("keydown", handleEscapeKey, false);
    };
  }
}