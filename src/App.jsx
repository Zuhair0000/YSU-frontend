import React, { useState } from "react";
import Navbar from "./Navbar";
import "./App.css";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAsk = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setError("");
    setAnswer("");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/questions/ask`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question }),
        }
      );

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to get answer");
      }

      const data = await res.json();
      setAnswer(data.answer);
      if (data.cached) {
        setError("ℹ️ This answer was retrieved from cache.");
      }
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="app-container">
        <div className="card">
          <h2 className="card-title">Ask Anything Related to UTHM 🇾🇪</h2>
          <textarea
            className="input-box"
            placeholder="e.g. How do I renew my visa?"
            rows={4}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button className="ask-button" onClick={handleAsk} disabled={loading}>
            {loading ? "Waiting for answer..." : "Ask"}
          </button>

          {error && <div className="error-msg">{error}</div>}

          {answer && (
            <div className="answer-box">
              <h3>Answer:</h3>
              <p>{answer}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
