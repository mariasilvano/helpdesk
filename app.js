const middlewares = require('./middlewares/middlewares')
const routes = require('./routers/route');
const handlebars = require('express-handlebars');
const express = require('express');
const app = express();
const path = require('path');
var session = require('express-session');

app.use(session({secret: 'textosecreto',
    cookie:{ maxAge:30 *60*1000}
}))

app.use(express.static(path.join(__dirname, 'public')));
app.use(middlewares.logRegister, middlewares.sessionControl )


app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main',
    helpers: {
        if: function (conditional, options) {
            if (conditional) {
                return options.fn(this);
            } else {
                return options.inverse(this);
            }
        },
        switch: function (value, options) {
            this._switch_value_ = value;
            const html = options.fn(this);
            delete this._switch_value_;
            return html;
        },
        case: function (value, options) {
            if (value === this._switch_value_) {
                return options.fn(this);
            }
        }
    }
}));
app.set('view engine','handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

app.listen(8082, function(){
        console.log("Servidor no http://localhost:8082")
});