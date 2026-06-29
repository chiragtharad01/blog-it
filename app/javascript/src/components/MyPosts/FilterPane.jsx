import React from "react";

import { Pane, Typography } from "@bigbinary/neetoui";
import { Form, Button as FormikButton } from "@bigbinary/neetoui/formik";
import { useTranslation } from "react-i18next";

import { FILTER_INITIAL_VALUES } from "./constants";
import FilterFormContent from "./FilterFormContent";

import useFilterStore from "../../stores/useFilterStore";

const FilterPane = ({ isPaneOpen, onClose }) => {
  const { t } = useTranslation();
  const { filters, setFilters } = useFilterStore();

  return (
    <Pane className="w-96" isOpen={isPaneOpen} onClose={onClose}>
      <Pane.Header>
        <Typography style="h2" weight="semibold">
          {t("mypost.pane.header")}
        </Typography>
      </Pane.Header>
      <Form
        className="w-full"
        formikProps={{
          initialValues: filters,
          onSubmit: values => {
            setFilters(values);
            onClose();
          },
        }}
      >
        {({ resetForm }) => (
          <>
            <Pane.Body className="w-full">
              <FilterFormContent />
            </Pane.Body>
            <Pane.Footer className="flex items-center gap-x-2">
              <FormikButton label={t("done")} type="submit" />
              <FormikButton
                disabled={false}
                label={t("clearFilters")}
                style="text"
                onClick={() => {
                  resetForm({ values: FILTER_INITIAL_VALUES });
                  setFilters(FILTER_INITIAL_VALUES);
                  onClose();
                }}
              />
            </Pane.Footer>
          </>
        )}
      </Form>
    </Pane>
  );
};

export default FilterPane;
