import { useEffect, useState } from "react";
import Textarea from "@mui/joy/Textarea";
import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";

import Call from "../lib/ultravox_api.js";

export default function Ultravox({ state, setState, transcript, setTranscript }) {
  const [prompt, setPrompt] = useState("You are a helpful agent");
  const [active, setActive] = useState(false);
  const [call] = useState(() => new Call());

  const callHandler = async () => {
    if (active) {
      console.log({ active, state }, "disconnecting");
      call.endCall();
    }
    else if (prompt) {
      call.prompt = prompt;
      await call.startCall((event) => {
        event.transcripts && setTranscript(
          event.transcripts.map(t => ({ [t.speaker]: t.text }))
        );
        setState(event.state);
      });
    }
  }

  useEffect(() => {
    //console.log({ state, transcript }, "state change");
    switch (state) {
      case "connecting":
      case "thinking":
      case "listening":
      case "speaking":
        setActive(true);
        break;
      default:
        setActive(false);
        break;
    }
  }, [state, transcript]);

  return (
    <Stack>
      <Textarea
        label="prompt"
        size="lg"
        minRows={10} variant="outlined" sx={{ width: '100%', mb: 1, mt: 1 }} onChange={event => setPrompt(event.target.value)}
        value={prompt}
      />
      <Button variant="solid" color={active ? "warning" : "primary"} onClick={callHandler}>{active ? 'Disconnect' : "Start"}</Button>
    </Stack>
  )

}
