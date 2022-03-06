import * as React from "react";
import { Dialog, DialogType, DialogFooter } from "@fluentui/react/lib/Dialog";
import { PrimaryButton, DefaultButton } from "@fluentui/react/lib/Button";
import { useBoolean } from "@fluentui/react-hooks";

const modelProps = {
  isBlocking: false,
  styles: { main: { maxWidth: 450 } },
};
const dialogContentProps = {
  type: DialogType.largeHeader,
  title: "All emails together",
  subText:
    "Your Inbox has changed. No longer does it include favorites, it is a singular destination for your emails.",
};

export const RestaurantDialog = ({ restaurantID, show }) => {
  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);

  return (
    <>
      <Dialog
        hidden={show}
        onDismiss={toggleHideDialog}
        dialogContentProps={dialogContentProps}
        modalProps={modelProps}
      >
        <DialogFooter>
          <PrimaryButton onClick={show} text="Save" />
          <DefaultButton onClick={show} text="Cancel" />
        </DialogFooter>
      </Dialog>
    </>
  );
};
