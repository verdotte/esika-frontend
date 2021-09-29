type valueType = string | null | undefined;

type kType = {
  DEFAULT_API: valueType;
  TOKEN_STORAGE_KEY: valueType;
  PHONE_STORAGE_KEY: valueType;
  ALGOLIA_INDEX_NAME: valueType;
  ALGOLIA_API_KEY: valueType;
  ALGOLIA_APP_ID: valueType;
  JWT_SECRET_KEY: valueType;
  USER_TYPE_KEY: string;
};

const keys: kType = {
  DEFAULT_API: process.env.DEFAULT_API || null,
  TOKEN_STORAGE_KEY: process.env.TOKEN_STORAGE_KEY || 'ju79J48_IOPW',
  PHONE_STORAGE_KEY: 'kjfEORUdl943a',
  ALGOLIA_API_KEY: process.env.ALGOLIA_SEARCH_KEY,
  ALGOLIA_APP_ID: process.env.ALGOLIA_APP_ID,
  ALGOLIA_INDEX_NAME: process.env.ALGOLIA_INDEX_NAME,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  USER_TYPE_KEY: 'Sjhdsj12',
};

export default keys;
