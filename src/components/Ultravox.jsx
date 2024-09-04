import { useState } from "react";
import Textarea from "@mui/joy/Textarea";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";

import Call from "../lib/ultravox_api.js";

export default function Ultravox({ state, setState, setTranscript }) {
  let [prompt, setPrompt] = useState("You are a helpful agent");
  const call = new Call();

  const callHandler = async () => {
    console.log({ prompt }, callHandler);
    if (prompt) {
      call.prompt = prompt;
      const response = await call.startCall((event) => {
        event.transcript && setTranscript(event.transcript);
        event.status && setState(event.status);
      });
      console.log(response);
    }
  }

  return (
    <Stack>
      <Textarea
        label="prompt"
        size="lg"
        minRows={10} variant="outlined" sx={{ width: '100%', m: 1 }} onChange={event => setPrompt(event.target.value)}
        value={prompt}
      />
      <Button variant="solid" onClick={callHandler}>Start</Button>
    </Stack>
  )

}
