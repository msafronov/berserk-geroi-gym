import { useStore } from '@nanostores/preact';
import { useCallback, useState } from 'preact/hooks';

import { Text } from '@/ui/Text/Text';
import { Input } from '@/ui/Input/Input';

import { $berserkdeckImportModalStore } from '../../store';
import { setDeckURL, setError } from '../../actions';

import './styles.css';

export const Form = () => {
  const { error } = useStore($berserkdeckImportModalStore);
  const [value, setValue] = useState<string>('');

  const onChange = useCallback((value: string | number) => {
    setError(null);
    setValue(value.toString());
  }, []);

  const onFocusOut = useCallback(() => {
    setDeckURL(value);
  }, [value]);

  const hasError = !!error;

  return (
    <div className="berserkdeck-import-modal-form">
      <Text color={hasError ? 'red' : 'black'}>
        Укажите ссылку на колоду:
      </Text>

      <Input
        type="text"
        size="sm"
        value={value}
        placeholder="https://berserkdeck.ru/decks/32522"
        hasError={hasError}
        onChange={onChange}
        onFocusOut={onFocusOut}
      />

      {hasError && (
        <Text
          color="red"
          size="sm"
        >
          {error}
        </Text>
      )}
    </div>
  );
};
