// eslint-disable-next-line import/no-extraneous-dependencies
import algoliasearch from 'algoliasearch/lite';
import keys from '../configs/keys';

const indexName = keys.ALGOLIA_INDEX_NAME;
const searchClient = algoliasearch(
  keys.ALGOLIA_APP_ID as string,
  keys.ALGOLIA_API_KEY as string,
);
export { searchClient, indexName };
