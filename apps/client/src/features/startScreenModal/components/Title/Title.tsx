import { Text } from '@/ui/Text/Text';

import './styles.css';

export const Title = () => {
  // @ts-ignore
  const version = _BUILD_INFO_.version;

  return (
    <div className="start-screen-modal-title">
      <div>
        <Text
          size="lg"
          color="violett"
          weight="bold"
        >
          Berserk Geroi
        </Text>

        <Text>{'\u00A0'}</Text>

        <Text
          size="lg"
          color="purple"
          weight="bold"
        >
          GYM
        </Text>
      </div>

      <div>
        <Text
          size="sm"
          color="black"
        >
          {`версия ${version}`}
        </Text>
      </div>
    </div>
  );
};
