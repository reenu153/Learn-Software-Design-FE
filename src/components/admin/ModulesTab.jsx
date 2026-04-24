import { useEffect, useState } from "react";
import { fetchLessons } from "../../api";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export default function ModulesForm() {
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState("Beginner");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState();
  const [allCourses, setAllCourses] = useState([]);
  const [coursePathId, setcoursePathId] = useState(null);

  useEffect(()=>{
    fetchLessons().then((data)=>{
      setAllCourses(data);
    });
  },[]);

  const handleSubmit = async () => {
    const payload = {
      title:name,
      course_path_id:coursePathId,
      order_index:0,
      points,
      description,
    };

    const response = await fetch(`${API_BASE_URL}/module`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if(response.status===200)
    {
        setName("")
        setDifficulty("Beginner")
        setDescription("")
        setPoints(0)
        setAllCourses([])
        setcoursePathId(null);
        alert("Module created");
    }
  };
 console.log(coursePathId);
  return (
    <div className="space-y-6 max-w-xl">

      <div>
        <label className="block font-medium">Module Name</label>
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
        <label className="block font-medium">Course which module belongs to</label>
        <select
          className="border p-2 w-full"
          value={coursePathId}
          onChange={(e) => setcoursePathId(e.target.value)}
        >
         {allCourses?.map((course) =>( <option key={course?.id} value={course?.id}>{course?.title}</option>))}

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
        Create Module
      </button>

    </div>
  );
}
