import React from "react";
import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";

interface IProps {
  modalVisible: boolean;
  hideModal: () => void;
  children: React.ReactNode;
  top?: string | number;
  style?: StyleProp<ViewStyle>;
}

export const PopupModal = (props: IProps) => {
  const { modalVisible, hideModal, children, top, style } = props;
  return (
    <View>
      <Modal
        visible={modalVisible}
        transparent={true}
        onRequestClose={hideModal}
        animationType="fade"
      >
        <TouchableWithoutFeedback onPress={hideModal}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        <View style={[styles.modalContent, { top: top || "40%" }, style]}>
          {children}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContent: {
    // flex: 1,
    justifyContent: "center",
    margin: "15%",
    alignItems: "center",
    backgroundColor: "rgba(242, 242, 242, 0.9)",
    borderRadius: 14,
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
