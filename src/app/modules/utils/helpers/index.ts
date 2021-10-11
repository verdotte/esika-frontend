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

export const isValidPhoneNumber = (
  phone: string,
  country: string | null | undefined,
) => {
  const phoneSchema = Yup.string()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    .phone(country, true as unknown as string)
    .required();

  const phoneNumber =
    phone && phone.includes('+') ? phone : `+${phone}`;

  const valid = phoneSchema.isValidSync(phoneNumber);

  return valid;
};

export const lazyLoad = (target: Element) => {
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.getAttribute('data-src');

        img.setAttribute('src', src as string);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        img.onload = () => {
          img.removeAttribute('data-src');
        };

        observer.disconnect();
      }
    });
  });
  io.observe(target);
};

export const isEmpty = (obj) =>
  Object?.keys(obj)?.findIndex((key) => obj[key]) < 0;

export const groupBy = (
  xs: any[],
  f: { (property: any): any; (arg0: any): any },
) => {
  return xs.reduce(
    // eslint-disable-next-line no-return-assign
    (
      r: { [x: string]: never[] },
      v: any,
      _i: any,
      _a: any,
      k = f(v),
      // eslint-disable-next-line no-sequences
    ) => ((r[k] || (r[k] = [])).push(v as never), r),
    {},
  );
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
