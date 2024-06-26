import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../../navbar/Navbar";
import "./Grammar.css";

function LessonDetailsGrammar() {
  const { lessonId } = useParams();
  const [lesson, setLesson] = useState(null);
  const [email, setEmail] = useState("");

  const handleReadingLessonClick = () => {
    window.location.href = `/lesson/${lessonId}/reading`;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [lessonResponse, profileResponse] = await Promise.all([
          axios.get(`http://localhost:8086/lesson/get/${lessonId}/grammar`),
          axios.get("http://localhost:8086/user/my-profile", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
          }),
        ]);

        const { data: lessonData } = lessonResponse;
        const { data: profileData } = profileResponse;

        setLesson(lessonData);
        setEmail(profileData.email);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [lessonId]);

  if (!lesson) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mainGrammar">
      <Navbar email={email} />
      <main>
        <div className="main_container">
          <h2 id="big_title">{lesson.title}</h2>
        </div>
        <div id="big_text">
          <p id="grDescr">{lesson.description}</p>
        </div>
        {lesson.imgPath && (
          <div
            style={{
              width: "100%",
              display: "flex ",
              justifyContent: "center",
              alignItems: "center",
              padding: "30px 0",
            }}
          >
            <img
              style={{ margin: "0 auto !important", width: "500px !important" }}
              id="img-grammar"
              src={`http://localhost:8086/${lesson.imgPath}`}
              alt="Lesson Image"
            />
          </div>
        )}
        <div className="button-container" style={{ padding: "0 0 70px" }}>
          <button
            className="button-79"
            role="button"
            onClick={handleReadingLessonClick}
          >
            Weiter
          </button>
        </div>
      </main>
    </div>
  );
}

export default LessonDetailsGrammar;
