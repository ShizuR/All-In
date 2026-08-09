# NOT FUNCTIONAL YET

#create own image to move our html files around with the image
# consider a reverse proxy to handle requests
# static website

FROM postgres:18
ADD initialData.sql /docker-entrypoint-initdb.d/
ENTRYPOINT ["docker-entrypoint.sh"]
EXPOSE 8888
CMD ["postgres"]

#https://www.atdatabases.org/docs/pg-guide-typescript
# non functional file