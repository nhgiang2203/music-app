import { Request, Response } from "express";
import Topic from '../../models/topic.model';
import Song from '../../models/song.model';
import Singer from '../../models/singer.model';
import User from '../../models/user.model';
import FavoriteSong from '../../models/favorite-song.model';

//[GET]/songs/:slugTopic
export const list = async (req: Request, res: Response) => {
  const topic = await Topic.findOne({
    slug: req.params.slugTopic,
    deleted: false
  });

  const songs = await Song.find({
    topicId: topic.id,
    status: 'active',
    deleted: false
  }).select("title avatar singerId like createAt slug");

  
  for (const song of songs) {
    const infoSinger = await Singer.findOne({
      _id: song.singerId,
      deleted: false
    }).select("fullName");
    song["infoSinger"] = infoSinger;
  }
  

  res.render('client/pages/songs/list', {
    pageTitle: topic.title,
    songs: songs
  });
}

//[GET]/songs/detail/:slugSong
export const detail = async (req: Request, res: Response) => {
  const song = await Song.findOne({
    slug: req.params.slugSong,
    status: "active",
    deleted: false
  });

  const singer = await Singer.findOne({
    _id: song.singerId,
    status: "active",
    deleted: false
  }).select("fullName");

  const topic = await Topic.findOne({
    _id: song.topicId,
    status: "active",
    deleted: false
  }).select("title");

  const user = await User.findOne({
    tokenUser: req.cookies.tokenUser,
    deleted: false
  });

  if(user){
    const favoriteSong = await FavoriteSong.findOne({
      userId: user.id,
      songId: song.id
    });
    song["isFavoriteSong"] = favoriteSong ? true : false;
  }

  res.render('client/pages/songs/detail', {
    pageTitle: song.title,
    song: song,
    singer: singer,
    topic: topic
  });

}

//[PATCH]/songs/like/:typeLike/:idSong
export const like = async (req: Request, res: Response) => {
  
  const typeLike: string = req.params.typeLike;
  const idSong: string = req.params.idSong;

  const song = await Song.findOne({
    _id: idSong,
    status: "active",
    deleted: false
  })

  
  const user = await User.findOne({
    tokenUser: req.cookies.tokenUser
  });

  if (user){
    let newLike;
    if (typeLike == "like"){   
      newLike = song.like.length + 1;

      await Song.updateOne({
        _id: idSong
      }, {
        $push: {like: {user_id: user.id }}
      });
    }
    
    else  {
      newLike = song.like.length - 1;

      await Song.updateOne({
        _id: idSong
      }, {
        $pull: {like: {user_id: user.id }}
      });
    }

    res.json({
      code: 200,
      message: "Thành công !",
      like: newLike,
      users: song.like
    });
  }
  
}

//[PATCH]/user/favorite/:typeFavorite/:idSong
export const favorite = async (req: Request, res: Response) => {
  const typeFavorite: string = req.params.typeFavorite;
  const idSong: string = req.params.idSong;

  const song = await Song.findOne({
    _id: idSong,
    status: "active",
    deleted: false
  })

  
  const user = await User.findOne({
    tokenUser: req.cookies.tokenUser
  });

  if (user) {
    switch(typeFavorite){
      case "favorite":
        const existFavoriteSong = await FavoriteSong.findOne({
          songId: song.id
        });
        
        if(!existFavoriteSong){
          const record = new FavoriteSong({
            userId: user.id,
            songId: song.id
          });
          await record.save();
        }
        break;
      
      case "unfavorite":
        await FavoriteSong.deleteOne({
          userId: user.id,
          songId: song.id
        });
        break;
      default:
        break;
  
    }

    res.json({
      code: 200,
      message: "Thành công !"
    });
  }
  
}

//[PATCH]/songs/listen/:idSong
export const listen = async (req: Request, res: Response) => {
  const song = await Song.findOne({
    _id: req.params.idSong
  });

  const listen: number = song.listen + 1;
  await Song.updateOne({
    _id: req.params.idSong
  }, {
    listen: listen
  });

  const newSong = await Song.findOne({
    _id: req.params.idSong
  });

  res.json({
    code: 200,
    listen: newSong.listen
  });
}