import { FC, MouseEvent } from 'react';
import Button from '@/components/ui/Button';
import Dialog from '@/components/ui/Dialog';

interface ModalProps {
    title?: string;
    open: boolean;
    width: number;
    setOpen: (isOpen: boolean) => void;
    children: React.ReactNode;
}

const ModalInternalScroll: FC<ModalProps> = ({ children, title, open, setOpen, width }) => {

    const onDialogClose = (e: MouseEvent) => {
        setOpen(false);
    };

    const onDialogOk = (e: MouseEvent) => {
        setOpen(false);
    };

    return (
        <div>
            <Dialog
                width={width}
                closable={false}
                isOpen={open} onClose={onDialogClose} onRequestClose={onDialogClose}>
                <div className="flex flex-col h-full justify-between">
                    <div className="max-h-96 overflow-y-auto">
                        {children}
                    </div>
                    <div className="text-right mt-6">
                        <Button variant="solid" onClick={onDialogOk}>
                            Okay
                        </Button>
                    </div>
                </div>
            </Dialog>
        </div>
    );
};

export default ModalInternalScroll;
