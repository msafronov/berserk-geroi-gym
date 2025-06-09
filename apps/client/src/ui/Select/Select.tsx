import { useCallback, useState } from 'preact/hooks';
import type { ChangeEvent } from 'preact/compat';

import './styles.css';
import clsx from 'clsx';

export interface ISelectOption {
  id: string;
  label: string;
}

type Props = {
  items: ISelectOption[];
  onChange: (option: ISelectOption) => void;
};

export const Select = ({
  items,
  onChange,
}: Props) => {
  const [activeOption, setActiveOption] = useState<ISelectOption | undefined>(items[0]);

  const onChangeInternal = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    // @ts-ignore
    // event.target.value гарантированно существует
    const option = { id: event.target.value, label:  ''};

    onChange(option);
    setActiveOption(option);
  }, []);

  return (
    <select
      className="select"
      onChange={onChangeInternal}
    >
      {items.map((option) => {
        return (
          <option
            className={clsx('select-option', {
              'select-option--active': activeOption?.id === option.id,
            })}
            value={option.id}
          >
            {option.label}
          </option>
        );
      })}
    </select>
  );
};
