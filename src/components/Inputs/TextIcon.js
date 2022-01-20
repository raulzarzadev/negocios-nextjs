export default function TextIcon ({
  label,
  icon,
  InputComponent,
  ...rest
}) {
  return (
    <div className="form-control">
      {label && (
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
      )}
      <label className="input-group">
        <span className="w-[20%] text-white bg-primary flex ">
          {icon}
        </span>
        {(InputComponent && (
          <InputComponent
            {...rest}
          />
        )) || (
          <input
            className={'input w-[80%]  '}
            type="text"
            {...rest}
          />
        )}
      </label>
    </div>
  )
}
