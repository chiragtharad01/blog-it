import React from "react";

import { Modal, Typography } from "@bigbinary/neetoui";
import { Form, Input, Button } from "@bigbinary/neetoui/formik";
import Logger from "js-logger";
import { useTranslation } from "react-i18next";

import { CATEGORY_VALIDATION_SCHEMA } from "./constants";

import { useCreateCategory } from "../../hooks/reactQuery/useCategoriesApi";

const CreateCategoryModal = ({ isModalOpen, setIsModalOpen }) => {
  const { t } = useTranslation();
  const createCategory = useCreateCategory();
  const handleSubmit = async values => {
    try {
      await createCategory.mutateAsync(values);
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
        <Typography style="h2">{t("categories.modal.title")}</Typography>
      </Modal.Header>
      <Modal.Body className="space-y-2">
        <Form
          className="w-full"
          formikProps={{
            initialValues: { name: "" },
            validationSchema: CATEGORY_VALIDATION_SCHEMA,
            onSubmit: handleSubmit,
          }}
        >
          <div className="neeto-ui-rounded flex h-min w-full flex-col items-start justify-between gap-2 ">
            <div className="flex w-full flex-col gap-6">
              <Input
                required
                className="w-full"
                label={t("categories.modal.enterTitle")}
                name="name"
                placeholder={t("categories.modal.enterTitlePlaceholder")}
              />
            </div>
            <div className="flex w-full justify-end gap-2">
              <Button
                className="w-20"
                label={t("categories.modal.cancel")}
                style="tertiary"
                type="cancel"
              />
              <Button
                className="w-20 bg-black"
                label={t("submit")}
                type="submit"
              />
            </div>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default CreateCategoryModal;
