import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./LessonList.css";
import Navbar from "../navbar/Navbar";

function LessonList() {
  const { levelId } = useParams();
  const [lessons, setLessons] = useState([]);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [lessonsResponse, profileResponse] = await Promise.all([
          axios.get(`http://localhost:8086/lesson/getAllByLevel/${levelId}`),
          axios.get("http://localhost:8086/user/my-profile", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
            },
          }),
        ]);

        const { data: lessonsData } = lessonsResponse;
        const { data: profileData } = profileResponse;

        setLessons(lessonsData);
        // setLevelNames(profileData.levelNames.sort());
        setEmail(profileData.email);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [levelId]);

  return (
    <div className="mainLessonList">
      <Navbar email={email} />
      <div className="main-lessonList">
        <h2>Lektionen für das Niveau {levelId}</h2>
        <div className="container mt-4">
          <div className="row">
            {lessons.map((lesson) => (
              <div key={lesson.id} className="col-md-4">
                <div className="card topic-card">
                  <div className="card-body">
                    <h5 className="card-title">{lesson.title}</h5>
                    <p className="card-text">{lesson.description}</p>
                    <Link
                      to={`/lesson/${lesson.id}/grammar`}
                      className="btn btn-primary"
                    >
                      Start
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LessonList;
