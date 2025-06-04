import type { TargetedEvent } from 'preact/compat';
import { useCallback, useEffect, useState } from 'preact/hooks';
import { useStore } from '@nanostores/preact';

import { Text } from '@/ui/Text/Text';
import { Input } from '@/ui/Input/Input';

import { validateDeckTitle } from '@/features/validation/actions';
import { DECK_TITLE_LENGTH_MAX } from '@/features/validation/const';

import { $deckEditorModalStore } from '../../store';
import { setTitle } from '../../actions';

import './styles.css';

export const DeckTitle = () => {
  const { deck: { title } } = useStore($deckEditorModalStore);
  const [value, setValue] = useState<string>(title);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const validate = useCallback(() => {
    const errors = validateDeckTitle(value);
    const isValid = !errors.length;

    if (errors.includes('DECK_TITLE_IS_EMPTY_ERROR')) {
      setErrorMessage('Название колоды не может быть пустым');
    } else if (errors.includes('DECK_TITLE_IS_INVALID_ERROR')) {
      setErrorMessage(`Название колоды не может превышать ${DECK_TITLE_LENGTH_MAX} символов`);
    } else {
      setErrorMessage(null);
    }

    return isValid;
  }, [value]);

  const onChange = useCallback((event: TargetedEvent<HTMLInputElement, Event>) => {
    // @ts-ignore
    setValue(event.target.value);
  }, []);

  const onFocusOut = useCallback(() => {
    const isValid = validate();

    if (isValid) {
      setTitle(value);
    }
  }, [value]);

  useEffect(() => {
    validate();
  }, []);

  const hasError = !!errorMessage;

  return (
    <div className="deck-editor-deck-title">
      <Text
        color={hasError ? 'red' : 'black'}
        weight="bold"
      >
        Название <Text color="red">*</Text>:
      </Text>

      <Input
        maxLength={DECK_TITLE_LENGTH_MAX}
        value={value}
        placeholder="Введите название колоды"
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
