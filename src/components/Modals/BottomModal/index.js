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
      <div className="modal-box bg-white p-0 max-h-screen overflow-auto relative ">
        <header
          className={
            'flex justify-between sticky p-3 pb-0 top-0 left-0 right-0  z-10  bg-white border-b-2 border-opacity-25'
          }
        >
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
          className={
            'min-h-44 grid place-content-center p-3 pt-0'
          }
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
