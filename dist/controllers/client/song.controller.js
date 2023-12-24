"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listen = exports.favorite = exports.like = exports.detail = exports.list = void 0;
const topic_model_1 = __importDefault(require("../../models/topic.model"));
const song_model_1 = __importDefault(require("../../models/song.model"));
const singer_model_1 = __importDefault(require("../../models/singer.model"));
const user_model_1 = __importDefault(require("../../models/user.model"));
const favorite_song_model_1 = __importDefault(require("../../models/favorite-song.model"));
const list = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const topic = yield topic_model_1.default.findOne({
        slug: req.params.slugTopic,
        deleted: false
    });
    const songs = yield song_model_1.default.find({
        topicId: topic.id,
        status: 'active',
        deleted: false
    }).select("title avatar singerId like createAt slug");
    for (const song of songs) {
        const infoSinger = yield singer_model_1.default.findOne({
            _id: song.singerId,
            deleted: false
        }).select("fullName");
        song["infoSinger"] = infoSinger;
    }
    res.render('client/pages/songs/list', {
        pageTitle: topic.title,
        songs: songs
    });
});
exports.list = list;
const detail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const song = yield song_model_1.default.findOne({
        slug: req.params.slugSong,
        status: "active",
        deleted: false
    });
    const singer = yield singer_model_1.default.findOne({
        _id: song.singerId,
        status: "active",
        deleted: false
    }).select("fullName");
    const topic = yield topic_model_1.default.findOne({
        _id: song.topicId,
        status: "active",
        deleted: false
    }).select("title");
    const user = yield user_model_1.default.findOne({
        tokenUser: req.cookies.tokenUser,
        deleted: false
    });
    if (user) {
        const favoriteSong = yield favorite_song_model_1.default.findOne({
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
});
exports.detail = detail;
const like = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const typeLike = req.params.typeLike;
    const idSong = req.params.idSong;
    const song = yield song_model_1.default.findOne({
        _id: idSong,
        status: "active",
        deleted: false
    });
    const user = yield user_model_1.default.findOne({
        tokenUser: req.cookies.tokenUser
    });
    if (user) {
        let newLike;
        if (typeLike == "like") {
            newLike = song.like.length + 1;
            yield song_model_1.default.updateOne({
                _id: idSong
            }, {
                $push: { like: { user_id: user.id } }
            });
        }
        else {
            newLike = song.like.length - 1;
            yield song_model_1.default.updateOne({
                _id: idSong
            }, {
                $pull: { like: { user_id: user.id } }
            });
        }
        res.json({
            code: 200,
            message: "Thành công !",
            like: newLike,
            users: song.like
        });
    }
});
exports.like = like;
const favorite = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const typeFavorite = req.params.typeFavorite;
    const idSong = req.params.idSong;
    const song = yield song_model_1.default.findOne({
        _id: idSong,
        status: "active",
        deleted: false
    });
    const user = yield user_model_1.default.findOne({
        tokenUser: req.cookies.tokenUser
    });
    if (user) {
        switch (typeFavorite) {
            case "favorite":
                const existFavoriteSong = yield favorite_song_model_1.default.findOne({
                    songId: song.id
                });
                if (!existFavoriteSong) {
                    const record = new favorite_song_model_1.default({
                        userId: user.id,
                        songId: song.id
                    });
                    yield record.save();
                }
                break;
            case "unfavorite":
                yield favorite_song_model_1.default.deleteOne({
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
});
exports.favorite = favorite;
const listen = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const song = yield song_model_1.default.findOne({
        _id: req.params.idSong
    });
    const listen = song.listen + 1;
    yield song_model_1.default.updateOne({
        _id: req.params.idSong
    }, {
        listen: listen
    });
    const newSong = yield song_model_1.default.findOne({
        _id: req.params.idSong
    });
    res.json({
        code: 200,
        listen: newSong.listen
    });
});
exports.listen = listen;
