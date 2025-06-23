import { useCallback, useEffect, useState } from 'preact/hooks';
import { useStore } from '@nanostores/preact';

import { Text } from '@/ui/Text/Text';
import { Input } from '@/ui/Input/Input';

import { validateDeckDescription } from '@/features/validation/actions';
import { DECK_DESCRIPTION_LENGTH_MAX } from '@/features/validation/const';

import { setDescription } from '../../actions';
import { $deckEditorModalStore } from '../../store';

import './styles.css';

export const DeckDescription = () => {
  const { deck: { description } } = useStore($deckEditorModalStore);
  const [value, setValue] = useState<string>(description);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const validate = useCallback(() => {
    const error = validateDeckDescription(value);
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
      setDescription(value);
    }
  }, [value]);

  useEffect(() => {
    validate();
  }, []);

  const hasError = !!errorMessage;

  return (
    <div className="deck-editor-deck-description">
      <Text
        color={hasError ? 'red' : 'black'}
        weight="bold"
      >
        Описание:
      </Text>

      <Input
        maxLength={DECK_DESCRIPTION_LENGTH_MAX}
        value={value}
        placeholder="Введите описание колоды"
        hasError={hasError}
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
    </div>
  );
};
