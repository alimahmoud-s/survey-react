import React from 'react';

const Question = ({ question, formData, onChange, errors }) => {
    return (
        <>
            <label className="q-text">{question.label}</label>
            {question.description && <p>{question.description}</p>}
            <input
                type="text"
                className={`required-input ${errors[question.name] ? 'input-error' : ''}`}
                name={question.name}
                placeholder={question.placeholder || ''}
                value={formData[question.name] || ''}
                onChange={(e) => onChange(question.name, e.target.value)}
            />
            <div className="error-message" style={{ display: errors[question.name] ? 'block' : 'none' }}>{errors[question.name]}</div>
        </>
    );
};

export default Question;