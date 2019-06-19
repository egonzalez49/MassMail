import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { submitSurvey } from '../../actions';
import FIELDS from './formFields';
import { withRouter } from 'react-router-dom';

const SurveyFormReview = props => {
  const reviewFields = _.map(FIELDS, field => {
    return (
      <div key={field.name}>
        <label>{field.label}</label>
        <div>
          <input disabled value={props.formValues[field.name]} />
        </div>
      </div>
    );
  });

  return (
    <div>
      <h5>Please confirm the fields.</h5>
      {reviewFields}
      <button
        className="yellow darken-3 white-text btn-flat"
        onClick={props.onCancel}
      >
        Cancel
      </button>
      <button
        onClick={() => props.submitSurvey(props.formValues, props.history)}
        className="blue btn-flat right white-text"
      >
        Send Survey<i className="material-icons right">email</i>
      </button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    formValues: state.form.surveyForm.values
  };
};

export default connect(
  mapStateToProps,
  { submitSurvey }
)(withRouter(SurveyFormReview));
