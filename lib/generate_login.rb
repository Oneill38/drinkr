string = "<!DOCTYPE html>\n<html>\n<head>\n    <title>Delivery.com Third Party Access</title>\n\n    <!-- CSS -->\n    <link rel=\"stylesheet\" href=\"//fonts.googleapis.com/css?family=Lato:300,400,700\" type=\"text/css\">\n    <link rel=\"stylesheet\" href=\"/api_assets/styles/oauth.css\" type=\"text/css\">\n\n    <!-- JS -->\n    <script src=\"//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js\"></script>\n    <script src=\"/api_assets/scripts/oauth.js\"></script>\n\n</head>\n<body>\n<div id=\"wrapper\">\n    \r\n<header>\r\n    <div id=\"logo\"></div>\r\n    <h1>Log in to your delivery.com account.</h1>\r\n</header>\r\n\r\n<div id=\"message\"></div>\r\n\r\n<div id=\"container\">\r\n    <form method=\"POST\" action=\"http://sandbox.delivery.com/third_party/authorize\" accept-charset=\"UTF-8\" id=\"login\"><input name=\"_token\" type=\"hidden\" value=\"Yad9I1DJ6WRLR8v8gvP6gyKne8NrYQtqqitP1n6V\">\t<input placeholder=\"Email address\" name=\"username\" type=\"text\" value=\"\">\t<input placeholder=\"Password\" name=\"password\" type=\"password\" value=\"\">\r\n\t<input name=\"client_id\" type=\"hidden\" value=\"NmUzODZkMzliOTJhOWI3NDk3YjdlZDM0MzdjMDliM2Zj\">\t<input name=\"redirect_uri\" type=\"hidden\" value=\"http://localhost:3000\">\t<input name=\"response_type\" type=\"hidden\" value=\"code\">\t<input name=\"scope\" type=\"hidden\" value=\"global\">\t<input name=\"state\" type=\"hidden\">\t<input name=\"key\" type=\"hidden\">    <input id=\"guest_token\" name=\"guest_token\" type=\"hidden\">\t<input name=\"owner_id\" type=\"hidden\" value=\"1\">\t<input name=\"approve\" type=\"hidden\" value=\"1\">\t<input type=\"submit\" value=\"Log in\">\t</form></div>\r\n<footer>\r\n    Don't have an account? <a href=\"/third_party/account/create?client_id=NmUzODZkMzliOTJhOWI3NDk3YjdlZDM0MzdjMDliM2Zj&redirect_uri=http://localhost:3000&response_type=code&scope=global\">Create an account</a> now.\r\n</footer>\r\n</div>\n</body>\n</html>"

puts string