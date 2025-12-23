import React from 'react';

const AnswerOptions = ({ question, formData, onChange, errors }) => {
    const { type, name, options } = question;

    if (type === 'scale') {
        return (
            <>
                <div className="scale-options">
                    {options.map((option, index) => (
                        <label key={index} className="scale-item">
                            <span>{option.label}</span>
                            <input type="radio" className="required-input" name={name} value={option.value} checked={formData[name] === option.value} onChange={() => onChange(name, option.value)} />
                        </label>
                    ))}
                </div>
                {errors[name] && <span className="error">{errors[name]}</span>}
            </>
        );
    }

    return (
        <>
            <div className="options-group">
                {options.map((option, index) => (
                    <label key={index} className="option-label">
                        <input type={type} className="required-input" name={name} value={option.value} checked={type === 'checkbox' ? (formData[name] || []).includes(option.value) : formData[name] === option.value} onChange={type === 'checkbox' ? (e) => {

                            const checked = e.target.checked;

                            const current = formData[name] || [];

                            const newVal = checked ? [...current, option.value] : current.filter(v => v !== option.value);

                            onChange(name, newVal);

                        } : () => onChange(name, option.value)} />
                        {option.icon && <i className={option.icon}></i>} {option.label}
                    </label>
                ))}
            </div>
            {errors[name] && <span className="error">{errors[name]}</span>}
        </>
    );
};

export default AnswerOptions;