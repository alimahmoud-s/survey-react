import { translations } from "./locales";

export const getTranslatedSteps = (lang) => {
  const t = translations[lang];
  return [
    {
      title: t.sec1_title,
      questions: [
        {
          type: "text",
          label: t.q_name,
          name: "p_name",
          placeholder: "Enter your name",
        },
        {
          type: "text",
          label: t.q_age,
          name: "p_age",
          placeholder: "e.g. 21",
        },
        {
          type: "radio",
          label: t.q_gender,
          name: "gender",
          options: [
            { value: "male", label: t.opt_male, icon: "fa-solid fa-mars" },
            { value: "female", label: t.opt_female, icon: "fa-solid fa-venus" },
            {
              value: "prefer_not",
              label: t.opt_prefer,
              icon: "fa-solid fa-user-secret",
            },
          ],
        },
        {
          type: "radio",
          label: t.q_college,
          name: "college",
          options: [
            { value: "Commerce", label: t.col_comm, icon: "fa-solid fa-coins" },
            {
              value: "Law",
              label: t.col_law,
              icon: "fa-solid fa-scale-balanced",
            },
            { value: "Arts", label: t.col_arts, icon: "fa-solid fa-palette" },
            {
              value: "Engineering",
              label: t.col_eng,
              icon: "fa-solid fa-gears",
            },
            {
              value: "Computer Science",
              label: t.col_cs,
              icon: "fa-solid fa-laptop-code",
            },
            {
              value: "Medicine",
              label: t.col_med,
              icon: "fa-solid fa-user-doctor",
            },
            {
              value: "Pharmacy",
              label: t.col_pharm,
              icon: "fa-solid fa-prescription-bottle-medical",
            },
            {
              value: "Dentistry",
              label: t.col_dent,
              icon: "fa-solid fa-tooth",
            },
          ],
        },
        {
          type: "radio",
          label: t.q_year,
          name: "year",
          options: [
            { value: "1", label: t.year_1 },
            { value: "2", label: t.year_2 },
            { value: "3", label: t.year_3 },
            { value: "4", label: t.year_4 },
            { value: "other", label: t.year_other },
          ],
        },
      ],
    },
    {
      title: t.sec2_title,
      description: t.sec2_def,
      questions: [
        {
          type: "text",
          label: t.q_mins,
          name: "mins",
          placeholder: t.ph_mins,
        },
        {
          type: "checkbox",
          label: t.q_platforms,
          name: "platform",
          options: [
            { value: "tiktok", label: "TikTok", icon: "fa-brands fa-tiktok" },
            {
              value: "reels",
              label: "Instagram",
              icon: "fa-brands fa-instagram",
            },
            { value: "shorts", label: "YouTube", icon: "fa-brands fa-youtube" },
            {
              value: "other",
              label: t.opt_other,
              icon: "fa-solid fa-circle-question",
            },
            { value: "none", label: t.opt_none, icon: "fa-solid fa-ban" },
          ],
        },
        {
          type: "radio",
          label: t.q_sessions,
          name: "sessions",
          options: [
            { value: "1-2", label: t.sess_1 },
            { value: "3-5", label: t.sess_2 },
            { value: "6-10", label: t.sess_3 },
            { value: "10+", label: t.sess_4 },
          ],
        },
      ],
    },
    {
      title: t.sec3_title,
      description: t.scale_freq,
      questions: [
        {
          type: "scale",
          label: t.q8,
          name: "q8",
          options: [
            { value: "1", label: t.s_never },
            { value: "2", label: t.s_rarely },
            { value: "3", label: t.s_sometimes },
            { value: "4", label: t.s_often },
            { value: "5", label: t.s_very },
          ],
        },
        {
          type: "scale",
          label: t.q9,
          name: "q9",
          options: [
            { value: "1", label: t.s_never },
            { value: "2", label: t.s_rarely },
            { value: "3", label: t.s_sometimes },
            { value: "4", label: t.s_often },
            { value: "5", label: t.s_very },
          ],
        },
        {
          type: "scale",
          label: t.q10,
          name: "q10",
          options: [
            { value: "1", label: t.s_never },
            { value: "2", label: t.s_rarely },
            { value: "3", label: t.s_sometimes },
            { value: "4", label: t.s_often },
            { value: "5", label: t.s_very },
          ],
        },
        {
          type: "scale",
          label: t.q11,
          name: "q11",
          options: [
            { value: "1", label: t.s_never },
            { value: "2", label: t.s_rarely },
            { value: "3", label: t.s_sometimes },
            { value: "4", label: t.s_often },
            { value: "5", label: t.s_very },
          ],
        },
        {
          type: "scale",
          label: t.q12,
          name: "q12",
          options: [
            { value: "1", label: t.s_never },
            { value: "2", label: t.s_rarely },
            { value: "3", label: t.s_sometimes },
            { value: "4", label: t.s_often },
            { value: "5", label: t.s_very },
          ],
        },
      ],
    },
    {
      title: t.sec4_title,
      description: t.scale_agree,
      questions: [
        {
          type: "scale",
          label: t.q13,
          name: "q13",
          options: [
            { value: "1", label: t.s_sd },
            { value: "2", label: t.s_d },
            { value: "3", label: t.s_n },
            { value: "4", label: t.s_a },
            { value: "5", label: t.s_sa },
          ],
        },
        {
          type: "scale",
          label: t.q14,
          name: "q14",
          options: [
            { value: "1", label: t.s_sd },
            { value: "2", label: t.s_d },
            { value: "3", label: t.s_n },
            { value: "4", label: t.s_a },
            { value: "5", label: t.s_sa },
          ],
        },
        {
          type: "scale",
          label: t.q15,
          name: "q15",
          options: [
            { value: "1", label: t.s_sd },
            { value: "2", label: t.s_d },
            { value: "3", label: t.s_n },
            { value: "4", label: t.s_a },
            { value: "5", label: t.s_sa },
          ],
        },
      ],
    },
    {
      title: t.sec5_title,
      questions: [
        {
          type: "text",
          label: t.q16,
          description: t.crt_q,
          name: "crt",
          placeholder: t.ph_ans,
        },
      ],
    },
  ];
};
