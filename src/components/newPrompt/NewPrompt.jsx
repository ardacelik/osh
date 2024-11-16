import "./newPrompt.css";
import { useRef, useEffect } from "react";

const NewPrompt = () => {
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <>
      <div className="endChat" ref={endRef}></div>
      <form className="newForm">
        <input type="text" placeholder="Start chatting now" />
        <button>Send</button>
      </form>
    </>
  );
};

export default NewPrompt;
