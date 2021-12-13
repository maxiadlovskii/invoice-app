import React, { useContext, useMemo } from 'react';
import cn from 'classnames';

import { Context } from '../../context';
import { INVOICE_MODEL } from '../../constants';
import { EditableField } from '../EditableField';

import styles from './InvoiceBody.module.css';

const { LINE_ITEMS, PRICE, DESCRIPTION } = INVOICE_MODEL;
export const InvoiceBody = () => {
  const { state } = useContext(Context);
  const lineItems = useMemo(() => state[LINE_ITEMS], [state]);
  const totalPrice = useMemo(() => lineItems.reduce((res, item) => (res + Number(item[PRICE])), 0), [ lineItems ]);
  const vat = useMemo(() => Math.round((totalPrice * 0.19) * 100) / 100, [ totalPrice, lineItems ]);

  return (
    <>
      <tr className={styles.heading}>
        <td>Item</td>

        <td>Price</td>
      </tr>
      {
        state[LINE_ITEMS].map(({ [DESCRIPTION]: description, [PRICE]: price }, i) => (
          <tr className={cn(styles.item)} key={i}>
            <td>
              <EditableField
                defaultValue={description}
                name={`${LINE_ITEMS}.${i}.${DESCRIPTION}`}
                text={description}
                inputProps={{ type: 'textarea' }}
              />
            </td>
            <td className={styles.nowrap}>
              <EditableField
                defaultValue={price}
                name={`${LINE_ITEMS}.${i}.${PRICE}`}
                text={Number(price).toFixed(2)}
                inputProps={{ type: 'number' }}
              />
              {' '}
              EUR
            </td>
          </tr>
        ))
      }
      <tr className={styles.total}>
        <td />
        <td className={styles.nowrap}>
          {`Total: ${totalPrice.toFixed(2)} EUR`}
        </td>
      </tr>
      <tr className={styles.vat}>
        <td />
        <td className={styles.nowrap}>
          {`VAT (19%): ${vat.toFixed(2)} EUR`}
        </td>
      </tr>
    </>
  );
};
