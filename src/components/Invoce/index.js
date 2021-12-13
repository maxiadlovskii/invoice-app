import React, { useState, useCallback } from 'react';
import set from 'lodash/set';
import cloneDeep from 'lodash/cloneDeep';
import { useDropzone } from 'react-dropzone';
import cn from 'classnames';

import { Provider } from '../../context';
import { InvoiceHeader } from '../InvoiceHeader';
import { InvoiceBody } from '../InvoiceBody';

import styles from './Invoive.module.css';

const inv = {
  'id': 'd471c483-f15f-490b-adb3-7c5821b6d955',
  'lineItems': [
    { 'description': 'Waistcoat schlitz cronut wolf.', 'price': 21.23 },
    {
      'description': 'Generating the bus won\'t do anything, we need to compress the cross-platform JSON card!',
      'price': 10.71
    }
  ],
  'email': 'austinhackett@durgan.org',
  'fullName': 'Delaney Howell',
  'company': 'Kassulke Group',
  'createdAt': '2021-10-11',
  'dueAt': '2021-11-01'
};

export const Invoice = () => {
  const [state, setState] = useState(inv);
  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        const newData = JSON.parse(binaryStr);
        setState(newData);
      };
      reader.readAsText(file);
    });

  }, [ setState ]);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: 'application/json' });

  const handleFieldOnChange = useCallback(({ value, name }) => {
    setState(curState => set(cloneDeep(curState), name, value));
  }, [ setState ]);

  return (
    <Provider value={{ state, handleFieldOnChange }}>
      <div {...getRootProps({ onClick: e => { e.stopPropagation(); } })} className={cn(styles.dragZone)}>
        <div className={styles.invoiceBox}>
          <table className={styles.table} cellPadding="0" cellSpacing="0">
            <tbody>
              <InvoiceHeader />
              <InvoiceBody />
            </tbody>
          </table>
          <div>
            <input {...getInputProps()} id="input" name="input" />
            <label className={styles.addButton} htmlFor="input">Click or Drug</label>
          </div>
        </div>
        {isDragActive && <div className={styles.dragActive}><p>Drop the files here ...</p></div>}
      </div>
    </Provider>
  );
};
