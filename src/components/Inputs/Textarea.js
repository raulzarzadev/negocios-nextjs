import { forwardRef } from 'react'
// eslint-disable-next-line react/display-name
const Textarea = forwardRef(

  ({ label, error, ...rest }, ref) => {
    return (
      <div className="form-control">
        {label && (
          <label className="label">
            <span className="label-text">{label}</span>
          </label>
        )}
        <textarea
          ref={ref}
          className="textarea  resize-none"
          {...rest}
        ></textarea>
        {error && (
          <label className="">
            <span className="text-sm text-error">
              {error}
            </span>
          </label>
        )}
      </div>
    )
  }
)

export default Textarea
