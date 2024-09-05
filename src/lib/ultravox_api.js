import axios from 'axios';
import { UltravoxSession, UltravoxSessionStatus } from 'ultravox-client';

const api = axios.create({
  baseURL: 'https://api.ultravox.ai/api/',
  headers: {
    'X-Unsafe-API-Key': import.meta.env.VITE_ULTRAVOX_API_KEY
  }
});

export default class Call extends UltravoxSession {

  constructor(systemPrompt, options = { voice: 'lily', temperature: 0.9 }) {
    super();
    Object.assign(this, { systemPrompt, options });
  }

  get prompt() {
    return this.systemPrompt;
  }

  set prompt(value) {
    this.systemPrompt = value;
  }


  async startCall(onEvent) {
    let { systemPrompt, options } = this;

    try {

      if (this.state.getStatus() !== UltravoxSessionStatus.DISCONNECTED) {
        throw new Error('Call already in progress');
      }
      let { data: {
        callId,
        ended,
        joinUrl
      } } = await api.post('calls', {
        systemPrompt,
        ...options
      });
      if (ended || !callId?.length || !joinUrl?.length) {
        throw new Error('API call failed');
      }
      this.callId = callId;
      this.onEvent = onEvent;
      let state = await this.joinCall(joinUrl);
      ['ultravoxSessionStatusChanged', 'ultravoxTranscriptsChanged'].forEach(event => state.addEventListener(event, onEvent));
      console.log({ self: this }, 'Call started');

    }
    catch (error) {
      console.error(error);
      throw new Error(`Call setup: ${error.message}`);
    }


  }

  async endCall(onEvent) {
    let { callId } = this;
    console.log({ self: this, callId }, 'Call ending');

    try {
      if (!callId) {
        throw new Error('No call in progress');
      }
      await api.delete(`calls/${callId}`);

      let state = await this.leaveCall();
      ['ultravoxSessionStatusChanged', 'ultravoxTranscriptsChanged'].forEach(event => state.removeEventListener(event, onEvent));
      this.callId = this.onEvent = undefined;
    }
    catch (error) {
      console.error(error);
      throw new Error(`Call teardown: ${error.message}`);
    }

  }

};
