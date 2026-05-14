import formatFeedback from '../utils/formatter'

export const FeedbackContent = ({ feedback }) => (
   <div className="p-4 border rounded-lg bg-gray-50">
      <div className="mb-2">
         <strong>Status:</strong>{' '}
         <span className={feedback.passed ? 'text-green-600' : 'text-red-500'}>
            {feedback.passed ? 'Passed' : 'Failed'}
         </span>
      </div>

      {feedback?.grade && (
         <div className="mb-2">
            <strong>Grade:</strong> {feedback.grade}
         </div>
      )}

      <div>
         <strong>Feedback:</strong>
         <p className="mt-1 whitespace-pre-line">
            {formatFeedback(feedback.feedback)}
         </p>
      </div>
   </div>
)
