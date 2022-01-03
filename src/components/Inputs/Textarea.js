export default function Textarea ({ label, ...rest }) {
  return (
    <div className="form-control">
      {label && (
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
      )}
      <textarea
        className="textarea  resize-none"
        { ...rest }
      ></textarea>
    </div>
  )
}
