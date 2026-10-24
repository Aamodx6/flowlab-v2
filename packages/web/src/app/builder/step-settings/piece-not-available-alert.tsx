import { t } from 'i18next';
import { AlertTriangle } from 'lucide-react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export const PieceNotAvailableAlert = ({
  pieceName,
  pieceVersion,
}: PieceNotAvailableAlertProps) => (
  <Alert variant="destructive">
    <AlertTriangle className="size-4" />
    <AlertTitle>{t('Piece not available')}</AlertTitle>
    <AlertDescription>
      {t('pieceNotAvailableOnInstanceNote', {
        pieceName: cleanPieceName(pieceName),
        pieceVersion,
      })}
    </AlertDescription>
  </Alert>
);

const cleanPieceName = (name: string): string => {
  return name.replace(/^@activepieces\/(?:piece-)?/, '');
};

type PieceNotAvailableAlertProps = {
  pieceName: string;
  pieceVersion: string;
};
