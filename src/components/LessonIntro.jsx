import { useParams, useNavigate } from "react-router-dom";
import {lessons} from "../data/lessons";

const LessonIntro=() =>{
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const lesson = lessons.find((l) => l.id === lessonId) || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-100 via-secondary-300 to-primary-500 p-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold">{lesson.title}</h2>
        <p className="font-bold mt-3">{lesson.description}</p>
        <pre className="text-gray-800 mt-4 text-wrap">{lesson.question} </pre>
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => navigate(`/lesson/${lessonId}/editor`)}
            className="px-4 py-2 border-black border-[1px] rounded-[5px]"
          >
            Start Challenge
          </button>
          <button onClick={() => navigate(-1)} className="px-4 py-2 border rounded">Back</button>
        </div>
      </div>
    </div>
  );
}

export default LessonIntro;