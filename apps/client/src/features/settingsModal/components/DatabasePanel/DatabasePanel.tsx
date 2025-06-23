import { useCallback, useEffect, useRef } from 'preact/hooks';

import { Button } from '@/ui/Button/Button';
import { Icon } from '@/ui/Icon/Icon';
import { Text } from '@/ui/Text/Text';

import { preImportDatabase, importDatabase, exportDatabase } from '../../actions';
import { DatabasePanelButton } from './components/Button';

import './styles.css';

export const DatabasePanel = () => {
  const inputFileRef = useRef<HTMLInputElement | null>(null);

  const onImportClick = useCallback(() => {
    preImportDatabase()
      .then(() => {
        inputFileRef?.current?.click();
      })
      .catch(() => {
        //
      });
  }, []);

  const onImport = useCallback((event: Event) => {
    // @ts-ignore
    const file = event.target?.files?.[0];

    importDatabase(file);
  }, []);

  const onExportClick = useCallback(() => {
    exportDatabase();
  }, []);

  useEffect(() => {
    inputFileRef.current?.addEventListener('change', onImport);

    return () => {
      inputFileRef.current?.removeEventListener('change', onImport);
    };
  }, []);

  return (
    <div className="settings-modal-database-panel">
      <input
        type="file"
        name="myfile"
        style={{ display: 'none'}}
        ref={inputFileRef}
        accept="application/json"
      />

      <Button
        color="white"
        onClick={onImportClick}
      >
        <DatabasePanelButton>
          <Icon image="import" />

          <Text>
            Импортировать БД
          </Text>
        </DatabasePanelButton>
      </Button>

      <Button
        color="white"
        onClick={onExportClick}
      >
        <DatabasePanelButton>
          <Icon image="export" />

          <Text>
            Экспортировать БД
          </Text>
        </DatabasePanelButton>
      </Button>
    </div>
  );
};
