import { createRoutine, bindRoutineToReduxForm } from 'redux-saga-routines';
import {
  RETRIEVE_LEAD,
  CREATE_LEAD,
  UPDATE_LEAD,
  SEND_VALIDATION_INFO_LEAD,
  SEND_VALIDATION_CRED_LEAD,
} from './types';

export const retrieveLead = createRoutine(RETRIEVE_LEAD);

export const createLead = createRoutine(CREATE_LEAD);
export const bindedCreateLead = bindRoutineToReduxForm(createLead);

export const updateLead = createRoutine(UPDATE_LEAD);
export const bindedUpdateLead = bindRoutineToReduxForm(updateLead);

export const sendValidationInfoLead = createRoutine(SEND_VALIDATION_INFO_LEAD);
export const sendValidationCredLead = createRoutine(SEND_VALIDATION_CRED_LEAD);
