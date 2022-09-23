import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import Authentication from "./Authentication";

const events = [
  "load",
  "mousemove",
  "mousedown",
  "click",
  "scroll",
  "keypress",
];

const AutoLogout = () => {
  const { user, setUser } = useContext(UserContext);
  const [toastSignout, setToastSignout] = useState(false);

  let timer: NodeJS.Timeout;

  const logoutAction = () => {
    setToastSignout(true);
    setUser({ id: 0, name: "", email: "" });
    console.log(user);
    localStorage.clear();
  };

  const resetTimer = () => {
    if (timer) clearTimeout(timer);
  };

  const handleLogoutTimer = () => {
    timer = setTimeout(() => {
      resetTimer();
      events.forEach((item) => {
        window.removeEventListener(item, handleLogoutTimer);
      });
      if (user.name) logoutAction();
    }, 4000);
  };

  useEffect(() => {
    events.forEach((item) => {
      window.addEventListener(item, () => {
        resetTimer();
        if (user.name) handleLogoutTimer();
      });
    });
  }, []);

  return (
    <Authentication
      logoutAction={logoutAction}
      toastSignout={toastSignout}
      setToastSignout={setToastSignout}
    />
  );
};

export default AutoLogout;
