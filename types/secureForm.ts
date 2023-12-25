namespace payU {
  export interface PayuEntry {
    (posId: string, options?: PayuOptions): PayU;
  }

  export interface PayuOptions {
    dev?: boolean | undefined;
  }

  export type tokenType = "SINGLE" | "SINGLE_LONGTERM" | "MULTI";
  export interface PayU {
    secureForms(options?: SecureFormsOptions): SecureForms;
    tokenize(
      type?: tokenType
    ): Promise<TokenizeResultSuccess | TokenizeResultError>;
    sendCvv(
      refReqId: string
    ): Promise<SendCvvResultSuccess | SendCvvResultError>;
    extractRefReqId(input: string): string;
  }

  export interface SecureFormsOptions {
    fonts?: FontOptions[] | undefined;
  }

  type fontWeightNumber = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

  export interface FontOptions {
    family: string;
    src: string;
    display?: "auto" | "block" | "swap" | "fallback" | "optional" | undefined;
    style?: "normal" | "italic" | "oblique" | undefined;
    weight?: "normal" | "bold" | fontWeightNumber | undefined;
    unicodeRange?: string | undefined;
  }

  export type secureFormType = "card" | "number" | "date" | "cvv";
  export interface SecureForms {
    add(type?: secureFormType, options?: SecureFormOptions): SecureForm;
  }

  export interface SecureFormOptions {
    style?: StyleOptions | undefined;
    placeholder?: PlaceHolderOptions | undefined;
    lang?: "pl" | "en" | "cs" | "sk" | undefined;
    disabled?: boolean | undefined;
    cardIcon?: boolean | undefined;
  }

  export type fontWeight =
    | "normal"
    | "bold"
    | "lighter"
    | "bolder"
    | "inherit"
    | "initial"
    | "unset"
    | fontWeightNumber;
  export interface StyleOptions {
    basic?:
      | {
          fontColor?: string | undefined;
          fontSize?: string | undefined;
          fontFamily?: string | undefined;
          fontWeight?: fontWeight | undefined;
          letterSpacing?: string | undefined;
        }
      | undefined;
    invalid?:
      | {
          fontColor?: string | undefined;
          fontWeight?: fontWeight | undefined;
        }
      | undefined;
    focus?:
      | {
          fontColor?: string | undefined;
          fontWeight?: fontWeight | undefined;
        }
      | undefined;
    placeholder?:
      | {
          fontColor?: string | undefined;
          fontWeight?: fontWeight | undefined;
        }
      | undefined;
    disabled?:
      | {
          fontColor?: string | undefined;
          fontWeight?: fontWeight | undefined;
        }
      | undefined;
  }

  export interface PlaceHolderOptions {
    number?: string | undefined;
    date?: string | undefined;
    cvv?: string | undefined;
  }

  export type eventTypes = "ready" | "focus" | "blur";
  export interface SecureForm {
    render(selector: string): SecureForm;
    update(options: SecureFormOptions): SecureForm;
    on(event: eventTypes, handler: () => void): SecureForm;
    on(
      event: "change",
      handler: (body: SecureFormChangeResponse) => void
    ): SecureForm;
    clear(): SecureForm;
    focus(): SecureForm;
    remove(): SecureForm;
  }

  export type SecureFormErrorCode =
    | "error.validation.card.empty"
    | "error.validation.card.length"
    | "error.validation.card.number"
    | "error.validation.card.unsupported"
    | "error.validation.expDate.empty"
    | "error.validation.expDate.past"
    | "error.validation.expDate.value"
    | "error.validation.cvv.empty"
    | "error.validation.cvv.value"
    | "error.tokenization"
    | "error.send.cvv"
    | "error.network";

  export interface SecureFormErrorMessage {
    type: "validation" | "technical";
    code: SecureFormErrorCode;
    message: string;
    parameters?:
      | {
          error: string;
        }
      | undefined;
    source?: secureFormType | undefined;
  }

  export interface SecureFormChangeResponse {
    empty: boolean;
    error: false | SecureFormErrorMessage[];
    brand?: "visa" | "mastercard" | "maestro" | undefined;
    length?: number | undefined;
  }

  export interface TokenizeResultSuccess {
    status: "SUCCESS";
    body: {
      token: string;
      mask: string;
    };
  }

  export interface TokenizeResultError {
    status: "ERROR";
    error: {
      messages: SecureFormErrorMessage[];
    };
    correlationId?: string | undefined;
  }

  export interface SendCvvResultSuccess {
    status: "SUCCESS";
  }

  export interface SendCvvResultError {
    status: "ERROR";
    error: {
      messages: SecureFormErrorMessage[];
    };
    correlationId?: string | undefined;
  }
}

export default payU;
