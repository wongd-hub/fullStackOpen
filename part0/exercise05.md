# Using https://www.websequencediagrams.com/

title Exercise 0.5: single page app


actor user
user->browser: Enters SPA
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa
server-->browser: HTML code
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
server-->browser: CSS code (main.css)
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/spa.js
server-->browser: JS code (spa.js)
note over browser: Browser executes spa.js which then launches:
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/data.json
server-->browser: [{content: "note1", date: "2021-11-16T18:09:07.329Z"},…]
note over browser: Notes displayed in browser
browser->server: HTTP GET https://studies.cs.helsinki.fi/favicon.ico
server-->browser: favicon.ico