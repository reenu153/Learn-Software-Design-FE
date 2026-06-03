import { useNavigate } from "react-router-dom";

export default function TopicCard({ topic }) {
  const navigate = useNavigate();

  return (
    <div
      role="button"
      onClick={() => navigate(`/topic/${topic.id}`)}
      className={`
        relative p-6 rounded-2xl w-[350px]
        transition-all duration-300 bg-white
        border border-primary-200 h-[200px]
        hover:-translate-y-1 hover:shadow-glow hover:scale-[1.02] cursor-pointer

      `}
    >

      <div className="flex items-center text-lg font-extrabold
        text-gray-400 justify-between">
        <h3 className={`
          text-xl font-extrabold
        `}>
          {topic.title}
        </h3>
      </div>


      <p className="text-sm text-text-muted mt-2 leading-relaxed">
        {topic.description}
      </p>
        <div>
        <div className="mt-4 text-xs font-semibold text-secondary-500">
          ▶ View Modules
        </div>
        </div>
    </div>
  );
}

