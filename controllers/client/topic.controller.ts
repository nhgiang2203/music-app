import { Request, Response } from "express";
import Topic from '../../models/topic.model';

export const index = async (req: Request, res: Response) => {
  const topics = await Topic.find({
    status: 'active',
    deleted: false
  });

  res.render('client/pages/topics/index', {
    pageTitle: "Trang chủ đề",
    topics: topics
  });
}