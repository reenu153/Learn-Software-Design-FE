import { Routes, Route, useLocation } from 'react-router-dom'
import HomeScreen from './pages/HomeScreen'
import MermaidPage from './components/Mermaid'
import AdminCurriculumPage from './pages/AdminPage'
import LoginPage from './pages/Login'
import ProtectedRoute from './pages/ProtectedRoute'
import ModulesPage from './pages/ModulesPage'
import QuestionsByModulePage from './pages/QuestionsByModulePage'
import Header from './components/Header'
import Submissions from './components/Submissions'
import SolveQuestion from './pages/SolveQuestion'
import SignupPage from './pages/SignUp'
import SolveQuestionDragDrop from './pages/SolveQuestionDragDrop'

const App = () => {
   const location = useLocation()
   return (
      <div className="w-screen h-screen">
         {location.pathname !== '/login' && <Header />}
         <Routes>
            <Route
               path="/"
               element={
                  <ProtectedRoute>
                     <HomeScreen />
                  </ProtectedRoute>
               }
            />

            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route
               path="/topic/:topicId"
               element={
                  <ProtectedRoute>
                     <ModulesPage />
                  </ProtectedRoute>
               }
            />

            <Route
               path="/module/:moduleId"
               element={
                  <ProtectedRoute>
                     <QuestionsByModulePage />
                  </ProtectedRoute>
               }
            />

            <Route
               path="/module/:questionId/editor"
               element={
                  <ProtectedRoute>
                     {/* <SolveQuestion /> */}
                     <SolveQuestionDragDrop />
                  </ProtectedRoute>
               }
            />

            <Route
               path="/mermaid"
               element={
                  <ProtectedRoute>
                     <MermaidPage />
                  </ProtectedRoute>
               }
            />

            <Route
               path="/admin"
               element={
                  <ProtectedRoute>
                     <AdminCurriculumPage />
                  </ProtectedRoute>
               }
            />

            <Route
               path="/:questionId/submissions"
               element={
                  <ProtectedRoute>
                     <Submissions />
                  </ProtectedRoute>
               }
            />
         </Routes>
      </div>
   )
}

export default App
