/* eslint-disable import/prefer-default-export */
import { createRoutine } from 'redux-saga-routines';
import { LIST_LEADS, UPDATE_LIST_LEAD } from './types';

export const listLeads = createRoutine(LIST_LEADS);
export const updateListLead = createRoutine(UPDATE_LIST_LEAD);
