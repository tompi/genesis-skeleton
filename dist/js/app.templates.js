angular.module("app.templates", []).run(["$templateCache", function($templateCache) {

  $templateCache.put("app/partials/error/404.html",
    "<h3><em>404</em> - This page could not be found</h3>" +
    "" +
    "<p>" +
    "  The URL <code>{{ url }}</code> could not be loaded." +
    "</p>" +
    ""
  );

  $templateCache.put("app/partials/error/500.html",
    "<h3><em>500</em> - This page encountered an error</h3>" +
    "" +
    "<p>" +
    "  The URL <code>{{ url }}</code> encountered an error and could not be loaded." +
    "</p>" +
    ""
  );

  $templateCache.put("app/partials/error/index.html",
    "<section id=\"error\">" +
    "  <div class=\"container-narrow\" ng-include src=\"'partials/error/' + error + '.html'\">" +
    "    <h3>Sorry, there was an error.</h3>" +
    "" +
    "    <p>" +
    "      Please go back and try your request again." +
    "    </p>" +
    "  </div>" +
    "</section>" +
    ""
  );

  $templateCache.put("app/partials/guide.html",
    "<section id=\"guide\">" +
    "  <div class=\"container-narrow\">" +
    "    <div class=\"row-fluid\">" +
    "      <div class=\"well well-small span3\">" +
    "" +
    "        <div ng-repeat=\"section in toc()\" ng-include=\"'app/partials/guide/toc.html'\"></div>" +
    "" +
    "      </div>" +
    "" +
    "      <div class=\"span9\">" +
    "" +
    "        <h2>Guide</h2>" +
    "" +
    "        <p>" +
    "          This guide will take you throw the logical steps of how to install" +
    "          Genesis Skeleton, the folder structure &amp; conventions, how to" +
    "          manage both client &amp; server-side dependencies, and more." +
    "        </p>" +
    "" +
    "        <section ng-repeat=\"section in toc()\" ng-include=\"'app/partials/guide/section.html'\"></section>" +
    "      </div>" +
    "" +
    "    </div>" +
    "  </div>" +
    "</section>"
  );

  $templateCache.put("app/partials/guide/installation.html",
    "<h3>Installation</h3>" +
    "" +
    "<p>" +
    "  Because this project is a Skeleton, it is meant to be the <em>beginning</em>" +
    "  of your app.  If you'd like to utlize it within an existing project, you should" +
    "  follow the <a href=\"#/guide#installation-upgrading\">Upgrading</a> instructions." +
    "</p>" +
    ""
  );

  $templateCache.put("app/partials/guide/installation/download.html",
    "<h4>Download <small>(Preferred)</small></h4>" +
    "" +
    "<p>" +
    "  <small>This method is preferred as it doesn't clutter your project's history with that of Genesis Skeleton.</small>" +
    "</p>" +
    "" +
    "<p>" +
    "  <a href=\"https://github.com/ericclemmons/genesis-skeleton/archive/master.zip\" class=\"btn btn-small\"><strong>Download</strong> (.zip)</a>" +
    "  the latest release, unzip it, &amp; rename the folder to match your own project's name, such as:" +
    "  <code>~/Sites/my-project</code>." +
    "</p>" +
    ""
  );

  $templateCache.put("app/partials/guide/installation/git.html",
    "<h4>Git</h4>" +
    "" +
    "<p>" +
    "  <small>If you intend to constantly stay up-to-date with this project, then this method may be best.</small>" +
    "</p>" +
    "" +
    "<p>" +
    "  Rather than using <code>git clone</code>, it is recommended to create a project" +
    "  on Github, follow their instructions, and already have a repository created &amp;" +
    "  cloned." +
    "" +
    "</p>" +
    "" +
    "<pre class=\"pre-scrollable\">" +
    "$ cd ~/Sites/my-project" +
    "<br>" +
    "$ git remote add genesis git://github.com/ericclemmons/genesis-skeleton.git" +
    "<br>" +
    "$ git fetch && git merge genesis/master" +
    "</pre>" +
    ""
  );

  $templateCache.put("app/partials/guide/installation/upgrading.html",
    "<h4>Upgrading</h4>" +
    "" +
    "<strong>TODO</strong>" +
    ""
  );

  $templateCache.put("app/partials/guide/requirements.html",
    "<h3>Requirements</h3>" +
    "" +
    "<ol>" +
    "  <li><a href=\"http://nodejs.org/\">NodeJS</a> with NPM.</li>" +
    "  <li><a href=\"http://gruntjs.com/\">GruntJS</a> <code>npm install -g grunt-cli</code>.</li>" +
    "  <li><a href=\"http://twitter.github.com/bower/\">Bower</a> <code>npm install -g bower</code>.</li>" +
    "</ol>" +
    "" +
    "<p>" +
    "  <small>GruntJS &amp; Bower both recommend being <strong>globally</strong> installed.</small>" +
    "</p>" +
    ""
  );

  $templateCache.put("app/partials/guide/section.html",
    "<div id=\"{{ id() }}\" ng-include=\"template()\"></div>" +
    "" +
    "<section ng-repeat=\"section in toc(section)\" ng-include=\"'app/partials/guide/section.html'\"></section>" +
    ""
  );

  $templateCache.put("app/partials/guide/toc.html",
    "<ul class=\"nav nav-list\">" +
    "  <li>" +
    "    <a ng-href=\"#/guide/#{{ id() }}\">{{ label() }}</a>" +
    "    <li ng-repeat=\"section in toc(section)\" ng-include=\"'app/partials/guide/toc.html'\" />" +
    "  </li>" +
    "</ul>"
  );

  $templateCache.put("app/partials/header.html",
    "<div class=\"container-narrow\">" +
    "  <div class=\"row-fluid\">" +
    "" +
    "    <div>" +
    "      <h2>Ruter7 open <em>2013</em>.</h2>" +
    "    </div>" +
    "" +
    "  </div>" +
    "</div>" +
    ""
  );

  $templateCache.put("app/partials/home.html",
    "<header ng-include=\"'app/partials/header.html'\"></header>" +
    "<section id=\"about\">" +
    "    <div class=\"container-narrow\" autoscroll>" +
    "        <div class=\"row-fluid\">" +
    "            <div class=\"span7\">" +
    "                <h3>Hotell Caledonien 1. og 2. Juni</h3>" +
    "                <p>Vi samler eliten og nybegynnere i en fantastisk hyggelig turnering" +
    "                i Kristiansand. I år spiller vi på" +
    "                    <a href=\"http://www.radissonblu.no/hotel-kristiansand\">hotell Caledonien</a>.</p>" +
    "                <h3>Program</h3>" +
    "                <p>" +
    "                    <b>Fredag 31. mai</b>" +
    "                    <ul>" +
    "                        <li>" +
    "                            <b>18.00-02:00 </b>Bridgepub på vinkjelleren, hotel caledonien. Vi har hele" +
    "                            kjelleren for oss selv</li>" +
    "                    </ul>" +
    "                    <b>Lørdag 1. juni</b>" +
    "                    <ul>" +
    "                        <li>" +
    "                            <b>10:00-18:00 </b>Hovedturnering.</li>" +
    "                        <li>" +
    "                            <b>13:30-14:30 </b>Caledoniens berømte lunsjbuffet.</li>" +
    "                        <li>" +
    "                            <b>19:30-02:00 </b>3-retters gallamiddag og så konsert med Stein Roger Sordal" +
    "                            og co.</li>" +
    "                    </ul>" +
    "                    <b>Søndag 2. juni</b>" +
    "                    <ul>" +
    "                        <li>" +
    "                            <b>10:00-16:00 </b>Åpen gruppe.</li>" +
    "                        <li>" +
    "                            <b>10:00-16:00 </b>Eliteturnering.</li>" +
    "                    </ul>" +
    "                </p>" +
    "                <p>Lørdagens parturnering er for absolutt alle. Meld deg på som par akkurat" +
    "                    som du pleier, men har du mindre enn 30 mesterpoeng kan du bli trukket" +
    "                    ut til å spille med en av våre stjernespillere. Se under påmelding for" +
    "                    detaljer.</p>" +
    "                <h2></h2>" +
    "                <p></p>" +
    "            </div>" +
    "            <div class=\"span5\">" +
    "                <div class=\"smallpic\">" +
    "                    <img src=\"/img/small/knuste-helgemo.png\" alt=\"Knuste Helgemo\" />" +
    "                </div>" +
    "                <div class=\"smallpic\">" +
    "                    <img src=\"/img/small/hotellfasade-small.png\" alt=\"Spille-hotellet\" />" +
    "                </div>" +
    "            </div>" +
    "        </div>" +
    "    </div>" +
    "</section>" +
    ""
  );

  $templateCache.put("app/partials/nav.html",
    "<div class=\"navbar navbar-fixed-top navbar-inverse\" bs-navbar>" +
    "  <div class=\"navbar-inner\">" +
    "  <div class=\"container-narrow\">" +
    "      <ul class=\"nav\">" +
    "        <li data-match-route=\"/\"><a href=\"#/home\">Hjem</a></li>" +
    "        <li data-match-route=\"/spillested\"><a href=\"#/spillested\">Spillested/overnatting</a></li>" +
    "        <li data-match-route=\"/stjerner\"><a href=\"#/stjerner\">Stjerner</a></li>" +
    "        <li data-match-route=\"/paamelding\"><a href=\"#/paamelding\">Påmelding</a></li>" +
    "      </ul>" +
    "      <div class=\"clearfix\"></div>" +
    "  </div>" +
    "  </div>" +
    "</div>" +
    ""
  );

  $templateCache.put("app/partials/spillested.html",
    "<div class=\"container-narrow\">" +
    "  <div class=\"row-fluid\">" +
    "    <div>" +
    "      <h3>Velkommen til hotell Caledonien.</h3>" +
    "    </div>" +
    "  </div>" +
    "</div>" +
    "<section id=\"about\">" +
    "    <div class=\"container-narrow\" autoscroll>" +
    "        <div class=\"row-fluid\">" +
    "            <div class=\"span7\">" +
    "                <p>" +
    "                  Priser pr. rom pr. natt, inkludert frokost og mva:" +
    "                  <ul>" +
    "                      <li>Enkeltrom: <b>945,-</b></li>" +
    "                      <li>Dobbeltrom: <b>945,-</b></li>" +
    "                  </ul>" +
    "                  Bruk denne lenken for å bestille: <a href=\"http://www.radissonblu.no/booking-entrance?language=no&countrycode=NO&cityid=Kristiansand&paccode=Ruter7\">rabatterte rom.</a>" +
    "                    ( Husk å skrive inn riktig dato i høyre felt)" +
    "                </p>" +
    "            </div>" +
    "            <div class=\"span5\">" +
    "                <div class=\"smallpic\"><img src=\"/img/small/hotell1.jpg\" alt=\"hotell\" /></div>" +
    "                <div class=\"smallpic\"><img src=\"/img/small/hotell2.jpg\" alt=\"hotell\" /></div>" +
    "                <div class=\"smallpic\"><img src=\"/img/small/hotell3.jpg\" alt=\"hotell\" /></div>" +
    "                <div class=\"smallpic\"><img src=\"/img/small/hotell4.jpg\" alt=\"hotell\" /></div>" +
    "                <div class=\"smallpic\"><img src=\"/img/small/hotell5.jpg\" alt=\"hotell\" /></div>" +
    "                <div class=\"smallpic\"><img src=\"/img/small/hotell6.jpg\" alt=\"hotell\" /></div>" +
    "                <div class=\"smallpic\"><img src=\"/img/small/hotell7.jpg\" alt=\"hotell\" /></div>" +
    "            </div>" +
    "        </div>" +
    "    </div>" +
    "</section>" +
    ""
  );

}]);
