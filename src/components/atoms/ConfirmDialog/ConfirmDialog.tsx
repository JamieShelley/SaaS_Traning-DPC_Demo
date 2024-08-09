import { Button, Dialog, DialogContent } from '@mui/material';

export interface IConfirmDialogProps {
  open: boolean;
  config?: any;
  confirmBtnText?: string;
  cancelBtnText?: string;
  children?: JSX.Element | JSX.Element[];
  onCloseCb: Function;
}

const ConfirmDialog = ({
  open,
  config,
  children,
  confirmBtnText,
  cancelBtnText,
  onCloseCb
}: IConfirmDialogProps) => {
  return (
    <Dialog
      open={open}
      fullScreen={true}
    >
      <DialogContent>
        {children}
        <div className="flex flex-row justify-center">
          <Button

            variant="contained"
            onClick={() => onCloseCb(true, config)}
          >
            {confirmBtnText ? confirmBtnText : 'Yes'}
          </Button>
          <Button
            variant="outlined"
            onClick={() => onCloseCb(false, config)}
          >
            {cancelBtnText ? cancelBtnText : 'No'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
