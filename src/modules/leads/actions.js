/* eslint-disable import/prefer-default-export */
import { createRoutine } from 'redux-saga-routines';
import { LIST_LEADS } from './types';

export const listLeads = createRoutine(LIST_LEADS);
