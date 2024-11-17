import "./newPrompt.css";
import { useRef, useEffect, useState } from "react";
import Markdown from "react-markdown";
import { useQueryClient, useMutation } from "@tanstack/react-query";

const NewPrompt = ({ data }) => {
  const endRef = useRef(null);
  const formRef = useRef(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  useEffect(() => {
    console.log("use effect is called. current values are");
    console.log(`answer: ${answer}; question: ${question}`);
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [data, question, answer]);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: ({ question, answer }) => {
      console.log(`inside mutation fn. answer is ${answer}`);
      return fetch(`http://localhost:3000/api/chats/${data._id}`, {
        method: "PUT",
        credentials: "include",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          question: question.length ? question : undefined,
          answer,
        }),
      }).then((res) => res.json());
    },
    onSuccess: () => {
      queryClient
        .invalidateQueries({ queryKey: ["chat", data._id] })
        .then(() => {
          formRef.current.reset();
          setQuestion("");
          setAnswer("");
        });
    },
    onError: (error) => {
      console.error(`[NewPrompt.jsx] Mutation error: ${error}`);
    },
  });

  const add = async (prompt, firstQuestion) => {
    if (!firstQuestion) setQuestion(prompt);

    try {
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

      mutation.mutate({
        question: prompt,
        answer: llmResponse,
      });
    } catch (error) {
      console.error(
        `[NewPrompt.jsx] Error caught while interacting with the model: ${error}`
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const prompt = e.target.text.value;
    if (!prompt) return;

    add(prompt, false);
  };

  const alreadyRan = useRef(false);
  useEffect(() => {
    if (!alreadyRan.current) {
      if (data?.history?.length === 1) {
        add(data.history[0].content[0].text, true);
      }
    }
    alreadyRan.current = true;
  }, []);

  return (
    <>
      {question && <div className="message user">{question}</div>}
      {answer && (
        <div className="message">
          <Markdown>{answer}</Markdown>
        </div>
      )}
      <div className="endChat" ref={endRef}></div>
      <form className="newForm" onSubmit={handleSubmit} ref={formRef}>
        <input type="text" name="text" placeholder="Start chatting now" />
        <button>Send</button>
      </form>
    </>
  );
};

export default NewPrompt;
