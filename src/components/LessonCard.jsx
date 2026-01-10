import { useNavigate } from "react-router-dom";

export default function LessonCard({ lesson }) {
  const navigate = useNavigate();

  return (
    <div
  onClick={() => navigate(`/lesson/${lesson.id}`)}
  className={`
    relative p-5 rounded-2xl border
    transition-all duration-300
    bg-gradient-to-br from-surface to-secondary-50
    shadow-card cursor-pointer min-w-[400px] min-h-[180px]
  `}
>

  {/* Header */}
  <div className="flex justify-between items-start">
    <div>
      <h3 className={`
        text-lg font-extrabold
        text-gray-400"
      `}>
        {lesson.title}
      </h3>

      <p className="text-sm text-text-muted mt-1 leading-snug">
        {lesson.description}
      </p>
    </div>

    {/* XP Badge */}
    <div className="
      text-xs font-bold
      bg-secondary-100 text-secondary-600
      px-3 py-1 rounded-full min-w-[80px]
    ">
      ⭐ {lesson.xp} XP
    </div>
  </div>

  {/* Status */}
  <div className="mt-4 flex justify-between items-center text-xs">
    <span className="text-text-muted">
      Status: <span className="font-semibold">{lesson.status || "Not started"}</span>
    </span>
      <span className="text-secondary-500 font-semibold">
        ▶ 
      </span>

  </div>
</div>

  );
}
