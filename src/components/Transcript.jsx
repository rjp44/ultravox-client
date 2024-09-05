import { useRef, useEffect } from 'react';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import CallIcon from '@mui/icons-material/Call';
import CallEndIcon from '@mui/icons-material/CallEnd';
import ErrorIcon from '@mui/icons-material/Error';
import Typography from '@mui/material/Typography';

const types = {
  goodbye: {
    flexDirection: 'row',
    color: 'warning',
    maxWidth: '85%'
  },
  agent: {
    flexDirection: 'row',
    color: 'primary',
    maxWidth: '85%'
  },
  inject: {
    flexDirection: 'row',
    color: 'warning',
    maxWidth: '85%'
  },
  user: {
    flexDirection: 'row-reverse',
    color: 'neutral',
    maxWidth: '85%'
  },
  call: {
    startDecorator: <CallIcon />,
    flexDirection: 'row-reverse',
    flexGrow: 1,
    align: 'center',
    color: 'success'
  },
  hangup: {
    startDecorator: <CallEndIcon />,
    flexDirection: 'row-reverse',
    flexGrow: 1,
    align: 'center',
    color: 'danger'
  },
  data: {
    flexDirection: 'row-reverse',
    color: 'info'
  },
  function_results: {
    flexDirection: 'row-reverse',
    flexGrow: 1,
    color: 'warning',
    fontSize: 'small',
    align: 'center',
    whiteSpace: 'pre-wrap',
    lineHeight: '1',
    wordBreak: 'break-word'
  },
  rest_callout: {
    flexDirection: 'row',
    flexGrow: 1,
    color: 'warning',
    fontSize: 'small',
    align: 'center',
    whiteSpace: 'pre-wrap',
    lineHeight: '1',
    wordBreak: 'break-word'
  },
  error: {
    startDecorator: <ErrorIcon />,
    flexDirection: 'row',
    flexGrow: 1,
    color: 'danger',
    fontSize: 'small',
    align: 'center',
    whiteSpace: 'pre-wrap',
    lineHeight: '1',
    wordBreak: 'break-word'
  },

};

function Bubble({ type, index, children })
{
  let { align, flexDirection, flexGrow, color, maxWidth, startDecorator, whiteSpace, lineHeight, wordBreak } = types[type] || types['agent'];

  return types[type] && <Box key={index}
    sx={{
      display: 'flex',
      flexDirection,
      bgcolor: 'background.paper',
      borderRadius: 3
    }}
  >
    <Sheet
      variant="soft"
      color={color}
      sx={{
        p: 1,
        m: 1,
        mr: 3,
        flexGrow,
        maxWidth,
        borderRadius: 10,
        lineHeight,
        wordBreak,
        whiteSpace
      }}
    >
      <Typography {...{ startDecorator }} level="body2" justifyContent={align} align="left">{children}</Typography>
    </Sheet>

  </Box>;

};


export default function Transcript({ transcript, sx }) {
  const listRef = useRef(null);

  useEffect(() => {
    console.log({ transcript }, 'render');
    listRef.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [transcript]);

  let format_call = (value) => (`Function: ${value.name} (` + Object.entries(value.input).map(([name, value], index) => (`${(index) ? ' ' : ''}${name}: ${value}`)) + `) returns ${value.result} ${value.error ? value.error : '(no error)'} \n`);

  return (
    <Sheet variant="outlined" sx={{ ...sx, p: 4, width: '100%', borderRadius: 5 }} ref={listRef}>
       {transcript && transcript.map((utter, index) =>
        Object.entries(utter).map(([type, value]) => <>
          {(type === 'function_results') ? (<>
            {value.map(v =>
              (<Bubble type={type} key={`${type}-${index}`}>
                {(type === 'data' || type === 'function_results') && <Typography level="body-xs" >{format_call(v)}</Typography>}

              </Bubble>)
            )}
          </>) : (
            <Bubble type={type} index={`${type}-${index}`}>
              {(type === 'agent' || type === 'goodbye' || type === 'user' || type === 'inject') && value}
              {type === 'call' && `Call from ${value}`}
              {type === 'hangup' && 'Call HANGUP'}
              {type === 'error' && `System Error: ${value}`}
              {(type === 'data' || type === 'function_results') && <Typography level="body-xs" >{value.map(d => format_call(d))}</Typography>}
              {(type === 'rest_callout') && <Typography level="body-xs" >{`${value.method} ${value.url} ${value.body}`}</Typography>}
            </Bubble>
          )}
        </>
        )
      )}
      {!!transcript && !!transcript.length && transcript[transcript.length - 1].agent &&
        <Bubble type="user" key="last">
          ...
        </Bubble>
      }
    </Sheet>);
}
