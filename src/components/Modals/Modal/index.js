import React from 'react'

export default function Modal ({
  title = 'Modal title',
  open,
  handleOpen = () => {},
  children,
  footerAcctions
}) {
  return (
    <div
      className={`${
        open ? 'flex' : 'hidden'
      } modal modal-open `}
      id="modal-1"
      //  style={{ display: !open && 'none' }}
      onClick={(e) => {
        e.target.id === 'modal-1' && handleOpen()
      }}
    >
      <div className="modal-box bg-slate-100 p-3 ">
        <header className={'flex justify-between'}>
          <div className={'w-[80%] text-center'}>
            <h5>{title}</h5>
          </div>
          <button
            className={'p-1'}
            onClick={(e) => {
              e.preventDefault()
              handleOpen()
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-6 h-6 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </header>
        <section
          className={'min-h-44 grid place-content-center'}
        >
          {children}
        </section>
        <footer className="modal-action">
          {footerAcctions}
        </footer>
      </div>
    </div>
  )
}
