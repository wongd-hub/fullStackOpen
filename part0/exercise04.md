# Using https://www.websequencediagrams.com/

title Exercise 0.4: new note


actor user
user->browser: Writes and submits note
note right of browser: Browser sends input to server
browser->server: HTTP POST https://fullstack-exampleapp.herokuapp.com/new_note
server-->browser: STATUS 302 URL Redirect
browser->server: HTTP GET https://fullstack-exampleapp.herokuapp.com/notes
note over browser: 
This reload triggers 
the following sequence
end note
server-->browser: HTML Code
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.css
server-->browser: main.css
browser->server: HTTP GET https://studies.cs.helsinki.fi/exampleapp/main.js
server-->browser: main.js
note over browser: Page now displays new note