export default function Select ({
  helperText,
  label,
  options = [{ value: '', label: '' }],
  placeholder = null,
  ...rest
}) {
  return (
    <div className="form-control w-full max-w-xs">
      {label && (
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
      )}
      <select
        className="select select-bordered w-full"
        {...rest}
      >
        {placeholder && (
          <option disabled="disabled" selected="selected">
            {placeholder}
          </option>
        )}
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      {helperText && (
        <label className="label">
          <span className="label-text-alt">
            {helperText}
          </span>
        </label>
      )}
    </div>
  )
}
