import React, { useState, useCallback, useContext } from 'react';
import debounce from 'lodash/debounce';

import { Context } from '../../context';


export const EditableField = ({ name, defaultValue, text, inputProps = {} }) => {
  const { handleFieldOnChange } = useContext(Context);
  const [isEditing, setIsEditing] = useState(false);
  const [ value, setValue ] = useState(defaultValue);
  const handleOnCLick = useCallback(() => {
    setIsEditing(true);
  }, [ setIsEditing ]);
  const handleOnBlur = useCallback(() => {
    setIsEditing(false);
    handleFieldOnChange({ value, name });
  }, [setIsEditing, value, handleFieldOnChange, name]);
  const handleOnChange = useCallback(({ target: { value: inputValue } }) => {
    setValue(inputValue);
  }, [ setValue ]);

  return isEditing
    ? (
      <input
        defaultValue={defaultValue}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        {...inputProps}
      />
    )
    : <span id={name} onClick={handleOnCLick} onKeyDown={handleOnCLick} tabIndex="0" role="button">{text}</span>;
};
