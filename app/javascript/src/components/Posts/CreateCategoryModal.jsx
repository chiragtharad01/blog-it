import React from "react";

import { Modal, Typography } from "@bigbinary/neetoui";
import { Form, Input, Button } from "@bigbinary/neetoui/formik";
import Logger from "js-logger";

import { CATEGORY_VALIDATION_SCHEMA } from "./constants";

import categoriesApi from "../../apis/categories";

const CreateCategoryModal = ({ isModalOpen, setIsModalOpen }) => {
  const handleSubmit = async values => {
    try {
      await categoriesApi.create(values);
    } catch (error) {
      Logger.error(error);
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <Modal
      blockScrollOnMount
      closeButton
      closeOnEsc
      closeOnOutsideClick
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
    >
      <Modal.Header>
        <Typography style="h2">New category</Typography>
      </Modal.Header>
      <Modal.Body className="space-y-2">
        <Form
          formikProps={{
            initialValues: { name: "" },
            validationSchema: CATEGORY_VALIDATION_SCHEMA,
            onSubmit: handleSubmit,
          }}
        >
          <div className="neeto-ui-rounded flex h-min w-64 flex-col items-start justify-between gap-2 ">
            <div className="flex w-full flex-col gap-6">
              <Input
                required
                label="Category title"
                name="name"
                placeholder="Enter title"
              />
            </div>
            <div className="flex w-full justify-end gap-2">
              <Button
                className="w-20"
                label="Cancel"
                style="tertiary"
                type="cancel"
              />
              <Button className="w-20 bg-black" label="Submit" type="submit" />
            </div>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateCategoryModal;
