function REST_ROUTER(router,connection,md5) {
    var self = this;
    self.handleRoutes(router,connection,md5);
}

REST_ROUTER.prototype.handleRoutes= function(router,connection,md5) {

    router.post("/users",function(req,resp){
        var gold = req.body.data.gold;
        var silver  = req.body.data.silver;
        var diamond = req.body.data.diamond;
        var accessid = req.body.accessid;
        
        connection.query("update jewellery set gold = '"+gold+"', silver= '"+silver+"', diamond='"+diamond+"' where accessid = '"+accessid+"' ",function(err,rows){
            if(err){
                resp.json({ newssuccess: false, message: 'Update failed' });
            }else{
                resp.json({ newssuccess: true, message: 'data inserted successful' });
            }
        })
    })

    router.post("/admincodecheck",function(req,resp){
        var admincode = req.body.admincode.admin;

        connection.query("select * from admincodes where admincodes = '"+admincode+"'", function (err, data) {
			if (err) {
				resp.writeHead(200, { "Content-Type": "text/html" });
				resp.write("<html><head><title>500</title></head></html>");
			}else if(data.length == 0){
				resp.json({ newssuccess: false, message: 'Please enter valid admin access code' });
			}
			else {
				resp.json({ newssuccess: true, message: 'valid code success' });
			}
			resp.end();
		});


    })

    router.post("/signupdetails",function(req,resp){
        var email = req.body.signup.email;
        var username = req.body.signup.username;
        var password = req.body.signup.password;

        var AccessId = [username, email, password].join('_');

       connection.query("insert into jewellery (username,email,password,AccessId) values ('"+username+"', '"+email+"','"+password+"','"+AccessId+"')  ",function(err,rows){
            if(err){
                resp.writeHead(200, { "Content-Type": "text/html" });
				resp.write("<html><head><title>500</title></head></html>");
            }else{
                resp.json({ newssuccess: true, AccessId:AccessId,message: 'Signup success continue to login' });
                
            }
        }) 
    })

    router.post("/logincheck",function(req,resp){
        var username = req.body.logindata.username;
        var password = req.body.logindata.password;

       connection.query("SELECT username,password FROM jewellery Where username='" + username + "' and password = '" + password + "'",function(err,rows){
            if(err){
                resp.writeHead(200, { "Content-Type": "text/html" });
				resp.write("<html><head><title>500</title></head></html>");
            }else{
                resp.json({ newssuccess: true, message: 'login successful' });
                
            }
        }) 
    })
}

module.exports = REST_ROUTER;