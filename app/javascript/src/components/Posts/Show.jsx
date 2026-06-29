import React, { useEffect, useState } from "react";

import { Download, Edit } from "@bigbinary/neeto-icons";
import { Avatar, Button, Typography } from "@bigbinary/neetoui";
import Logger from "js-logger";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

import DownloadReportModal from "./DownloadReportModal";

import createConsumer from "../../channels/consumer";
import { subscribeToReportDownloadChannel } from "../../channels/reportDownloadChannel";
import { useCreateReport, usePost } from "../../hooks/reactQuery/usePostsApi";
import routes from "../../routes";
import pollDownload from "../../utils/pollDownload";
import { Container, PageLoader } from "../commons";
import { formatDate } from "../utils";

const ShowPost = () => {
  const { slug } = useParams();

  const consumer = createConsumer();

  const createReport = useCreateReport();

  const [isReportGenerating, setIsReportGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");

  const { data: { data: { post = {} } = {} } = {}, isLoading } = usePost(slug);

  const handleDownload = async () => {
    try {
      setIsReportGenerating(true);
      setProgress(0);
      setMessage("");

      await createReport.mutateAsync(slug);
    } catch (error) {
      Logger.error(error);
      setIsReportGenerating(false);
    }
  };

  useEffect(() => {
    const subscription = subscribeToReportDownloadChannel({
      consumer,
      setMessage,
      setProgress,
    });

    return () => {
      subscription.unsubscribe();
      consumer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (progress !== 100) return;

    const download = async () => {
      try {
        await pollDownload(slug);
      } catch (error) {
        Logger.error(error);
      } finally {
        setIsReportGenerating(false);
      }
    };

    download();
  }, [progress]);

  if (isLoading) {
    return (
      <Container>
        <PageLoader />
      </Container>
    );
  }

  return (
    <Container>
      <div className="mt-16 px-6">
        <div className="flex gap-2">
          {post.categories?.map(category => (
            <Typography
              className="neeto-ui-rounded-full min-w-min bg-green-100 px-3 py-1"
              key={category.slug}
              style="nano"
            >
              {category.name}
            </Typography>
          ))}
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <Typography className="text-3xl" style="h2" weight="bold">
                {post.title}
              </Typography>
              {post.status === "draft" && (
                <Typography
                  className="neeto-ui-rounded-full h-min min-w-min border border-red-500 px-3 py-0 text-red-500"
                  style="nano"
                >
                  {post.status}
                </Typography>
              )}
            </div>
            <div className="flex items-center">
              <Button
                className="text-black"
                disabled={isReportGenerating}
                icon={Download}
                loading={isReportGenerating}
                style="link"
                onClick={handleDownload}
              />
              <Button
                className="text-black"
                icon={Edit}
                style="link"
                to={routes.posts.edit(slug)}
              />
            </div>
          </div>
          <div className="flex gap-4">
            <Avatar
              user={{
                name: post.user.name,
              }}
            />
            <div>
              <Typography style="h6">{post.user.name}</Typography>
              <Typography style="body3">
                {formatDate(post.updated_at)}
              </Typography>
            </div>
          </div>
          <Typography style="body1">{post.description}</Typography>
        </div>
      </div>
      <DownloadReportModal
        isOpen={isReportGenerating}
        message={message}
        progress={progress}
      />
    </Container>
  );
};

export default ShowPost;
