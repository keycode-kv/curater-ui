import React from 'react';

import { Box, IconButton } from '@mui/material';

import copy from 'copy-to-clipboard';
import { ReactComponent as CopyToClipboardIcon} from 'assets/copy-to-clipboard-icon.svg'

export default function CopyTextBox ({ text }) {
    return (
      <Box
        sx={{
          borderRadius: '15px',
          border: '1.5px dashed #4E157A',
          backgroundColor: '#D39CFF',
          minHeight: '125px'
        }}
      >
        <Box
          sx={{
            fontSize: '24px',
            fontStyle: 'normal',
            fontWeight: 400,
            color: '#414141',
            overflowWrap: 'break-word',
            padding: '20px'
          }}
        >
          affefvevdwvdwvdwvdv@curater.inc
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end'
            }}
          >
            <IconButton
              onClick={() => copy(text ?? '')}
            >
              <CopyToClipboardIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    );
}