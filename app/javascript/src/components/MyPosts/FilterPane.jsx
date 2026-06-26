import React from "react";

import { Button, Pane, Typography } from "@bigbinary/neetoui";
import { Form, Input, Select } from "@bigbinary/neetoui/formik";
import { useTranslation } from "react-i18next";

import { FILTER_INITIAL_VALUES } from "./constants";

const FilterPane = ({ isPaneOpen, onClose, categories }) => {
  const categoryOptions = categories.map(category => ({
    value: category.id,
    label: category.name,
  }));
  const { t } = useTranslation();

  return (
    <Pane
      className="w-96"
      isOpen={isPaneOpen}
      // initialFocusRef={{
      //   current: "[Circular]",
      // }}
      onClose={onClose}
    >
      <Pane.Header>
        <Typography style="h2" weight="semibold">
          {t("mypost.pane.header")}
        </Typography>
      </Pane.Header>
      <Pane.Body>
        <Form
          className="w-full"
          formikProps={{
            initialValues: FILTER_INITIAL_VALUES,
            // validationSchema: SIGNUP_FORM_VALIDATION_SCHEMA,
            // onSubmit: handleSubmit,
          }}
        >
          <div className="neeto-ui-rounded flex h-full  flex-col items-start justify-center gap-2 px-2 py-8">
            <div className="flex w-full flex-col gap-6">
              <Input
                label={t("mypost.pane.inputTitle")}
                name="title"
                placeholder={t("mypost.pane.inputTitlePlaceholder")}
              />
              <Select
                isMulti
                isSearchable
                label={t("mypost.pane.inputCategory")}
                name="category_ids"
                options={categoryOptions}
                placeholder={t("mypost.pane.inputCategoryPlaceholder")}
              />
              <Select
                isSearchable
                label={t("mypost.pane.status")}
                name="category_ids"
                options={categoryOptions}
              />
            </div>
          </div>
        </Form>
      </Pane.Body>
      <Pane.Footer className="flex items-center gap-x-2">
        <Button label="Continue" onClick={() => {}} />
        <Button label="Cancel" style="text" onClick={() => {}} />
      </Pane.Footer>
    </Pane>
  );
};

export default FilterPane;
