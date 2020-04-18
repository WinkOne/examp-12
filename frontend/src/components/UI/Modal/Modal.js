import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

export default function Modal(props) {

    return (
        <div>
            <Dialog
                open={props.openModal}
                onClose={props.handlerOpen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent>
                    {props.children}
                </DialogContent>
                <DialogActions style={{margin: '0 auto'}}>
                    <Button onClick={props.handlerOpen} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}