import { useEffect, useState } from "react";
import { fetchLessons, fetchModules } from "../../api";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function QuestionsTab() {
  const [type, setType] = useState("Design");
  const [questionText, setQuestionText] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [starterDiagram, setStarterDiagram] = useState("");
  const [solutionText, setSolutionText] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [points, setPoints] = useState();
  const [moduleId, setModuleId] = useState(null);
  const [modules, setModules] = useState([]);
  const [prompt, setPrompt] = useState("");
  const [allCourses, setAllCourses] = useState([]);
  const [coursePathId, setCoursePathId] = useState(null);

  useEffect(()=>{
    fetchLessons().then((data)=>{
      setAllCourses(data);
      setCoursePathId(data[0]?.id);
    });
  },[]);

  useEffect(() => {
    if(coursePathId)
    fetchModules(coursePathId).then((data) => {
      setModules(data);
    });
  },[coursePathId]);


  const handleSubmit = async () => {
    const payload = {
      type,
      question_text: questionText,
      difficulty,
      starter_diagram:starterDiagram,
      task_description:taskDescription,
      module_id: moduleId,
      prompt,
      points
    };

    const response = await fetch(`${API_BASE_URL}/questions/module?module_id=${moduleId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if(response.status===200)
    {
        setType("Design");
        setQuestionText("");
        setSolutionText("");
        setDifficulty("Easy");
        setPoints(0);
        setModuleId(null);
        setModules([]);
        setAllCourses([]);
        setCoursePathId(null);
        setPrompt("");
        setStarterDiagram("");
        setTaskDescription("");
      alert("Question created");
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
  <div>
        <label className="block font-medium">Course which module belongs to</label>
        <select
          className="border p-2 w-full"
          value={coursePathId}
          onChange={(e) => setCoursePathId(e.target.value)}
        >
         {allCourses?.map((course) =>( <option key={course?.id} value={course?.id}>{course?.title}</option>))}

        </select>
      </div>
      {/* Module */}
      <div>
        <label>Module*</label>
        <select
          className="border p-2 w-full"
          value={moduleId}
          onChange={(e) => setModuleId(e.target.value)}
        >
          <option>Select Module</option>
          {modules.map(m => (
            <option key={m.id} value={m.id}>{m.title}</option>
          ))}
        </select>
      </div>

      {/* Type */}
      <div>
        <label>Type</label>
        <select
          className="border p-2 w-full"
          defaultValue={"Design"}
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option>Design</option>
        </select>
      </div>

      {/* Difficulty */}
      <div>
        <label>Difficulty</label>
        <select
          className="border p-2 w-full"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option>Easy</option>
          <option>Medium</option>
          <option>Hard</option>
        </select>
      </div>


      <div>
        <label className="block font-medium">Points</label>
        <input
          className="border p-2 w-full"
          value={points}
          onChange={(e) => setPoints(e.target.value)}
        />
      </div>

      {/* Question Text */}
      <div>
        <label>Question*</label>
        <textarea
          className="border p-2 w-full"
          rows={4}
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
        />
      </div>
      <div>
        <label>Starter Diagram : Mermaid UML Code (Optional)</label>
        <textarea
          className="border p-2 w-full"
          rows={4}
          value={starterDiagram}
          onChange={(e) => setStarterDiagram(e.target.value)}
        />
      </div>
      <div>
        <label>Task Description (Optional) </label>
        <textarea
          className="border p-2 w-full"
          rows={4}
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
      </div>

      <div>
        <label>Prompt*</label>
        <textarea
          className="border p-2 w-full"
          rows={4}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
      </div>

      {/* Solution */}
   { type==='MCQ' &&  <div>
        <label>Solution</label>
        <textarea
          className="border p-2 w-full"
          rows={4}
          value={solutionText}
          onChange={(e) => setSolutionText(e.target.value)}
        />
      </div>}
      {/* Dynamic Metadata Section */}
      {/* {type === "MCQ" && (
        <div className="space-y-2">
          <label>Options</label>
          {metadata.options?.map((opt, index) => (
            <input
              key={index}
              className="border p-2 w-full"
              value={opt}
              onChange={(e) => {
                const newOptions = [...metadata.options];
                newOptions[index] = e.target.value;
                setMetadata({ ...metadata, options: newOptions });
              }}
            />
          ))}

        </div>
      )}  */}

<button
        onClick={handleSubmit}
        className="bg-primary-500 text-white px-4 py-2 rounded"
      >
        Create Question
      </button>

    </div>
  );
}
