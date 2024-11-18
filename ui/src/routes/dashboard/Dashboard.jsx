import { useNavigate } from "react-router-dom";
import "./dashboard.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Dashboard = () => {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (prompt) => {
      return fetch("http://localhost:3000/api/chats", {
        method: "POST",
        credentials: "include",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({ question: prompt }),
      }).then((res) => res.json());
    },
    onSuccess: (id) => {
      queryClient.invalidateQueries({ queryKey: ["userChats"] });
      navigate(`/dashboard/chats/${id}`);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const prompt = e.target.text.value;
    if (!prompt) return;
    
    mutation.mutate(prompt);
  };

  return (
    <div className="dashboard">
      <div className="texts">
        <div className="options">
          <div className="option">
            <span>Start a New Conversation</span>
          </div>
        </div>
      </div>
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <input type="text" name="text" placeholder="Start chatting now" />
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
