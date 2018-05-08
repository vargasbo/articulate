import {
  LOCATION_CHANGE,
  push,
} from 'react-router-redux';

import {
  call,
  cancel,
  put,
  take,
  takeLatest,
} from 'redux-saga/effects';
import {
  deleteAgentError,
  deleteAgentSuccess,
  resetCurrentAgent,
} from '../../containers/App/actions';
import { DELETE_AGENT } from '../../containers/App/constants';
import { getAgents } from '../../containers/App/sagas';
import {
  loadAgentError,
  loadAgentSuccess,
  loadWebhookError,
  loadWebhookSuccess,
} from './actions';
import { LOAD_AGENT, LOAD_WEBHOOK } from './constants';

export function* deleteAgent() {
  const action = function* (payload) {
    const { api, id } = payload;
    try {
      yield call(api.agent.deleteAgentId, { id });
      yield put(deleteAgentSuccess());
      yield call(getAgents, { api });
      yield put(resetCurrentAgent());
      yield put(push('/'));
    } catch (err) {
      const errObject = { err };
      if (errObject.err && errObject.err.message === 'Failed to fetch'){
        yield put(deleteAgentError({ message: 'Can\'t find a connection with the API. Please check your API is alive and configured properly.' }));
      }
      else {
        if (errObject.err.response.obj && errObject.err.response.obj.message){
          yield put(deleteAgentError({ message: errObject.err.response.obj.message }));
        }
        else {
          yield put(deleteAgentError({ message: 'Unknow API error' }));
        }
      }
    }
  };
  const watcher = yield takeLatest(DELETE_AGENT, action);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* getWebhook(payload) {
  const { api, id } = payload;
  try {
    const response = yield call(api.agent.getAgentIdWebhook, { id });
    const webhook = response.obj;
    yield put(loadWebhookSuccess(webhook));
  } catch (err) {
    const errObject = { err };
    if (errObject.err && errObject.err.message === 'Failed to fetch'){
      yield put(loadWebhookError({ message: 'Can\'t find a connection with the API. Please check your API is alive and configured properly.' }));
    }
    else {
      if (errObject.err.response.obj && errObject.err.response.obj.message){
        yield put(loadWebhookError({ message: errObject.err.response.obj.message }));
      }
      else {
        yield put(loadWebhookError({ message: 'Unknow API error' }));
      }
    }
  }
}

export function* getAgent(payload) {
  const { api, id } = payload;
  try {
    const response = yield call(api.agent.getAgentId, { id });
    const agent = response.obj;
    agent.domainClassifierThreshold *= 100;
    yield put(loadAgentSuccess(agent));
  } catch (err) {
    const errObject = { err };
    if (errObject.err && errObject.err.message === 'Failed to fetch'){
      yield put(loadAgentError({ message: 'Can\'t find a connection with the API. Please check your API is alive and configured properly.' }));
    }
    else {
      if (errObject.err.response.obj && errObject.err.response.obj.message){
        yield put(loadAgentError({ message: errObject.err.response.obj.message }));
      }
      else {
        yield put(loadAgentError({ message: 'Unknow API error' }));
      }
    }
  }
}

export function* loadAgent() {
  const watcher = yield takeLatest(LOAD_AGENT, getAgent);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

export function* loadWebhook() {
  const watcher = yield takeLatest(LOAD_WEBHOOK, getWebhook);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// All sagas to be loaded
export default [
  deleteAgent,
  loadAgent,
  loadWebhook,
];
