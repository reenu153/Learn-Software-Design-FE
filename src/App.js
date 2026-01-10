import '@xyflow/react/dist/style.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DragAndDrop from './components/DragAndDrop';
import HomeScreen from './components/HomeScreen';
import TopicScreen from './components/TopicScreen';
import LessonIntro from './components/LessonIntro';


const App = () => {
   
   
    return (
      <div className="w-screen h-screen">
           <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/topic/:topicId" element={<TopicScreen />} />
        <Route path="/lesson/:lessonId" element={<LessonIntro />} />
        <Route path="/lesson/:lessonId/editor" element={<DragAndDrop />} />
        {/* <Route path="/lesson/:lessonId/feedback" element={<FeedbackScreen />} /> */}
      </Routes>
    </BrowserRouter>
        
      </div>
    );
  }

export default App
