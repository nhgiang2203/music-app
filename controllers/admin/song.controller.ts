import { Request, Response } from "express";
import Song from "../../models/song.model";
import Topic from "../../models/topic.model";
import Singer from "../../models/singer.model";
import { systemConfig } from "../../config/config";

//[GET]/admin/songs/
export const index = async (req: Request, res: Response) => {
  const songs = await Song.find({
    deleted: false
  });

  res.render('admin/pages/songs/index', {
    pageTitle: "Quản lí bài hát",
    songs: songs
  });
}

//[GET]/admin/create
export const create = async (req: Request, res: Response) => {
  const topics = await Topic.find({
    deleted: false
  }).select("title");
  
  const singers = await Singer.find({
    deleted: false
  }).select("fullName");

  res.render('admin/pages/songs/create', {
    pageTitle: "Thêm mới bài hát",
    topics: topics,
    singers: singers
  });
};

//[POST]/admin/songs/create
export const createPost = async (req: Request, res: Response) => {

  let avatar = "";
  let audio = "";

  if(req.body.avatar){
    avatar = req.body.avatar[0];
  }
  if(req.body.audio){
    audio = req.body.audio[0];
  }

  const dataSong = {
    title: req.body.title,
    topicId: req.body.topicId,
    singerId: req.body.singerId,
    avatar: avatar,
    audio: audio,
    lyrics: req.body.lyrics,
    description: req.body.description,
    status: req.body.status
  };

  const newSong = new Song(dataSong);
  await newSong.save();

  res.redirect(`/${systemConfig.prefixAdmin}/songs`);
}

//[GET]/admin/songs/edit/:id
export const edit = async (req: Request, res: Response) => {
  const song = await Song.findOne({
    _id: req.params.id,
    deleted: false
  });
  const topics = await Topic.find({
    deleted: false
  }).select("title");
  const singers = await Singer.find({
    deleted: false
  }).select("fullName");

  res.render("admin/pages/songs/edit", {
    pageTitle: "Chỉnh sửa bài hát",
    song: song,
    topics: topics,
    singers: singers
  });
}

//[PATCH]/admin/songs/edit/:id
export const editPatch = async (req: Request, res: Response) => {

  try {
    const dataSong = {
      title: req.body.title,
      topicId: req.body.topicId,
      singerId: req.body.singerId,
      lyrics: req.body.lyrics,
      description: req.body.description,
      status: req.body.status
    };
  
    if(req.body.avatar){
      dataSong["avatar"] = req.body.avatar[0];
    }
    if(req.body.audio){
      dataSong["audio"] = req.body.audio[0];
    }
  
    await Song.updateOne({
      _id: req.params.id
    }, dataSong);
    res.redirect("back");
  } catch (error){
    res.redirect(`${systemConfig.prefixAdmin}/songs`);
  }
  

  
}