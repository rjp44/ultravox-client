# ultravox-client

Super simple reference and test client to create calls and talk to the Fixie.ai Ultravox SDK using a Vite React template.

An abandonware repo that I threw up to quickly prototype a client for the Ultravox SDK to test out my own understanding of [how it works](https://fixie-ai.github.io/ultradox/guides/quickstart/) in the simplest possible environment. It works and my development focus is now on integrating Ultravox with the [Aplisay platform](https://github.com/aplisay/llm-agent) to test alongside more traditional STT->TextModel->TTS pipelines.

The code in this repo calls the Ultravox REST API directly from client code to nail up a call, then processes the websocket in their [client SDK](https://www.npmjs.com/package/ultravox-client). To make this work, I had to bug the Ultravox team to add CORS support to their REST API.

Doing it this way is a bad idea, because it means that the client sees your Ultravox API key. Anybody can inspect this using Chrome debug and use it to steal minutes you are paying for. Don't do this for anything other than local testing code.

By all means steal this code to develop your own project (MIT licence) but, if you do, re-factor to do the call setup and manage the API key server side. A much better starting point would be one of their [official examples](https://github.com/fixie-ai/ultradox/tree/main/examples) that I only found **after** I started building this!

## Running

```shell
VITE_ULTRAVOX_API_KEY=<YOUR_API_KEY> yarn dev
```

## Building

Building has been removed from package.json as this "captures" the API key into the built code and someone may then be daft enough to host it on the Internet.
