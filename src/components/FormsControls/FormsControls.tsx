import React from 'react';
import styles from './FormsControls.module.css'
import { Field } from 'redux-form';
import { FieldValidatorType } from '../../utils/validators';

type FormControlPropsType = {
    input: {}
    meta: {
        touched: boolean
        error: string
    }
    typeField: string
}

export const FormControl: React.FC<FormControlPropsType> = ({ input, meta: { touched, error }, typeField, ...props }) => {
    const hasError = error && touched;
    return (
        <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
            <div>
                {React.createElement(typeField, { ...input, ...props })}
            </div>
            <span>{hasError && error}</span>
        </div >
    )
}

export function createField<FormKeysType extends string>(type: string | null, name: FormKeysType, placeholder: string,
    validators: Array<FieldValidatorType> | null, typeField: string, text: string | null) {
    return <div>
        <Field type={type} name={name}
            placeholder={placeholder} component={FormControl} validators={validators}
            typeField={typeField} />
        {text}
    </div>
}




