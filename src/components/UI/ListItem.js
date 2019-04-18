import React from "react";
import { List } from "react-native-paper";
import CustomIcon from "./CustomIcon";

const ListItem = myProps => {
  return (
    <List.Item
      title={myProps.title}
      description={myProps.description}
      left={props => (
        <List.Icon
          {...props}
          icon={() => (
            <CustomIcon
              icon={myProps.icon}
              size={myProps.size}
              color={myProps.color}
            />
          )}
        />
      )}
    />
  );
};

export default ListItem;
