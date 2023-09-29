module.exports = {
    logRegister(req, res, next) {
        console.log(req.url + req.method + new Date())
        next();
    },
    sessionControl(req, res, next) {
        if (req.session.login != undefined) {
            res.locals.login = req.session.login;
            res.locals.userId = req.session.userId;
            if (req.session.tipo == 'A') {
                res.locals.adm = true
            } else if(req.session.tipo == 'T'){
                res.locals.tecnico = true
            } 
            if (req.session.tipo != 'A'){
                if (req.url =='/usuarioList' || req.url =='/categoriaCreate'){
                    res.redirect('/');
                }
            }
            next();
        }
        else if ((req.url == '/') && (req.method == 'GET')) next();
        else if ((req.url == '/login') && (req.method == 'POST')) next();
        else if((req.url =='/usuarioCreate') && (req.method == 'GET')) next();
        else res.redirect('/');
    }
};