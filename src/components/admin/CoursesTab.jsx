import { useState } from "react";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function CourseForm() {
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState("Beginner");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState();

  const handleSubmit = async () => {
    const payload = {
      title:name,
      difficulty_level:difficulty,
      description,
    };

    const response = await fetch(`${API_BASE_URL}/courses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if(response.status===200)
    {alert("Course created");
      setName("")
      setDifficulty("Beginner")
      setDescription("")
      setPoints(0)
    }
  };

  return (
    <div className="space-y-6 max-w-xl">

      <div>
        <label className="block font-medium">Course Name</label>
        <input
          className="border p-2 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label className="block font-medium">Difficulty</label>
        <select
          className="border p-2 w-full"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
      </div>

      <div>
        <label className="block font-medium">Points</label>
        <input
          type="number"
          className="border p-2 w-full"
          value={points}
          onChange={(e) => setPoints(Number(e.target.value))}
        />
      </div>

      <div>
        <label className="block font-medium">Description</label>
        <textarea
          className="border p-2 w-full"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="bg-primary-500 text-white px-4 py-2 rounded"
      >
        Create Course
      </button>

    </div>
  );
}
