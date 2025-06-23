import { useCallback, useEffect, useState } from 'preact/hooks';
import { useStore } from '@nanostores/preact';
import { $databaseStore } from '@/features/database/store';
import { validateAutoDealCardCountSetting } from '@/features/validation/actions';
import {
  SETTING_AUTO_DEAL_CARDS_COUNT_MIN,
  SETTING_AUTO_DEAL_CARDS_COUNT_MAX,
} from '@/features/validation/const';

import { Text } from '@/ui/Text/Text';
import { Input } from '@/ui/Input/Input';

import { setAutoDealCardsCountSetting } from '..//../actions';

import { Setting } from './Setting';
import { SettingPanel } from './components/SettingPanel/SettingPanel';

import './styles.css';

export const AutoDealCardsSetting = () => {
  const { settings } = useStore($databaseStore);
  const [value, setValue] = useState(settings.autoDealCardsCount);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validate = useCallback(() => {
    const error = validateAutoDealCardCountSetting(value);
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
      setAutoDealCardsCountSetting(value);
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
          Количество карт автораздачи при старте игры:
        </Text>
      </SettingPanel>

      <SettingPanel direction="right">
        <Input
          type="number"
          value={value}
          hasError={hasError}
          min={SETTING_AUTO_DEAL_CARDS_COUNT_MIN}
          max={SETTING_AUTO_DEAL_CARDS_COUNT_MAX}
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
