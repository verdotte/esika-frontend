type kType = {
  [key: string]: string | null | undefined;
};

const keys: kType = {
  DEFAULT_API: process.env.DEFAULT_API || null,
  TOKEN_STORAGE_KEY: process.env.TOKEN_STORAGE_KEY || 'ju79J48_IOPW',
};

export default keys;
