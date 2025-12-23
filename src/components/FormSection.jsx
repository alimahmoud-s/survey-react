import React from 'react';
import Question from './Question';
import AnswerOptions from './AnswerOptions';

const FormSection = ({ stepData, isActive, formData, onChange, errors, lang }) => {
    const { title, description, questions } = stepData;

    return (
        <div className={`form-section ${isActive ? 'active' : ''}`}>
            <h2 dangerouslySetInnerHTML={{ __html: title }}></h2>
            {description && <p style={{ color: 'var(--text-muted)', fontSize: '0.9em', marginBottom: '20px' }}>{description}</p>}
            {questions.map((question, index) => (
                <div key={index} className="question-block">
                    {question.type === 'text' ? (
                        <Question question={question} formData={formData} onChange={onChange} errors={errors} />
                    ) : (
                        <>
                            <label className="q-text">{question.label}</label>
                            <AnswerOptions question={question} formData={formData} onChange={onChange} errors={errors} />
                            {question.name === 'platform' && formData.platform.includes('other') && (
                                <div style={{ marginTop: '15px' }}>
                                    <input
                                        type="text"
                                        placeholder={lang.ph_specify}
                                        value={formData.otherPlatform}
                                        onChange={(e) => onChange('otherPlatform', e.target.value)}
                                    />
                                </div>
                            )}
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default FormSection;