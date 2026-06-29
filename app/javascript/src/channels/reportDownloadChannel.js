export const subscribeToReportDownloadChannel = ({
  consumer,
  setMessage,
  setProgress,
}) => {
  const reportDownloadSubscription = consumer.subscriptions.create(
    {
      channel: "ReportDownloadChannel",
    },
    {
      connected() {
        setMessage("Connected the Cables...");
      },
      received(data) {
        const { message, progress } = data;
        setMessage(message);
        setProgress(progress);
      },
    }
  );

  return reportDownloadSubscription;
};
