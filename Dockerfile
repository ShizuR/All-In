# NOT FUNCTIONAL YET

#create own image to move our html files around with the image
# consider a reverse proxy to handle requests
# static website

#build custom image from base image
FROM nginx:latest 
WORKDIR /app

# Source - https://stackoverflow.com/a/53060756
# Posted by Adiii, modified by community. See post 'Timeline' for change history
# Retrieved 2026-08-03, License - CC BY-SA 4.0

RUN chown nginx:nginx /usr/share/nginx/html/*

#overrides default html in the container
COPY ./siteContent /usr/share/nginx/html

#https://oneuptime.com/blog/post/2026-02-08-how-to-use-the-expose-instruction-in-dockerfiles-and-what-it-actually-does/view
#EXPOSE 8080 does not work as it uses the default 80

# reminder link second html

#commands
## executes command in dockerfile
#docker build -t webserver .
## run web
## -d = run in background, -p = port, --name assignes name
#docker run -it --rm -d -p 8080:80 --name web webserver
## stop running
# docker stop web

#open in http://localhost:8080/

#https://docs.docker.com/get-started/workshop/02_our_app/
#https://hub.docker.com/_/nginx
#https://www.docker.com/blog/how-to-use-the-official-nginx-docker-image/
# https://oneuptime.com/blog/post/2026-02-08-how-to-create-a-dockerfile-for-a-static-website/view#adding-health-checks