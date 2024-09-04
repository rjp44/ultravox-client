import axios from 'axios';
import { UltravoxSession, UltravoxSessionStatus } from 'ultravox-client';

const api = axios.create({
  baseURL: 'https://api.ultravox.ai/api/',
  withCredentials: true,
  headers: {
    'X-API-Key': import.meta.env.VITE_ULTRAVOX_API_KEY,
  }
});

export default class Call extends UltravoxSession {

  constructor(systemPrompt, options = {voice: 'lily', temperature: 0.9}) {
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
      let { data: {
        uuid,
        ended,
        joinUrl
      } } = await api.post('calls', {
        systemPrompt,
        ...options
      });
      if (ended || !uuid?.length || !joinUrl?.length) {
        throw new Error('API call failed');
      }
      if (this.state.getStatus() !== UltravoxSessionStatus.DISCONNECTED) {
        throw new Error('Call already in progress');
      }
      await this.joinCall(joinUrl);
      ['ultravoxSessionStausChanged', 'ultravoxTranscriptsChanged'].forEach(event => this.addEventListener(event, onEvent));

    }
    catch (error) {
      console.error(error);
      throw new Error(`Call setup: ${error.message}`);
    }

  }
};
