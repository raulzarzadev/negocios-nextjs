export default function Text ({
  label,
  className,
  ...rest
}) {
  return (
    <div className="form-control">
      {label && (
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
      )}
      <input
        className={`${className} input w-full  `}
        type="text"
        {...rest}
      />
    </div>
  )
}
