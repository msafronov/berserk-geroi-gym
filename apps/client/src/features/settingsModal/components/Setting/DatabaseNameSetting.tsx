import { useCallback, useEffect, useState } from 'preact/hooks';
import { useStore } from '@nanostores/preact';
import { $databaseStore } from '@/features/database/store';
import { validateDatabaseName } from '@/features/validation/actions';
import {
  DATABASE_NAME_LENGTH_MIN,
  DATABASE_NAME_LENGTH_MAX,
} from '@/features/validation/const';

import { Text } from '@/ui/Text/Text';
import { Input } from '@/ui/Input/Input';

import { setDatabaseName } from '../../actions';

import { Setting } from './Setting';
import { SettingPanel } from './components/SettingPanel/SettingPanel';

import './styles.css';

export const DatabaseNameSetting = () => {
  const { name } = useStore($databaseStore);
  const [value, setValue] = useState(name);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validate = useCallback(() => {
    const error = validateDatabaseName(value);
    const errorMessage = error?.message || null;

    setErrorMessage(errorMessage);

    return !!errorMessage;
  }, [value]);

  const onChange = useCallback((value: string | number) => {
    setValue(value.toString());
  }, []);

  const onFocusOut = useCallback(() => {
    const hasError = validate();

    if (!hasError) {
      setDatabaseName(value);
    }
  }, [value]);
  
  useEffect(() => {
    validate();
  }, []);

  const hasError = !!errorMessage;

  return (
    <Setting>
      <SettingPanel direction="left">
        <Text color={hasError ? 'red' : 'black'}>
          Наименование Базы Данных:
        </Text>
      </SettingPanel>

      <SettingPanel direction="right">
        <Input
          type="text"
          value={value}
          hasError={hasError}
          minLength={DATABASE_NAME_LENGTH_MIN}
          maxLength={DATABASE_NAME_LENGTH_MAX}
          onChange={onChange}
          onFocusOut={onFocusOut}
        />

        {hasError && (
          <Text
            color="red"
            size="sm"
          >
            {errorMessage}
          </Text>
        )}
      </SettingPanel>
    </Setting>
  );
};
