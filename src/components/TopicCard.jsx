import { useNavigate } from "react-router-dom";

export default function TopicCard({ topic }) {
  const navigate = useNavigate();

  return (
    <div
      role="button"
      onClick={() => navigate(`/topic/${topic.id}`)}
      className={`
        relative p-6 rounded-2xl text-primary-500
        transition-all duration-300
        bg-gradient-to-br from-surface to-primary-50
        border border-primary-200 min-h-[200px]
        hover:-translate-y-1 hover:shadow-glow hover:scale-[1.02] cursor-pointer

      `}
    >

      <div className="flex items-center justify-between">
        <h3 className={`
          text-xl font-extrabold
         text-primary-700
        `}>
          {topic.title}
        </h3>
      </div>


      <p className="text-sm text-text-muted mt-2 leading-relaxed">
        {topic.description}
      </p>
        <div>
        <div className="mt-4 text-xs font-semibold text-secondary-500">
          ▶ Start Lesson
        </div>
        </div>
    </div>
  );
}

