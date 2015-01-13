var Users = require('../models/users').Users;

exports.index=function(reg, res){
	res.render('reg');
}

exports.send = function(req, res){
	
	var username = req.body.username;
	var password = req.body.password;
	
	Users.authorize(username, password, function(err, user){
		if(err){
			res.redirect('/reg');// error
			console.log(err);
			
		
		}else{
			console.log('user_id: '+user._id);
			req.session.user = user._id;
			console.log(req.session.user);
			res.redirect('/'); //регистрация успешна
		}
		
	});


	
	
	/*var users = new Users({
	username: username,
	password: password
	});
	
	users.save(function(err, user, affcted){
		console.log(arguments);
		res.redirect('/');  //после регистрации перход куда-то
	}); */
}

exports.logout = function(req, res){
	req.session.destroy();
	res.redirect('/');
}