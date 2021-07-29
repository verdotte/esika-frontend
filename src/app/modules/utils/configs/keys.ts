type valueType = string | null | undefined;

type kType = {
  DEFAULT_API: valueType;
  TOKEN_STORAGE_KEY: valueType;
  PHONE_STORAGE_KEY: valueType;
};

const keys: kType = {
  DEFAULT_API: process.env.DEFAULT_API || null,
  TOKEN_STORAGE_KEY: process.env.TOKEN_STORAGE_KEY || 'ju79J48_IOPW',
  PHONE_STORAGE_KEY: 'kjfEORUdl943a',
};

export default keys;
