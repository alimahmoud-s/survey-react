import { useState, useEffect } from 'react'
import Header from './components/Header'
import ProgressBar from './components/ProgressBar'
import FormSection from './components/FormSection'
import SuccessModal from './components/SuccessModal'
import './styles/App.css'

import { translations } from './data/locales';
import { getTranslatedSteps } from './data/surveySteps';

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbx5VkMx3YVHsT3A2ukgLmW_E1ojnJ2K3oIyot44Moz9-wXRHadG3E4WhIPw0_99m_QG/exec";

function parseArabicNum(str) {
  if (!str) return NaN;
  var d = str.toString();
  d = d.replace(/[٠-٩]/g, function (d) {
    return '٠١٢٣٤٥٦٧٨٩'.indexOf(d);
  });
  return parseInt(d);
}

function App() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isArabic, setIsArabic] = useState(true);
  const [theme, setTheme] = useState('light');
  const [steps, setSteps] = useState(() => getTranslatedSteps('ar'));
  const [formData, setFormData] = useState({
    p_name: '',
    p_age: '',
    gender: '',
    college: '',
    year: '',
    mins: '',
    platform: [],
    otherPlatform: '',
    sessions: '',
    q8: '',
    q9: '',
    q10: '',
    q11: '',
    q12: '',
    q13: '',
    q14: '',
    q15: '',
    crt: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isNextEnabled, setIsNextEnabled] = useState(false);

  const lang = isArabic ? translations.ar : translations.en;

  const changeStep = (n) => {
    if (n < currentStep) {
      // prev, no validation
      setCurrentStep(n);
      setErrors({});
      return;
    }
    // validate current step
    const currentQuestions = steps[currentStep].questions;
    let hasError = false;
    const newErrors = {};
    currentQuestions.forEach(q => {
      if (q.type === 'text') {
        if (!formData[q.name] || formData[q.name].trim() === '') {
          newErrors[q.name] = lang.err_required;
          hasError = true;
        }
      } else if (q.type === 'radio' || q.type === 'scale') {
        if (!formData[q.name]) {
          newErrors[q.name] = lang.err_select;
          hasError = true;
        }
      } else if (q.type === 'checkbox') {
        if (!formData[q.name] || formData[q.name].length === 0) {
          newErrors[q.name] = lang.err_select_one;
          hasError = true;
        }
      }
    });
    if (hasError) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setCurrentStep(n);
  };

  const updateLanguage = () => {
    const langCode = isArabic ? 'ar' : 'en';
    setSteps(getTranslatedSteps(langCode));
  };

  const toggleLanguage = () => {
    setIsArabic(!isArabic);
  };

  useEffect(() => {
    updateLanguage();
  }, [isArabic]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Construct Form Data matching Google Sheets expectation
    const data = new URLSearchParams();
    // Flatten platform
    const platforms = [...formData.platform];
    // Replace 'other' with text if exists
    const otherIndex = platforms.indexOf("other");
    if (otherIndex > -1) {
      platforms[otherIndex] = `Other: ${formData.otherPlatform}`;
    }

    Object.keys(formData).forEach((key) => {
      if (key === "platform") {
        data.append("platform", platforms.join(", "));
      } else if (key === "otherPlatform") {
        // Ignore
      } else {
        data.append(key, formData[key]);
      }
    });

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: data,
      });
      setShowModal(true);
    } catch (error) {
      alert(lang.alert_error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    document.body.classList.toggle('light-mode', theme === 'light');
    document.body.classList.toggle('rtl', isArabic);
    document.documentElement.classList.toggle('rtl', isArabic);
    document.dir = isArabic ? 'rtl' : 'ltr';
  }, [theme, isArabic]);

  const checkSectionCompletion = () => {
    const currentSection = steps[currentStep];
    const questionBlocks = currentSection.questions;
    let allValid = true;

    questionBlocks.forEach(q => {
      if (q.type === 'text') {
        if (!formData[q.name] || formData[q.name].trim() === '') {
          allValid = false;
        }
      } else if (q.type === 'radio' || q.type === 'scale') {
        if (!formData[q.name]) {
          allValid = false;
        }
      } else if (q.type === 'checkbox') {
        if (!formData[q.name] || formData[q.name].length === 0) {
          allValid = false;
        }
      }
    });

    // Special Check for Platform Other
    if (currentStep === 1) { // Section 2 is index 1
      if (formData.platform.includes('other')) {
        if (formData.otherPlatform.trim() === '') {
          allValid = false;
        }
      }
    }

    // Age Check
    if (currentStep === 0 && allValid) {
      const ageVal = parseArabicNum(formData.p_age);
      if (isNaN(ageVal) || ageVal < 18 || ageVal > 24) {
        allValid = false;
      }
    }

    return allValid;
  };

  useEffect(() => {
    const val = parseArabicNum(formData.p_age);
    const newErrors = { ...errors };
    if (formData.p_age === '') {
      delete newErrors.p_age;
    } else if (isNaN(val) || val < 18) {
      newErrors.p_age = lang.err_min_18;
    } else if (val > 24) {
      newErrors.p_age = lang.err_max_24;
    } else {
      delete newErrors.p_age;
    }
    setErrors(newErrors);
  }, [formData.p_age, lang]);

  useEffect(() => {
    setIsNextEnabled(checkSectionCompletion());
  }, [formData, currentStep]);

  useEffect(() => {
    if (formData.gender === 'female') {
      document.documentElement.style.setProperty('--neon-cyan', '#ff00ff');
    } else {
      document.documentElement.style.setProperty('--neon-cyan', '#00ffff');
    }
  }, [formData.gender]);

  const progress = ((currentStep + 1) / steps.length) * 100;




  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <Header title={lang.title} subtitle={lang.subtitle} />
          <ProgressBar progress={progress} />
          <div className="view-toggle-wrapper">
            <div className="switch-group">
              <span id="themeLabel">{theme.toUpperCase()} MODE</span>
              <label className="switch">
                <input type="checkbox" checked={theme === 'dark'} onChange={toggleTheme} id="themeToggle" />
                <span className="slider"></span>
              </label>
            </div>
            <button id="langBtn" type="button" className="lang-btn" onClick={toggleLanguage}>
              {lang.lang_label}
            </button>
          </div>
          <form id="surveyForm" onSubmit={handleSubmit}>
            {steps.map((step, index) => (
              <FormSection key={index} stepData={step} isActive={index === currentStep} formData={formData} onChange={handleInputChange} errors={errors} lang={lang} />
            ))}
            <div className="nav-buttons">
              <button type="button" className="secondary" id="prevBtn" onClick={() => changeStep(currentStep - 1)} disabled={currentStep === 0}>
                <i className="fa-solid fa-chevron-left"></i> {lang.btn_prev}
              </button>
              <button type="button" id="nextBtn" onClick={() => changeStep(currentStep + 1)} disabled={currentStep === steps.length - 1 || !isNextEnabled}>
                {lang.btn_next} <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
            <div className="submit-btn-wrapper" id="submitWrapper" style={{ display: currentStep === steps.length - 1 ? 'block' : 'none' }}>
              <button type="submit" className="submit-btn" disabled={isSubmitting || !isNextEnabled}>
                <i className="fa-solid fa-upload"></i> {isSubmitting ? 'SUBMITTING...' : lang.btn_upload}
              </button>
            </div>
          </form>
          <SuccessModal show={showModal} lang={isArabic ? 'ar' : 'en'} />
        </div>
      </div>
    </div>
  )
}

export default App
