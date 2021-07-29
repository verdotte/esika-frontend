/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Yup from 'yup';
import 'yup-phone-lite';
import placeholderImg from 'app/static/images/placeholder.jpg';

export const onImageError = (
  event: any,
  fallbackSrc = placeholderImg,
) => {
  event.target.onerror = null;
  event.target.src = fallbackSrc;
};

export const formDataToObject = (
  formData: FormData,
): Record<string, string | null | undefined> => {
  const object = {};
  formData.forEach((value, key) => {
    object[key] = value;
  });
  return object;
};

export const isValidPhoneNumber = (phone: string, country) => {
  const phoneSchema = Yup.string()
    .phone(country, true as unknown as string)
    .required();

  const phoneNumber =
    phone && phone.includes('+') ? phone : `+${phone}`;

  const valid = phoneSchema.isValidSync(phoneNumber);

  return valid;
};

export const SUPPORTED_COUNTRIES = {
  DRC: {
    shortName: 'cd',
    countryCode: '+243',
    countryName: 'D.R. Congo',
  },
  UGANDA: {
    shortName: 'ug',
    countryCode: '+256',
    countryName: 'Uganda',
  },
  Rwanda: {
    shortName: 'rw',
    countryCode: '+250',
    countryName: 'Rwanda',
  },
  Kenya: {
    shortName: 'ke',
    countryCode: '+254',
    countryName: 'Kenya',
  },
  Tanzania: {
    shortName: 'tz',
    countryCode: '+255',
    countryName: 'Tanzania',
  },
} as const;
