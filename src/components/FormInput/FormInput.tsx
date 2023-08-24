import { useCallback, useMemo } from 'react';
import { FieldError, FieldValues, Path, useFormContext, UseFormTrigger } from 'react-hook-form';

import InputField from '../InputField/InputField';
import styles from './FormInput.module.scss';
import { FormInputProps } from './type';

const FormInput = <T extends FieldValues>({
  type = 'text',
  regex,
  valuePayload,
  requiredMessage,
  validateErrorMessage,
  validateSuccessMessage,
  label,
  placeholder,
  validate = (value: string) => {
    if (regex !== undefined) return regex.test(value);
    return false;
  },
  children,
}: FormInputProps<T>) => {
  const {
    register,
    formState: { errors },
    trigger,
    getValues,
  } = useFormContext<T>();

  const inputValidate = useCallback(validate, []);

  const inputFieldValue = useMemo(() => getValues(valuePayload), [getValues(valuePayload)]);

  const validateRule = useMemo(
    () => ({
      validate: (value: string) => {
        if (isRequired(value)) return true;
        if (inputValidate(value)) return true;
        return validateErrorMessage;
      },
    }),
    []
  );

  const isValidSuccess = useMemo(
    () =>
      errors[valuePayload] === undefined &&
      validateSuccessMessage !== '' &&
      inputValidate(inputFieldValue),
    [errors[valuePayload], validateSuccessMessage]
  );

  const rules = useMemo(() => {
    const defaultRule = {
      validate: validateRule,
      onBlur: () => handleBlurInputField(trigger, valuePayload),
    };
    return requiredMessage === undefined
      ? defaultRule
      : { ...defaultRule, required: requiredMessage };
  }, []);

  const isRequired = useCallback(
    (value: string) => value === '' && requiredMessage === undefined,
    []
  );

  const handleBlurInputField = useCallback((triggerMethod: UseFormTrigger<T>, name: Path<T>) => {
    triggerMethod(name);
  }, []);

  return (
    <div className={styles.formItemContainer}>
      <p className={styles.formLabel}>{label}</p>
      <div className={styles.inputWithButtonContainer}>
        <InputField
          type={type}
          name={valuePayload}
          placeholder={placeholder}
          register={register}
          rules={rules}
        />
        {children}
      </div>
      {errors && errors[valuePayload] && (
        <p className={styles.formErrorLabel}>{(errors[valuePayload] as FieldError).message}</p>
      )}
      {isValidSuccess && <p className={styles.formSuccessLabel}>{validateSuccessMessage}</p>}
    </div>
  );
};

export default FormInput;
