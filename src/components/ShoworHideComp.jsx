export const ShoworHideComp = ({ open,setOpen, isLeftSide=true }) => 
    <button
    onClick={() => setOpen(!open)}
    className='absolute top-1/2 -translate-y-1/2 z-10 flex items-center justify-center w-5 h-10 rounded-r-lg bg-white border border-gray-200 shadow-sm hover:bg-gray-50 transition text-gray-400 hover:text-gray-60'
    style={{
        ...(isLeftSide
            ? { left: open ? '270px' : '0px', borderLeft: 'none', borderRadius: '0 6px 6px 0' }
            : { left:open &&'-20px', right:!open && '0px', borderRight: 'none', borderRadius: '6px 0 0 6px' }),
       transition: 'left 0.3s, right 0.3s',
    }}
 >
    {open ? (
       <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path
             d={isLeftSide ? "M7 1L3 5L7 9" : "M3 1L7 5L3 9"}
             stroke="currentColor"
             strokeWidth="1.5"
             strokeLinecap="round"
             strokeLinejoin="round"
          />
       </svg>
    ) : (
       <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
          <path
             d={isLeftSide ? "M3 1L7 5L3 9" : "M7 1L3 5L7 9"}
             stroke="currentColor"
             strokeWidth="1.5"
             strokeLinecap="round"
             strokeLinejoin="round"
          />
       </svg>
    )}
 </button>
