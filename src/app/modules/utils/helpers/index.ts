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

export const lazyLoad = (target) => {
  const io = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const src = img.getAttribute('data-src');

        img.setAttribute('src', src as string);

        img.onload = () => {
          img.removeAttribute('data-src');
        };

        observer.disconnect();
      }
    });
  });
  io.observe(target);
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

export const SUPPORTED_CATEGORIES = {
  House: {
    name: 'house',
    label: 'Maison',
  },
  Hotel: {
    name: 'hotel',
    label: 'Hotel',
  },
  Land: {
    name: 'land',
    label: 'Parcelle',
  },
  Apartment: {
    name: 'appartement',
    label: 'Appartements',
  },
  Commercial: {
    name: 'commercial',
    label: 'Magasins',
  },
  Studio: {
    name: 'studio',
    label: 'Studio',
  },
} as const;

export const SUPPORTED_CURRENCIES = {
  USD: {
    name: 'usd',
    label: 'USD',
  },
  CDF: {
    name: 'cdf',
    label: 'CDF',
  },
} as const;

export const SUPPORTED_UNITS = {
  Month: {
    name: 'month',
    label: 'Mois',
  },
  Day: {
    name: 'day',
    label: 'Jour',
  },
} as const;

export const SUPPORTED_CITIES = {
  Kinshasa: {
    name: 'Kinshasa',
    label: 'Kinshasa',
  },
  Kampala: {
    name: 'Kampala',
    label: 'Kampala',
  },
  Kigali: {
    name: 'Kigali',
    label: 'Kigali',
  },
  Nairobi: {
    name: 'Nairobi',
    label: 'Nairobi',
  },
  DaresSalam: {
    name: 'DaresSalam',
    label: 'Dar es Salam',
  },
} as const;

export const SUPPORTED_TYPES = {
  Rent: {
    name: 'rent',
    label: 'Location',
  },
  Sale: {
    name: 'sale',
    label: 'Achat',
  },
} as const;