import { Button, Dialog, DialogActions, Typography, DialogContent, DialogTitle } from "@mui/material";

export function UnsavedChangesDialog({ open, onCancel, onDiscard }: { open: boolean; onCancel: () => void; onDiscard: () => void }) {
    return (
        <Dialog open={open} onClose={onCancel}>
            <DialogTitle>Hay cambios sin guardar</DialogTitle>
            <DialogContent>
                <Typography>
                    Tienes cambios sin guardar. Si sales sin guardar, perderás tu progreso.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel}>Cancelar</Button>
                <Button onClick={onDiscard} color="error">
                    Descartar cambios
                </Button>
            </DialogActions>
        </Dialog>
    );
}
