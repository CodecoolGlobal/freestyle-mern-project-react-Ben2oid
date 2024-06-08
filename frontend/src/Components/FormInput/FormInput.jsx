import "./style.scss";

export const FormInput = ({ label, error, errorStyle, ...otherProps }) => {
  const { value } = otherProps;

  errorStyle = error ? true : errorStyle;

  const shrinkClass =
    value && typeof value === "string" && value.length ? "shrink" : "";

  return (
    <div className="group">
      <input
        className={`form-input ${errorStyle ? "error" : ""}`}
        {...otherProps}
      />
      {error && <span className="error-message">{error}</span>}
      {label && (
        <label className={`${shrinkClass} form-input-label`}>{label}</label>
      )}
    </div>
  );
};
