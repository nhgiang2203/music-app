import { Request, Response, NextFunction } from 'express';

export const registerPost = (req: Request, res: Response, next: NextFunction) => {
    if(!req.body.fullName){
        req.flash('error', 'Vui lòng nhập họ tên!');
        res.redirect('back');
        return;
    }
    if(!req.body.email){
        req.flash('error', 'Vui lòng nhập email!');
        res.redirect('back');
        return;
    }
    if(!req.body.password){
        req.flash('error', 'Vui lòng nhập mật khẩu!');
        res.redirect('back');
        return;
    }

    next();
}

export const loginPost = (req: Request, res: Response, next: NextFunction) => {
    if(!req.body.email){
        req.flash('error', 'Vui lòng nhập email!');
        res.redirect('back');
        return;
    }
    if(!req.body.password){
        req.flash('error', 'Vui lòng nhập mật khẩu!');
        res.redirect('back');
        return;
    }

    next();
}

export const forgotPasswordPost= (req: Request, res: Response, next: NextFunction) => {
    if(!req.body.email){
        req.flash('error', 'Vui lòng nhập email!');
        res.redirect('back');
        return;
    }

    next();
}

export const resetPasswordPost= (req: Request, res: Response, next: NextFunction) => {
    if(!req.body.password){
        req.flash('error', 'Vui lòng nhập mật khẩu !');
        res.redirect('back');
        return;
    }
    if(!req.body.confirmPassword){
        req.flash('error', 'Vui lòng xác nhận mật khẩu !');
        res.redirect('back');
        return;
    }
    if(req.body.password != req.body.confirmPassword){
        req.flash('error', 'Mật khẩu không khớp !');
        res.redirect('back');
        return;
    }
    next();
}