import { downloadList } from "card-images-downloader";
import { useCallback, useMemo } from "preact/hooks";

import { Text } from "@/ui/Text/Text";
import { Select } from "@/ui/Select/Select";
import type { ISelectOption } from "@/ui/Select/Select";

import { changeSelectedSetNumber } from "../../actions";

import './styles.css';

export const SetSelect = () => {
  const items = useMemo(() => {
    return [
      ...downloadList.map((downloadListItem) => {
        return {
          id: downloadListItem.setNumber.toString(),
          label: downloadListItem.title,
        };
      }),
    ];
  }, []);

  const onChange = useCallback((option: ISelectOption) => {
    changeSelectedSetNumber(Number(option.id));
  }, []);

  return (
    <div className="card-picker-set-select">
      <Text weight="bold">Выберите сет:</Text>

      <Select
        items={items}
        onChange={onChange}
      />
    </div>
  );
};
