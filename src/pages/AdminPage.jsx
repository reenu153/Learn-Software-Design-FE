import { useState } from "react";
import CoursesTab from "../components/admin/CoursesTab";
import QuestionsTab from "../components/admin/QuestionsTab";
import ModulesTab from "../components/admin/ModulesTab";

export default function AdminCurriculumPage() {
  const [activeTab, setActiveTab] = useState("courses");

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Curriculum Management</h1>

      <div className="flex gap-4 border-b mb-6">
        {["courses", "modules", "questions"].map((tab) => (
          <button
            key={tab}
            className={`pb-2 ${
              activeTab === tab
                ? "border-b-2 border-blue-500 font-semibold"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {activeTab === "courses" && <CoursesTab />}
      {activeTab === "modules" && <ModulesTab />}
      {activeTab === "questions" && <QuestionsTab />}
    </div>
  );
}
