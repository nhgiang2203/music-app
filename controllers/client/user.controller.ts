import { Request, Response } from "express"
import User from '../../models/user.model';
import md5 from 'md5';

//[GET]/user/register
export const register = (req: Request, res: Response) => {
  res.render('client/pages/user/register', {
    pageTitle: 'Trang đăng kí'
  });
}

//[POST]/user/register
export const registerPost = async (req: Request, res: Response) => {
  // try {
    const emailExist = await User.findOne({
      email: req.body.email
    });

  
    if(emailExist){
      req.flash('error', 'Email đã tồn tại !');
      res.redirect('back');
      return;
    }
  
    req.body.password = md5(req.body.password);
    const user = new User(req.body);
    user.save();
  
    res.cookie("tokenUser", user.tokenUser);
    res.redirect("/topics");
  // } catch(error){
  //   res.redirect("/topics/");
  // }
}

//[GET]/user/login
export const login = (req: Request, res: Response) => {
  res.render('client/pages/user/login', {
    pageTitle: 'Đăng nhập'
  });
}

//[POST]/user/login
export const loginPost = async (req: Request, res: Response) => {
  const user = await User.findOne({
    email: req.body.email,
    deleted: false
  });
  if(!user) {
    req.flash('error', 'Email không tồn tại !');
    res.redirect('back');
    return;
  }
  if(md5(req.body.password) != user.password){
    req.flash('error', 'Mật khẩu không đúng !');
    res.redirect('back');
    return;
  }
  if(user.status == 'inactive'){
    req.flash('error', 'Tài khoản đã bị khóa !');
    res.redirect('back');
    return;
  }
  res.cookie("tokenUser", user.tokenUser);
  res.redirect("/topics");
}

//[GET]/user/logout
export const logout = (req: Request, res: Response) => {
  res.clearCookie("tokenUser");
  res.redirect("/topics");
}