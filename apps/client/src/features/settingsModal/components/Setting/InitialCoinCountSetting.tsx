import { useCallback, useEffect, useState } from 'preact/hooks';
import { useStore } from '@nanostores/preact';
import { $databaseStore } from '@/features/database/store';
import { validateInitialCoinCountSetting } from '@/features/validation/actions';
import {
  SETTING_INITIAL_COINT_COUNT_MIN,
  SETTING_INITIAL_COINT_COUNT_MAX,
} from '@/features/validation/const';

import { Text } from '@/ui/Text/Text';
import { Input } from '@/ui/Input/Input';

import { setInitialCoinCountSetting } from '../../actions';

import { Setting } from './Setting';
import { SettingPanel } from './components/SettingPanel/SettingPanel';

import './styles.css';

export const InitialCoinCountSetting = () => {
  const { settings } = useStore($databaseStore);
  const [value, setValue] = useState<number>(settings.initialCoinCount);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validate = useCallback(() => {
    const error = validateInitialCoinCountSetting(value);
    const errorMessage = error?.message || null;

    setErrorMessage(errorMessage);

    return !!errorMessage;
  }, [value]);

  const onChange = useCallback((value: string | number) => {
    setValue(Number(value));
  }, []);

  const onFocusOut = useCallback(() => {
    const hasError = validate();

    if (!hasError) {
      setInitialCoinCountSetting(value);
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
          Количество монет у каждого героя:
        </Text>
      </SettingPanel>

      <SettingPanel direction="right">
        <Input
          type="number"
          value={value}
          hasError={hasError}
          min={SETTING_INITIAL_COINT_COUNT_MIN}
          max={SETTING_INITIAL_COINT_COUNT_MAX}
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
