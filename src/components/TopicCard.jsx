import { useNavigate } from "react-router-dom";

export default function TopicCard({ topic }) {
  const navigate = useNavigate();

  topic.unlocked = topic.unlocked ?? true;

  return (
    <div
      role="button"
      onClick={() => topic.unlocked && navigate(`/topic/${topic.id}`)}
      className={`
        relative p-6 rounded-2xl text-primary-500
        transition-all duration-300
        bg-gradient-to-br from-surface to-primary-50
        border border-primary-200 min-h-[200px]

        ${topic.unlocked
          ? "hover:-translate-y-1 hover:shadow-glow hover:scale-[1.02] cursor-pointer"
          : "cursor-not-allowed opacity-60 grayscale"}
      `}
    >
      {/* 🔒 Lock Badge */}
      {!topic.unlocked && (
        <span className="
          absolute top-4 right-4
          text-xs font-bold
          bg-gray-200 text-gray-600
          px-2 py-1 rounded-full
        ">
          🔒
        </span>
      )}

      {/* Title */}
      <div className="flex items-center justify-between">
        <h3 className={`
          text-xl font-extrabold
          ${topic.unlocked ? "text-primary-700" : "text-gray-400"}
        `}>
          {topic.title}
        </h3>
      </div>

      {/* Description */}
      <p className="text-sm text-text-muted mt-2 leading-relaxed">
        {topic.description}
      </p>

    

      {/* CTA Hint */}
      {topic.unlocked && (
        <div>
          {/* <div className="mt-6">
          <div className="flex items-center justify-between text-xs text-text-muted mb-1">
            <span>Progress</span>
            <span className="font-semibold text-primary-600">
              {topic.progress ?? "0%"}
            </span>
          </div>
  
          <div className="h-2 w-full rounded-full bg-surface-muted overflow-hidden">
            <div
              className={`
                h-full transition-all duration-500
                bg-gradient-to-r from-primary-500 to-secondary-500
                ${topic.unlocked ? "" : "opacity-40"}
              `}
              style={{ width: topic.progress ?? "0%" }}
            />
          </div> */}
        {/* </div> */}
        <div className="mt-4 text-xs font-semibold text-secondary-500">
          ▶ Start Lesson
        </div>
        </div>
      )}
    </div>
  );
}

