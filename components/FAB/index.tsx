import React, { FunctionComponent, useState } from "react";
import { FAB as Fab, Portal, Provider } from "react-native-paper";

interface Props {
  actions: {
    icon: string;
    label?: string;
    onPress: () => void;
  }[];
}

export const FAB: FunctionComponent<Props> = ({ actions }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onStateChange = ({ open }: { open: boolean }) => setIsOpen(open);

  return (
    <Provider>
      <Portal>
        <Fab.Group
          style={{ position: "absolute", bottom: 15, right: 15 }}
          open={isOpen}
          icon="plus"
          onStateChange={onStateChange}
          actions={actions}
          visible
        />
      </Portal>
    </Provider>
  );
};
