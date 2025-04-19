/* -------------------------------------------------------------------------- */
/*                             External Dependency                            */
/* -------------------------------------------------------------------------- */

import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import CryptoJS from "crypto-js"; // Import crypto-js again
// import { createHmac } from "crypto"; // Remove Node's crypto import
import { v4 } from "uuid";

/* -------------------------------------------------------------------------- */
/*                             Internal Dependency                            */
/* -------------------------------------------------------------------------- */
import { IGetRequestSignatureParam, IGetRequestSignature, ITheme } from "../../types";

function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// Define TENDER_URLS only once (remove export here)
const TENDER_URLS = {
  test: "http://localhost:9090",
  // test: "https://stagapi.tender.cash",
  live: "https://secureapi.tender.cash",
}

const URL_PATHS = {
  CHAINS: "/system/chains",
  COINS: "/system/coins",
  PAYMENT_INITIATE: "/payment/initiate",
  PAYMENT_VALIDATE: "/payment/validate",
}

// Define getRequestSignature only once (remove export here)
const getRequestSignature = ({ accessId, accessSecret }: IGetRequestSignatureParam): IGetRequestSignature => {
  const requestId = v4();
  const timeStamp = new Date().getTime().toString();

  const payload = {
      "timeStamp": String(timeStamp),
      "requestId": requestId,
      "accessId": accessId,
  };
  const dataStr = JSON.stringify(payload);

  // Revert to crypto-js HMAC calculation and Base64 encoding
  const hmac = CryptoJS.HmacSHA256(dataStr, accessSecret);
  const signature = CryptoJS.enc.Base64.stringify(hmac);

  return { signature, timeStamp, requestId };
};

// Keep applyTheme, sleep, sentenceCase as internal functions
const applyTheme = (theme: ITheme) => {
  const root = document.documentElement;

  Object.keys(theme).forEach((key) => {
      const value = theme[key as keyof typeof theme] || ""; // Provide a fallback value
      root.style.setProperty(`--tas-${key}`, value);
  });
};

const sleep = (milliseconds: number) => {
  const date = Date.now();
  let currentDate = null;
  do {
    currentDate = Date.now();
  } while (currentDate - date < milliseconds);
};

const sentenceCase = (str: string) => {
  if (typeof str !== 'string') return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Consolidate all exports at the end
export {
  cn,
  getRequestSignature,
  applyTheme,
  sleep,
  TENDER_URLS,
  URL_PATHS,
  sentenceCase,
}
