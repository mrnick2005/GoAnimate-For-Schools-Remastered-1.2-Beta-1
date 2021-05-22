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
		case "/video/": {
			title = "Player";
			attrs = {
				data: process.env.SWF_URL + "/player.swf",
				type: "application/x-shockwave-flash",
				width: "100%",
				height: "100%",
			};
			params = {
				flashvars: {
					apiserver: "/",
					storePath: process.env.STORE_URL + "/<store>",
					ut: 60,
					autostart: 1,
					isWide: 1,
					clientThemePath: process.env.CLIENT_URL + "/<client_theme>",
				},
				allowScriptAccess: "always",
				allowFullScreen: "true",
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
	<script>document.title='${title}',flashvars=${JSON.stringify(
			params.flashvars
		)}</script>
		<link rel="stylesheet" type="text/css" href="/html/css/common_combined.css.gz.css">
<link rel="stylesheet" href="https://goanimateforschools.github.io/fonts/schoolfont.css">
<link rel="stylesheet" href="/html/css/video.css.gz.css">
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
		<div id="video-page">
    <input type="hidden" name="ct" value="ZGuIheohj78KogqqFMVEXQI7GASGGcS1dC1znbdZzlmaL96D6rGzqkdpEZ6YLctCdKfwSELdjFOjhwPI2Nflra0ZYdoejDwiNMviXYgFgvpZlbs5uzh6vT2Wjhfwxd_dHWNLq1QyRYEy3N99m+bD6BKqofDaJfcCemDYIm1LKlIBmZCzvyQudYFVBT7pWBPc9ZOLTvvI+ynHo1xcbKMZQatab_0Q6zyozNZ52ZrLUJ8ZWYLLe4">
    <div class="background">
        <div class="thumbnail-container" style="background-image:url('http://localhost/movie_thumbs/m-6.png')">
            <div class="thumbnail-overlay"></div>
        </div>
        <div class="container">
            <div class="main">
                <div class="video-player-viewport using-flash" style="background-image: url('http://web.archive.org/web/20181123104749im_/https://assets.vyond.com/v1/get/fs.goanimate.com/files/thumbnails/movie/2724/12296724/29109915L.jpg?enc_type=sse_c&amp;expires=1536007313&amp;sec_key_id=2034338&amp;signature=2ba191706429b6c63b86296c86862190f54a3917b195639fb28d60fed027ed7c');">
                                <div class="video-player-wrapper embed-responsive embed-responsive-16by9">${toObjectString(attrs,params)}
                                </div>
                                <div class="video-info hidden-xs" data-video-id="07m3MiyKSl-w" data-is-owner="yes" data-owner="0aWj-HdFtJ5c" data-duration="4" style="display: block;">
                                    <div class="video-info-content">
                                        <div class="editable">
                                            <div class="non-edit-fields">
                                                <a class="edit-video-info" data-action="edit-video-info">Edit video info</a>
                                                <h1 class="title">Test</h1>
                                                <p class="description"></p>
                                            </div>
                                        </div>
                                        <p class="creator">Created by <a href="http://web.archive.org/web/20181123104749/https://ga.vyond.com/user/0aWj-HdFtJ5c" title="WolfychuAndBeck">U</a></p>
                                        <p class="status">
                                            <span class="js-show-revision-history" style="cursor: pointer;">
                                                                                                Last modified: 2 September 2021 - 6:69pm                                                                                        </span>
                                        </p>
                                    </div>
                                    <form id="movie-setting-form" class="edit-fields">
                                        <div class="form-group">
                                            <input class="form-control" type="text" name="title" placeholder="Title" value="Isabelle from animal crossing tests out poopanim8" maxlength="50">
                                        </div>
                                        <div class="form-group">
                                            <textarea class="form-control" name="desc" placeholder="Description" maxlength="255"></textarea>
                                        </div>
                                        <div class="form-group text-right">
                                            <input type="hidden" name="enc_mid" value="07m3MiyKSl-w">
                                            <button class="btn btn-orange" type="submit">Done</button>
                                        </div>
                                    </form>
                                </div>
                                <div class="video-loading" id="video-loading" style="display: none;">
                                    <div class="video-loading-message"></div>
                                </div>
                                <div id="player-control" class="non-playing" style="display: block;">
                                    <div class="seek-bar-container">
                                        <div class="seek-bar">
                                            <div class="buffered-bar"></div>
                                            <div class="hover-bar"></div>
                                            <div class="played-bar"></div>
                                            <div class="time-tooltip"></div>
                                        </div>
                                    </div>
                                    <div class="button-container">
                                        <div class="playback-button paused">
                                            <div class="play-button"></div>
                                            <div class="pause-button"></div>
                                            <div class="replay-button"></div>
                                        </div>
                                        <div class="progress-time-container">
                                            <div class="progress-time">00:00 / 00:04</div>
                                        </div>
                                        <div class="controls-right">
                                            <div class="volume-container">
                                                <div class="volume-control">
                                                    <div class="volume-icon">
                                                        <div class="volume-up-icon"></div>
                                                        <div class="volume-mute-icon"></div>
                                                    </div>
                                                    <div class="volume-slider">
                                                        <div class="slider-track">
                                                            <div class="track-value-bar"></div>
                                                        </div>
                                                        <div class="slider-thumb"></div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="fullscreen-container">
                                                <div class="fullscreen-button"></div>
                                            </div>
                                        </div>
                                    </div>
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
