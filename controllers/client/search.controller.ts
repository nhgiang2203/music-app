import { Request, Response } from "express";
import Topic from '../../models/topic.model';
import Song from '../../models/song.model';
import Singer from '../../models/singer.model';
import User from '../../models/user.model';
import FavoriteSong from '../../models/favorite-song.model';
import { convertToSlug } from "../../helpers/conertToSlug";

//[GET]/search/result
export const result = async (req: Request, res: Response) => {
  const keyword: string = `${req.query.keyword}`;
  const type: string = `${req.params.type}`;

  let newSongs = [];
  if(keyword){
    const keywordRegex = new RegExp(keyword, 'i');
    const unicodeSlug = convertToSlug(keyword);
    const slugRegex = new RegExp(unicodeSlug, 'i');

    const songs = await Song.find({
      $or: [
        { title: keywordRegex },
        { slug: slugRegex }
      ]
    });

    if(songs.length > 0){
      for (const song of songs) {
        const infoSinger = await Singer.findOne({
          _id: song.singerId
        });

        newSongs.push({
          id: song.id,
          title: song.title,
          avatar: song.avatar,
          slug: song.slug,
          like: song.like.length,
          infoSinger: {
            fullName: infoSinger.fullName
          }
        });
      }
    }

    switch(type){
      case "result":
        res.render('client/pages/search/result', {
          pageTitle: `Kết quả ${keyword}`,
          keyword: keyword,
          songs: newSongs
        });
        break;

      case "suggest":
        res.json({
          code: 200,
          songs: newSongs
        });
        break;
      default:
        res.json({
          code: 400,
          message: "Lỗi!"
        });
        break;
    }
  }

  
}