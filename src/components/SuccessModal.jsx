import React from 'react';

const SuccessModal = ({ show, lang }) => {
    if (!show) return null;

    const isArabic = lang === 'ar';
    const fontFamily = isArabic ? '"Cairo", sans-serif' : '"Press Start 2P", cursive';

    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0,0,0,0.8)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 1000,
            }}
        >
            <div
                style={{
                    background: '#1a1a1a',
                    padding: '40px',
                    border: '3px solid #ffcc00',
                    boxShadow: '10px 10px 0px #ff0055',
                    textAlign: 'center',
                    fontFamily: fontFamily, // Dynamic Font
                    color: '#fff',
                }}
            >
                <h2 style={{ color: '#ffcc00', marginBottom: '20px' }}>
                    {isArabic ? 'تم رفع البيانات!' : 'DATA UPLOADED!'}
                </h2>
                <p style={{ marginBottom: '30px', fontFamily: 'var(--font-main)' }}>
                    {isArabic ? 'شكرًا لمشاركتك في هذه الدراسة.' : 'Thank you for participating in this study.'}
                </p>
                <button
                    onClick={() => window.location.reload()}
                    style={{
                        background: '#00ffff',
                        color: '#000',
                        padding: '15px 30px',
                        border: 'none',
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                        boxShadow: '4px 4px 0px #ff0055'
                    }}
                >
                    {isArabic ? 'إغلاق' : 'CLOSE'}
                </button>
            </div>
        </div>
    );
};

export default SuccessModal;