import { useParams } from "react-router-dom";
import { lessons } from "../data/lessons";
import LessonCard from "../components/LessonCard";

export default function TopicScreen() {
  const { topicId } = useParams();
  const topicLessons = lessons?.filter((l) => l.type === topicId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-100 via-secondary-300 to-primary-500">
      <div className="container mx-auto p-6">

        {/* Header */}
        <div className="mb-8">
          <h2
            className="
              text-3xl sm:text-4xl font-extrabold
              bg-gradient-to-r from-primary-600 to-secondary-500
              bg-clip-text text-transparent
            "
          >
            Lessons
          </h2>

          <p className="mt-2 text-sm text-text-muted max-w-xl">
            Complete lessons to gain XP and unlock the next challenge.
          </p>

          {/* Progress Bar */}
          <div className="mt-5 max-w-md">
            <div className="flex justify-between text-xs text-text-muted mb-1">
              <span>Topic Progress</span>
              <span>40%</span>
            </div>
            <div className="h-3 rounded-full bg-surface-muted overflow-hidden">
              <div className="h-full w-2/5 bg-gradient-to-r from-primary-500 to-secondary-500 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Lessons Grid */}
        <div
          className="
            grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3
            gap-6
          "
        >
          {topicLessons?.map((l, index) => (
            <div
              key={l.id}
              className="
                transform transition-all duration-300
                hover:-translate-y-1 hover:scale-[1.02]
              "
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <LessonCard lesson={l} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
