import React from 'react';
import { useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { useRecoilValue } from 'recoil';

import { LoadingButton } from '@mui/lab';
import { Box, Menu, Stack } from '@mui/material';
import { Tooltip } from '@mui/material';

import { IAction } from 'state/action';
import { ISession, loadingState, sessionState } from 'state/chat';

import RegularButton from './buttons/button';

interface ActionProps {
  action: IAction;
  loading: boolean;
  session?: ISession;
}

const Action = ({ action, loading, session }: ActionProps) => {
  const call = useCallback(async () => {
    try {
      const sessionId = session?.socket.id;

      if (!sessionId) {
        return;
      }
      session?.socket.emit('action_call', action);
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message);
      }
    }
  }, [session]);

  const button = (
    <LoadingButton data-action-id={action.id} onClick={call} disabled={loading}>
      {action.label || action.name}
    </LoadingButton>
  );

  return (
    <Tooltip title={action.description} placement="top">
      {button}
    </Tooltip>
  );
};

export default function ActionList({ actions }: { actions: IAction[] }) {
  const loading = useRecoilValue(loadingState);
  const session = useRecoilValue(sessionState);

  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const renderActions = (items: IAction[]) =>
    items.map((action) => (
      <Action
        key={action.id}
        action={action}
        loading={loading}
        session={session}
      />
    ));

  return (
    <Box margin="auto">
      {renderActions(actions.slice(0, 2))}
      {actions.length > 2 ? (
        <>
          <RegularButton
            id="actions-button"
            onClick={(event: React.MouseEvent<HTMLElement>) =>
              setAnchorEl(event.currentTarget)
            }
          >
            More actions
          </RegularButton>
          <Menu
            id="actions-menu"
            anchorEl={anchorEl}
            open={!!anchorEl}
            onClose={() => setAnchorEl(null)}
            sx={{ marginTop: 1 }}
          >
            <Stack direction="column" paddingX={2} gap={1}>
              {renderActions(actions.slice(2, actions.length))}
            </Stack>
          </Menu>
        </>
      ) : null}
    </Box>
  );
}
