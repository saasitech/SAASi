export default function RadioGroup({ onChange, value, options }) {
  return (
    <>
      {options.map((option) => (
        <label
          className="label-text flex items-center space-x-2 cursor-pointer"
          key={option.label}
        >
          <input
            type="radio"
            value={option.value}
            checked={value === option.value}
            className="radio radio-sm radio-primary"
            onChange={(e) => {
              onChange(option.value);
            }}
          />
          <span className="label-text">{option.label}</span>
        </label>
      ))}
    </>
  );
}
