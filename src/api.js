const API_BASE_URL = process.env.REACT_APP_API_BASE_URL

export const fetchLessons = async () => {
   try {
      const response = await fetch(`${API_BASE_URL}/courses`)
      if (!response.ok) {
         throw new Error(`Failed to fetch lessons: ${response.statusText}`)
      }
      const data = await response.json()
      return data
   } catch (error) {
      console.error('Error fetching lessons:', error)
      throw error
   }
}

export const fetchModules = async (coursePathId) => {
   try {
      const response = await fetch(
         `${API_BASE_URL}/module/course?course_path_id=${coursePathId}`
      )
      if (!response.ok) {
         throw new Error(`Failed to fetch modules: ${response.statusText}`)
      }
      const data = await response.json()
      return data
   } catch (error) {
      console.error('Error updating lesson status:', error)
      throw error
   }
}

export const fetchModuleById = async (moduleId) => {
   try {
      const response = await fetch(
         `${API_BASE_URL}/module?module_id=${moduleId}`
      )
      if (!response.ok) {
         throw new Error(`Failed to fetch module: ${response.statusText}`)
      }
      const data = await response.json()
      return data
   } catch (error) {
      console.error('Error updating lesson status:', error)
      throw error
   }
}

export const fetchQuestions = async (moduleId) => {
   try {
      const response = await fetch(
         `${API_BASE_URL}/questions/module?module_id=${moduleId}`
      )
      if (!response.ok) {
         throw new Error(`Failed to fetch questions: ${response.statusText}`)
      }
      const data = await response.json()
      return data
   } catch (error) {
      console.error('Error fetching questions:', error)
      throw error
   }
}

export const fetchQuestionById = async (questionId) => {
   try {
      const response = await fetch(
         `${API_BASE_URL}/questions?question_id=${questionId}`
      )
      if (!response.ok) {
         throw new Error(`Failed to fetch questions: ${response.statusText}`)
      }
      const data = await response.json()
      return data
   } catch (error) {
      console.error('Error fetching questions:', error)
      throw error
   }
}

export const evaluateAnswer = async (questionId, payload) => {
   const token = localStorage.getItem('token')
   try {
      const response = await fetch(`${API_BASE_URL}/evaluate-diagram`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
         },
         body: JSON.stringify({ question_id: questionId, ...payload }),
      })

      if (response.status === 401) {
         localStorage.removeItem('token')
         window.location.href = '/login'
         return
      }

      if (!response.ok) {
         throw new Error(`Failed to evaluate answer: ${response.statusText}`)
      }

      const data = await response.json()
      return data
   } catch (error) {
      console.error('Error evaluating answer:', error)
      throw error
   }
}

export const fetchModulesWithProgress = async (course_path_id) => {
   const token = localStorage.getItem('token')
   try {
      const response = await fetch(
         `${API_BASE_URL}/progress?course_path_id=${course_path_id}`,
         {
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${token}`,
            },
         }
      )
      if (response.status === 401) {
         localStorage.removeItem('token')
         window.location.href = '/login'
         return
      }
      if (!response.ok) {
         throw new Error(`Failed to fetch questions: ${response.statusText}`)
      }
      const data = await response.json()
      return data
   } catch (error) {
      console.error('Error fetching questions:', error)
      throw error
   }
}

export const fetchQuestionSubmissions = async (question_id) => {
   const token = localStorage.getItem('token')
   try {
      const response = await fetch(
         `${API_BASE_URL}/questions/${question_id}/submissions`,
         {
            headers: {
               'Content-Type': 'application/json',
               Authorization: `Bearer ${token}`,
            },
         }
      )
      if (response.status === 401) {
         localStorage.removeItem('token')
         window.location.href = '/login'
         return
      }
      if (!response.ok) {
         throw new Error(`Failed to fetch questions: ${response.statusText}`)
      }
      const data = await response.json()
      return data
   } catch (error) {
      console.error('Error fetching questions:', error)
      throw error
   }
}

export const fetchUserDetails = async () => {
   const token = localStorage.getItem('token')
   try {
      const response = await fetch(`${API_BASE_URL}/user`, {
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
         },
      })
      if (response.status === 401) {
         localStorage.removeItem('token')
         window.location.href = '/login'
         return
      }
      if (!response.ok) {
         throw new Error(`Failed to fetch user: ${response.statusText}`)
      }
      const data = await response.json()
      return data
   } catch (error) {
      console.error('Error fetching user:', error)
      throw error
   }
}


export const postMarkHintTaken = async (submissionId) => {
   const token = localStorage.getItem('token')
   try {
      const response = await fetch(`${API_BASE_URL}/submissions/took-hint`, {
         method: 'POST',
         body: JSON.stringify({ submission_id: submissionId }),
         headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
         },
      })
      if (response.status === 401) {
         localStorage.removeItem('token')
         window.location.href = '/login'
         return
      }
      const data = await response.json()
      return data
   } catch (error) {
      console.error('Error updating hint taken:', error)
      throw error
   }
 }