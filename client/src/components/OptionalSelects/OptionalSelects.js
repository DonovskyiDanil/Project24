import React from 'react';
import CONSTANTS from '../../constants';
import SelectInput from '../SelectInput/SelectInput';
import FormInput from '../FormInput/FormInput';
import styles from '../ContestForm/ContestForm.module.sass';
import Spinner from '../Spinner/Spinner';

const OptionalSelects = (props) => {
  if (props.isFetching) {
    return <Spinner />;
  }
  
  switch (props.contestType) {
    case CONSTANTS.NAME_CONTEST: {
      return (
        <>
          <SelectInput
            name="typeOfName"
            header="Type of Company"
            classes={{
              inputContainer: styles.selectInputContainer,
              inputHeader: styles.selectHeader,
              selectInput: styles.select,
              warning: styles.warning,
            }}
            optionsArray={props.dataForContest.data.typeOfName}
          />
          <SelectInput
            name="styleName"
            header="Style Name"
            classes={{
              inputContainer: styles.selectInputContainer,
              inputHeader: styles.selectHeader,
              selectInput: styles.select,
              warning: styles.warning,
            }}
            optionsArray={props.dataForContest.data.nameStyle}
          />
        </>
      );
    }
    case CONSTANTS.LOGO_CONTEST: {
      return (
        <>
          <div className={styles.inputContainer}>
            <span className={styles.inputHeader}>
              What name of your venture?
            </span>
            <FormInput
              name="nameVenture"
              type="text"
              label="Name of Venture"
              classes={{
                container: styles.componentInputContainer,
                input: styles.input,
                warning: styles.warning,
              }}
            />
          </div>
          <SelectInput
            name="brandStyle"
            header="Brand Style"
            classes={{
              inputContainer: styles.selectInputContainer,
              inputHeader: styles.selectHeader,
              selectInput: styles.select,
              warning: styles.warning,
            }}
            optionsArray={props.dataForContest.data.brandStyle}
          />
        </>
      );
    }
    case CONSTANTS.TAGLINE_CONTEST: {
      return (
        <>
          <div className={styles.inputContainer}>
            <span className={styles.inputHeader}>
              What name of your venture?
            </span>
            <FormInput
              name="nameVenture"
              type="text"
              label="Name of Venture"
              classes={{
                container: styles.componentInputContainer,
                input: styles.input,
                warning: styles.warning,
              }}
            />
          </div>
          <SelectInput
            name="typeOfTagline"
            header="Type Tagline"
            classes={{
              inputContainer: styles.selectInputContainer,
              inputHeader: styles.selectHeader,
              selectInput: styles.select,
              warning: styles.warning,
            }}
            optionsArray={props.dataForContest.data.typeOfTagline}
          />
        </>
      );
    }
    default: {
      return <div>Invalid contest type</div>;
    }
  }
};

export default OptionalSelects;
