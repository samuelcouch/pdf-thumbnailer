PDF to Thumbnail
=================
Lob Coding Exercise

#### The Challenge
Build an API that converts a PDF into an array of thumbnails (one for each page) and then responds with URLs for each generated thumbnail.

1. Input can only be a PDF
  - By utilizing Joi validation directly on the server route, I was able to bypass response handling in my route handler, in the event of a non-pdf upload. 
1. Start with the Hapi skeleton provided by Lob
  - The skeleton provided established a basic server running on port 8000. I further extended this and made it slightly more dynamic by calling on a local config or environment variable.
1. You may not use any Node packages for the file conversion
  - The way to avoid third-party packages is to utilize `child_process` in the Node standard API. This grants you access to command line programs. 
1. You may use outside command line programs
  - I used Imagemagick for the file conversion

Other packages used:
- gulp
  - For task automation. Created continously watching tasks in order to live-reload when changes were made during devlopment.


##Usage
1. `gulp setup`
  - This creates and cleans the directories necesary for file storage
1. `npm install`
  - Installs all of our dependencies
1. `gulp`
  - Runs the default gulp task, which is to start our server, watch our files updates and restart after changes