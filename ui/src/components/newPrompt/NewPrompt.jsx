import "./newPrompt.css";
import { useRef, useEffect, useState } from "react";
import Markdown from "react-markdown";

const NewPrompt = () => {
  const endRef = useRef(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [question, answer]);

  const add = async (prompt) => {
    setQuestion(prompt);

    const result = await fetch("http://localhost:3000/api/chat", {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({ question: prompt }),
    });

    const response = await result.json();
    const llmResponse = response.content;
    console.log(llmResponse);
    setAnswer(llmResponse);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const prompt = e.target.text.value;
    if (!prompt) return;

    add(prompt);
  };

  return (
    <>
      {question && <div className="message user">{question}</div>}
      {answer && (
        <div className="message">
          <Markdown>{answer}</Markdown>
        </div>
      )}
      <div className="endChat" ref={endRef}></div>
      <form className="newForm" onSubmit={handleSubmit}>
        <input type="text" name="text" placeholder="Start chatting now" />
        <button>Send</button>
      </form>
    </>
  );
};

export default NewPrompt;
