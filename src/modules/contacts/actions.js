/* eslint-disable import/prefer-default-export */
import { createRoutine } from 'redux-saga-routines';
import { LIST_CONTACTS } from './types';

export const listContacts = createRoutine(LIST_CONTACTS);
