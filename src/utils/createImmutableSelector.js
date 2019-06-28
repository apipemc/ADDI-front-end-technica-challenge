import { is } from 'immutable';
import { createSelectorCreator, defaultMemoize } from 'reselect';

const createImmutableSelector = createSelectorCreator(defaultMemoize, is);

export default createImmutableSelector;
