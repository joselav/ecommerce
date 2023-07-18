import React, { useState, useEffect } from 'react';
import { TextField, Alert } from '@mui/material';

//FIREBASE:
import { db } from '../../firebase/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

import MessageOk from '../../components/MessageOk/MessageOk';
import './CheckoutPage.css'



const CheckoutPage = () => {
  const [values, setValues] = useState({
    name:'',
    lastName:'',
    email:'',
    repEmail:'',
  });

  const [clientID, setClientID] = useState(null);

  const [isFormValid, setIsFormValid] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const { name, lastName, email, repEmail } = values;
  const isEmailMatching = email === repEmail && email !== '';
  const isRepEmailFilled = repEmail !== '';

  const onSubmit = async (e) => {
    e.preventDefault();
    
    const docRef = await addDoc(collection(db, "compras"), {
        values,
    });
    setClientID(docRef.id);
    setValues("");
  };

  useEffect(() => {
    setIsFormValid(name && lastName && email && isEmailMatching);
  }, [name, lastName, email, isEmailMatching]);

  const buttonClassName = isFormValid ? 'btncheckout' : 'hover-disabled';

  return (
    <div className='checkoutbox'>
      <form className='checkoutbox' onSubmit={onSubmit}>
        <TextField className='inputbox'
          id="name"
          variant="outlined"
          label="Nombre"
          name='name'
          value={name|| ''}
          onChange={handleInputChange}
        />
        <TextField className='inputbox'
          id="lastName"
          variant="outlined"
          label="Apellido"
          name='lastName'
          value={lastName|| ''}
          onChange={handleInputChange}
        />
        <TextField className='inputbox'
          id="email"
          variant="outlined"
          label="Email"
          name='email'
          value={email|| ''}
          onChange={handleInputChange}
        />
        <TextField className='inputbox'
          id="repEmail"
          variant="outlined"
          label="Repita su Email"
          name='repEmail'
          value={repEmail || ''}
          onChange={handleInputChange}
          error={!isEmailMatching && isRepEmailFilled}
        />
        <button className={buttonClassName} type='submit' disabled={!isFormValid}>Finalizar pedido</button>
      </form>
      {isRepEmailFilled && !isEmailMatching && (
        <Alert severity="error">Los emails introducidos no coinciden.</Alert>
      )}
      {clientID ? <MessageOk clientID={clientID}/> : null}
    </div>
  );
};

export default CheckoutPage;

