import React from "react";

import { Modal, ProgressBar, Typography } from "@bigbinary/neetoui";
import { useTranslation } from "react-i18next";

const DownloadReportModal = ({
  isOpen,
  progress,
  message,
  isDownloading,
  onClose,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      closeOnOutsideClick={false}
      isOpen={isOpen}
      onClose={isDownloading ? undefined : onClose}
    >
      <Modal.Header>
        <Typography style="h2" weight="semibold">
          {t("post.report.title")}
        </Typography>
      </Modal.Header>
      <Modal.Body>
        <div className="flex flex-col gap-6 py-4">
          <Typography style="body1">{message}</Typography>
          <ProgressBar progressPercentage={progress} progressValue={progress} />
          <Typography className="text-right text-gray-500" style="body3">
            {progress}%
          </Typography>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default DownloadReportModal;
