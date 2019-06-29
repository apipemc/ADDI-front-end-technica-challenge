import { createRoutine, bindRoutineToReduxForm } from 'redux-saga-routines';
import { RETRIEVE_CONTACT, CREATE_CONTACT, UPDATE_CONTACT } from './types';

export const retrieveContact = createRoutine(RETRIEVE_CONTACT);

export const createContact = createRoutine(CREATE_CONTACT);
export const bindedCreateContact = bindRoutineToReduxForm(createContact);

export const updateContact = createRoutine(UPDATE_CONTACT);
export const bindedUpdateContact = bindRoutineToReduxForm(updateContact);
