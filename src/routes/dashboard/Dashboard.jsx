import "./dashboard.css";

const Dashboard = () => {
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
        <form action="">
          <input type="text" placeholder="Start chatting now" />
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default Dashboard;
