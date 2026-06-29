import Logger from "js-logger";

import postsApi from "../apis/posts";

const pollDownload = slug => {
  const interval = setInterval(async () => {
    try {
      const response = await postsApi.downloadReport(slug);

      const url = window.URL.createObjectURL(response.data);

      const link = document.createElement("a");

      link.href = url;
      link.download = `${slug}.pdf`;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

      clearInterval(interval);
    } catch (error) {
      Logger.error(error);
    }
  }, 2000);
};

export default pollDownload;
