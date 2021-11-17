# Using https://www.websequencediagrams.com/

title Exercise 0.6: single page app - new note

actor user
user->browser: Submits new note
note over browser:
notes_form event handler
prevents refresh and adds
new note to page, then:
end note
browser->server: HTTP POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
