const fUtil = require("../misc/file");
const stuff = require("./info");
const http = require("http");

function toAttrString(table) {
	return typeof table == "object"
		? Object.keys(table)
				.filter((key) => table[key] !== null)
				.map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(table[key])}`)
				.join("&")
		: table.replace(/"/g, '\\"');
}
function toParamString(table) {
	return Object.keys(table)
		.map((key) => `<param name="${key}" value="${toAttrString(table[key])}">`)
		.join(" ");
}
function toObjectString(attrs, params) {
	return `<object id="obj" ${Object.keys(attrs)
		.map((key) => `${key}="${attrs[key].replace(/"/g, '\\"')}"`)
		.join(" ")}>${toParamString(params)}</object>`;
}

/**
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 * @param {import("url").UrlWithParsedQuery} url
 * @returns {boolean}
 */
module.exports = function (req, res, url) {
	if (req.method != "GET") return;
	const query = url.query;

	var attrs, params, title;
	switch (url.pathname) {
		case "/character_creator/new_char/": {
			title = "Character Creator";
			attrs = {
				data: process.env.SWF_URL + "/cc.swf", // data: 'cc.swf',
				type: "application/x-shockwave-flash",
				id: "char_creator",
				width: "960",
				height: "600",
			};
			params = {
				flashvars: {
					apiserver: "/",
					storePath: process.env.STORE_URL + "/<store>",
					clientThemePath: process.env.CLIENT_URL + "/<client_theme>",
					original_asset_id: query["id"] || null,
					themeId: "business",
					ut: 60,
					bs: "default",
					appCode: "go",
					page: "",
					siteId: "go",
					m_mode: "school",
					isLogin: "Y",
					isEmbed: 1,
					ctc: "go",
					tlang: "en_US",
				},
				allowScriptAccess: "always",
				movie: process.env.SWF_URL + "/cc.swf", // 'http://localhost/cc.swf'
			};
			break;
		}
		default:
			return;
	}
	res.setHeader("Content-Type", "text/html; charset=UTF-8");
	Object.assign(params.flashvars, query);
	res.end(`
	<head>
		<script>document.title='${title}'</script>
<link rel="stylesheet" type="text/css" href="/html/css/common_combined.css.gz.css">
<link rel="stylesheet" href="https://goanimateforschools.github.io/fonts/schoolfont.css">
<link rel="stylesheet" href="/html/css/cc.css.gz.css">
<script src="/html/js/common_combined.js.gz.js"></script>
</head>
<body style="margin:0px">
<nav class="navbar site-nav" role="navigation">
    <div class="container">
        <div class="navbar-header">
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target=".navbar-ex1-collapse">
                <span class="sr-only">Toggle navigation</span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
              </button>
            <a class="navbar-brand" href="/dashboard/videos" title="GoAnimate For Schools Remastered">
                <img src="/html/img/logo.png" alt="GoAnimate For Schools Remastered">
            </a>
        </div>

        <ul class="nav site-nav-alert-nav hidden-xs">
            <li>
                <a href="/notifications.html" title="Notifications"><span class="glyph-pro glyph-bell"></a>
            </li>
        </ul>
        <div class="collapse navbar-collapse navbar-ex1-collapse">
            <ul class="nav navbar-nav navbar-right">
                <li class="dropdown">
                    <a class="dropdown-toggle" href="#" data-toggle="dropdown">Your Account <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="/student.html">Dashboard</a></li>
                        <li><a href="/dashboard/videos.html">Your Videos</a></li>
                        <li class="divider"></li>
                        <li><a href="/account">Account Settings</a></li>
                        <li><a href="/profile/you.html">Your Profile</a></li>
                        <li class="divider"></li>
                        <li><a class="logout-link" href="/logoff.html">Logout</a></li>
                    </ul>
                </li><li class="dropdown">
                    <a class="dropdown-toggle" href="#" data-toggle="dropdown">Explore <span class="caret"></span></a>
                    <ul class="dropdown-menu">
                        <li><a href="/students.html">Students</a></li>
                        <li><a href="/teachers.html">Teachers</a></li>
                        <li><a href="/videos.html">Videos</a></li>
                        <li><a href="/public_faq.html">FAQ</a></li>
                    </ul>
                </li>
                <li>
				<a class="hidden-sm hidden-md hidden-lg" href="/html/videomaker.html">Make a Video</a>
				<span class="site-nav-btn hidden-xs"><a class="btn btn-orange" href="/html/videomaker.html">Make a Video</a></span>
                </li>
            </ul>
        </div>
    </div>
</nav>
<div class="container container-cc">


        <ul class="breadcrumb">
            <li><a href="/c/create">Make a video</a></li>
            <li><a href="/character_creator/">Your Characters</a></li>
            <li class="active">Create a new character</li>
        </ul>

<div>
    <div id="char_creator_client" align="center">${toObjectString(attrs, params)}
</div>
<script>lashvars=${JSON.stringify(
			params.flashvars
		)}</script>
</div>
</div>		
<footer class="site-footer hidden-print">
    <div class="container">
        <div class="row site-footer-nav">
            <div class="col-sm-3">
                <div class="site-footer-nav-col">
                    <h5>About GoAnimate</h5>
                    <ul class="list-unstyled">
                        <li><a href="https://goanimateforschools.github.io/about">Who We Are</a></li>
                        <li><a href="https://goanimateforschools.github.io/contactus">Contact Us</a></li>
                        <li><a href="https://goanimateforschools.github.io/video-maker-tips">Blog</a></li>
                        <li><a href="https://goanimateforschools.github.io/press">Press</a></li>
                    </ul>
                </div>
            </div>

            <div class="col-sm-3">
                <div class="site-footer-nav-col">
                    <h5>GoAnimate Solutions</h5>
                    <ul class="list-unstyled">
                        <li><a href="https://goanimateforschools.github.io/" target="_blank">GoAnimate for Schools</a></li>
                        <li class="hidden-xs">&nbsp;</li>
                        <li class="hidden-xs">&nbsp;</li>
                        <li class="hidden-xs">&nbsp;</li>
                    </ul>
                </div>
            </div>

            <div class="col-sm-3">
                <div class="site-footer-nav-col">
                    <h5>Usage Guidelines</h5>
                    <ul class="list-unstyled">
                        <li><a href="https://goanimateforschools.github.io/termsofuse">Terms of Service</a></li>
                        <li><a href="https://goanimateforschools.github.io/privacy">Privacy Policy</a></li>
                        <li class="hidden-xs">&nbsp;</li>
                        <li class="hidden-xs">&nbsp;</li>
                    </ul>
                </div>
            </div>

            <div class="col-sm-3">
                <div class="site-footer-nav-col">
                    <h5>Getting Help</h5>
                    <ul class="list-unstyled">
                        <li><a href="https://goanimateforschools.github.io/blog">Educator Experiences</a></li>
                        <li><a href="https://goanimateforschools.github.io/hc/en-us">Help Center</a></li>
                        <li class="hidden-xs">&nbsp;</li>
                        <li class="hidden-xs">&nbsp;</li>
                    </ul>
                </div>
            </div>
        </div>
        <hr>

        <div class="row site-footer-copyright">
            <div class="col-sm-6">
                <div class="site-footer-socials-container">
                    Follow us on:
                    <ul class="site-footer-socials clearfix">
                        <li><a class="facebook" href="https://www.facebook.com/GoAnimateInc">Facebook</a></li>
                        <li><a class="twitter" href="https://twitter.com/Go4Schools">Twitter</a></li>
                        <li><a class="linkedin" href="https://www.linkedin.com/company/goanimate">Linked In</a></li>
                        <li><a class="gplus" href="https://plus.google.com/+goanimate">Google+</a></li>
                        <li><a class="youtube" href="https://www.youtube.com/user/GoAnimate">YouTube</a></li>
                    </ul>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="pull-right">
                    <img src="https://josephcrosmanplays532.github.io/static/477/go/img/footer/logo_amazon.png" alt="AWS Partner Network">
                    &nbsp;&nbsp;&nbsp;
                    GoAnimate Revival © 2021
                </div>
            </div>
        </div>

    </div>
</footer>


<div id="studio_container" style="display: none;">
    <div id="studio_holder"><!-- Full Screen Studio -->
        <div style="top: 50%; position: relative;">
            You can't use GoAnimate because Flash might be disabled. <a href="https://get.adobe.com/flashplayer/">Enable Flash</a>.
        </div>
    </div>
</div>${stuff.pages[url.pathname] || ""}`
	);
	return true;
};
