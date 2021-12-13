import React, { useContext } from 'react';
import cn from 'classnames';
import moment from 'moment';

import { EditableField } from '../EditableField';
import { INVOICE_MODEL } from '../../constants';
import { Context } from '../../context';

import styles from './InvoiceHeader.module.css';

const { ID, COMPANY, CREATED_AT, DUE_AT, FULL_NAME, EMAIL } = INVOICE_MODEL;

export const InvoiceHeader = () => {
  const { state } = useContext(Context);

  return (
    <>
      <tr>
        <td colSpan="2">
          <table className={styles.table}>
            <tbody>
              <tr>
                <td className={styles.title}>
                  <img
                    src="cai_logo.svg"
                      // style={logoStyle}
                    alt="logo"
                    className={styles.img}
                  />
                </td>

                <td>
                  <span>Invoice #: </span>
                  <EditableField
                    defaultValue={state[ID]}
                    text={state[ID]}
                    name={ID}
                    inputProps={{
                        type: 'text'
                    }}
                  />
                  {' '}
                  <br />
                  Created:
                  {' '}
                  <EditableField
                    defaultValue={state[CREATED_AT]}
                    text={moment(state[CREATED_AT]).format('DD/MM/YYYY')}
                    name={CREATED_AT}
                    inputProps={{
                        type: 'date'
                    }}
                  />
                  {' '}
                  <br />
                  Due:
                  {' '}
                  <EditableField
                    defaultValue={state[DUE_AT]}
                    text={moment(state[DUE_AT]).format('DD/MM/YYYY')}
                    name={DUE_AT}
                    inputProps={{
                      type: 'date'
                    }}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>

      <tr>
        <td colSpan="2">
          <table className={cn(styles.table, styles.informationTable)}>
            <tbody>
              <tr>
                <td>
                  collectAI GmbH.
                  <br />
                  20457 Hamburg
                  <br />
                  Hamburg, Germany
                </td>

                <td>
                  <EditableField
                    defaultValue={state[COMPANY]}
                    text={state[COMPANY]}
                    name={COMPANY}
                    inputProps={{
                        type: 'text'
                    }}
                  />
                  <br />
                  <EditableField
                    defaultValue={state[FULL_NAME]}
                    text={state[FULL_NAME]}
                    name={FULL_NAME}
                    inputProps={{
                        type: 'text'
                    }}
                  />
                  {' '}
                  <br />
                  <EditableField
                    defaultValue={state[EMAIL]}
                    text={state[EMAIL]}
                    name={EMAIL}
                    inputProps={{
                        type: 'email'
                    }}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </>
  );
};
