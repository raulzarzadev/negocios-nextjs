import React from 'react'
import ICONS from 'src/utils/ICONS'

export default function BottomModal ({
  title = 'Modal title',
  open,
  handleOpen = () => {},
  children,
  footerAcctions
}) {
  return (
    <div
      className={`${
        open ? 'visible' : 'invisible'
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
            <ICONS.Close />
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
