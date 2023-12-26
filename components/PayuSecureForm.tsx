"use client";

import { useState } from "react";
import Script from "next/script";

const optionsForms = {
  cardIcon: true,
  style: {
    basic: {
      fontSize: "14px",
    },
  },
  placeholder: {
    number: "",
    date: "MM/YY",
    cvv: "",
  },
  lang: "pl" as const,
};

const payUFields = {
  NUMBER: "payu-card-number",
  DATE: "payu-card-date",
  CVV: "payu-card-cvv",
}

const { NUMBER, DATE, CVV } = payUFields;
const defaultPosId = "393823";

const panelStyle = `
  p-8 bg-white rounded shadow
`;

const inputStyle = `
  w-[12rem]
  m-1 p-1 rounded border
`;

const inputWrapperStyle = `
  w-[20rem]
  flex items-center justify-between
`;

const buttonStyle = `
  border rounded shadow p-2 mt-4
`;

const shadowLabelStyle = `
  text-xs text-gray-500 mb-2
`;

export const PayuSecureForm = () => {
  const [busy, setBusy] = useState(false);
  const [posId, setPosId] = useState(defaultPosId);
  const [renderedPosId, setRednderedPosId] = useState(defaultPosId);
  const [response, setResponse] = useState<
  payu.TokenizeResultSuccess | payu.TokenizeResultError | undefined
  >();
  const [payuSdkForms, setPayuSdkForms] = useState<payu.PayU>();
  const [secureForm, setSecureForm] = useState<{
    [key: string]: payu.SecureForm;
  }>();

  const tokenize = () => {
    setResponse(undefined);
    if (!payuSdkForms) return;

    try {
      //tokenizacja karty (komunikacja z serwerem PayU)
      payuSdkForms
        .tokenize("SINGLE")
        .then(function (
          result: payu.TokenizeResultSuccess | payu.TokenizeResultError
        ) {
          setResponse(result);
        });
    } catch (e) {
      console.log(e); // błędy techniczne
    }
  };

  const renderForm = (initialPosId?: string) => {
    const payuSdkForms = PayU(initialPosId || posId);
    setPayuSdkForms(payuSdkForms);
    setRednderedPosId(initialPosId || posId);
    const secureForms = payuSdkForms.secureForms();

    //utworzenie formularzy podając ich typ oraz opcje
    const cardNumber = secureForms.add("number", optionsForms);
    const cardDate = secureForms.add("date", optionsForms);
    const cardCvv = secureForms.add("cvv", optionsForms);

    cardNumber.render(`#${NUMBER}`);
    cardDate.render(`#${DATE}`);
    cardCvv.render(`#${CVV}`);

    setSecureForm({
      cardNumber: cardNumber,
      cardDate: cardDate,
      cardCvv: cardCvv,
    });
  };

  const removeForm = () => {
    if (!secureForm) return;
    const { cardNumber, cardDate, cardCvv } = secureForm;

    cardNumber.remove();
    cardDate.remove();
    cardCvv.remove();
  };

  const reRenderForm = () => {
    if (busy) return;
    setBusy(true);
    removeForm();
    renderForm();
    setTimeout(() => setBusy(false), 2000);
  };

  return (
    <>
      <Script
        type="text/javascript"
        src="https://secure.payu.com/javascript/sdk"
        onLoad={() => renderForm()}
      />
      <div className="flex flex-wrap gap-4">
        <div className={`${panelStyle} max-w-[24rem]`}>
          <div className={inputWrapperStyle}>
            <label htmlFor="posId" className="mr-4">
              posId
            </label>
            <input
              className={inputStyle}
              type="text"
              id="posId"
              onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                setPosId(e.target.value)
              }
              defaultValue={posId}
            ></input>
          </div>
          <button
            onClick={reRenderForm}
            className={`${buttonStyle} ${
              busy ? "pointer-events-none text-gray-400" : ""
            }`}
          >
            Renderuj
          </button>
        </div>

        <div className={`${panelStyle} max-w-[24rem]`}>
          <p className={shadowLabelStyle}>
            Redered posId: {renderedPosId}
          </p>

          <div className={inputWrapperStyle}>
            <label htmlFor={NUMBER} className="mr-4">
              Card Number
            </label>
            <div className={inputStyle} id={NUMBER}></div>
          </div>

          <div className={inputWrapperStyle}>
            <label htmlFor={DATE} className="mr-4">
              Valid Thru
            </label>
            <div className={inputStyle} id={DATE}></div>
          </div>

          <div className={inputWrapperStyle}>
            <label htmlFor={CVV} className="mr-4">
              CVV
            </label>
            <div className={inputStyle} id={CVV}></div>
          </div>

          <button
            className={`${buttonStyle} ${
              busy ? "pointer-events-none text-gray-400" : ""
            }`}
            onClick={tokenize}
          >
            Tokenize
          </button>
        </div>

        <div className={`${panelStyle} w-full min-w-[24rem]`}>
          <p className={shadowLabelStyle}>Last response:</p>
          <div className="break-words">{JSON.stringify(response)}</div>
        </div>
      </div>
    </>
  );
};
