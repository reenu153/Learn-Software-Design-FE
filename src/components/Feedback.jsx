import React, { useEffect, useState } from 'react'
import parseData from '../utils/formatter'
import { postMarkHintTaken  } from '../api'

export const FeedbackContent = ({ feedback }) => {
   const data = parseData(feedback?.feedback)
   if (!data) return <p className="text-sm">{String(feedback)}</p>

   const get = (key) => data[key] ?? data[key.replace(/_/g, ' ')] ?? null
   const fixes = get('what_to_fix') ?? []
   const checks = get('self_check_questions') ?? []
   const passed = feedback.passed ?? null
   const submissionId = feedback?.submission_id

   return (
      <div className="p-4 border rounded-lg bg-gray-50">
         <div>
            <strong>Feedback:</strong>
            <div className="mt-3 font-sans text-[13px] leading-relaxed max-w-2xl">
               {passed !== null && (
                  <div className="flex items-center gap-2 mb-3">
                     <span
                        className={`text-[14px] font-semibold px-2.5 py-0.5 rounded-md border
      ${
         passed
            ? 'bg-green-50 text-green-700 border-green-200'
            : 'bg-red-50 text-red-700 border-red-200'
      }`}
                     >
                        {passed ? 'Passed' : 'Failed'}
                     </span>
                     {!passed && fixes.length > 0 && (
                        <span className="text-xs text-gray-400">
                           {fixes.length} issue{fixes.length !== 1 ? 's' : ''}{' '}
                           to address
                        </span>
                     )}
                  </div>
               )}

               {get('what_you_got_right') && (
                  <Card className="bg-green-50 border-green-200">
                     <Section
                        label="What you got right"
                        className="text-green-700"
                     >
                        <p className="text-green-800 text-xs m-0">
                           {get('what_you_got_right')}
                        </p>
                     </Section>
                  </Card>
               )}

               {fixes.length > 0 && (
                  <Card className="bg-white border-gray-200">
                     <Section label="What to fix" className="text-amber-700">
                        {fixes.map((item, i) => (
                           <IssueItem key={i} item={item} index={i} submissionId={submissionId}/>
                        ))}
                     </Section>
                  </Card>
               )}

               <div className="grid grid-cols-2 gap-2.5">
                  {checks.length > 0 && (
                     <Card className="bg-blue-50 border-blue-200">
                        <Section label="Self-check" className="text-blue-700">
                           <ul className="m-0 pl-4 text-blue-800 text-xs">
                              {checks.map((q, i) => (
                                 <li key={i} className="mb-1">
                                    {q}
                                 </li>
                              ))}
                           </ul>
                        </Section>
                     </Card>
                  )}
                  {get('next_step') && (
                     <Card className="bg-purple-50 border-purple-200">
                        <Section label="Next step" className="text-purple-700">
                           <p className="text-purple-900 text-xs m-0">
                              {get('next_step')}
                           </p>
                        </Section>
                     </Card>
                  )}
               </div>
            </div>
         </div>
      </div>
   )
}

const Section = ({ label, className, children }) => (
    <div className="mb-3">
      <div className={`text-[11px] font-semibold tracking-widest uppercase mb-1.5 ${className}`}>
        {label}
      </div>
      {children}
    </div>
  )
  
  const Card = ({ className, children }) => (
    <div className={`rounded-xl border px-3.5 py-3 mb-2.5 ${className}`}>
      {children}
    </div>
  )
  
  const RevealButton = ({ label, active, onClick }) => (
    <button
      onClick={onClick}
      className={`text-xs px-2.5 py-0.5 rounded-md border cursor-pointer inline-flex items-center gap-1 transition-colors
        ${active
          ? 'border-violet-300 text-violet-700 bg-transparent'
          : 'border-gray-200 text-gray-500 bg-transparent hover:bg-gray-50'
        }`}
    >
      {label}
    </button>
  )
  
  const IssueItem = ({ item, index, submissionId }) => {
    const [showFix, setShowFix] = useState(false)
    const NUMS = ['①', '②', '③']
    const handleShowFix = (showFix) => {
        setShowFix(!showFix)
         if (!showFix) {
        postMarkHintTaken(submissionId)
       }
    }
  
    return (
      <div className={`pl-3 mb-4 border-l-2 transition-colors duration-200 ${showFix ? 'border-violet-500' : 'border-gray-200'}`}>
        <div className="font-medium mb-1.5 text-gray-800">
          {NUMS[index] ?? `${index + 1}.`} {item.issue}
        </div>
  
        {item.why_it_matters && (
          <div className="bg-amber-50 text-amber-900 text-xs rounded-md px-2.5 py-1.5 mb-2">
            <span className="font-semibold">Why it matters: </span>{item.why_it_matters}
          </div>
        )}
  
        {item.hint && (
          <div className="bg-gray-50 text-gray-600 text-xs rounded-md px-2.5 py-1.5 mb-2">
           <span className="font-semibold">Hint: </span> {item.hint}
          </div>
        )}
  
        {item.fix && (
          <RevealButton
            label={showFix ? 'Hide fix' : 'Show fix'}
            active={showFix}
            onClick={() => handleShowFix(showFix)}
          />
        )}
  
        {showFix && item.fix && (
          <div className="bg-violet-50 text-violet-900 text-xs rounded-md px-2.5 py-1.5 mt-2">
            <span className="font-semibold">Fix: </span>{item.fix}
          </div>
        )}
      </div>
    )
  }