import React from 'react';

//grabs input from props given by redux-form (onChange, onBlur, etc)
//meta contains any error messages from validate()
const SurveyField = ({ input, label, meta }) => {
  return (
    <div>
      <label>{label}</label>
      <input {...input} />
      <div className="red-text" style={{ marginBottom: '20px' }}>
        {meta.touched && meta.error ? meta.error : null}
      </div>
    </div>
  );
};

export default SurveyField;
