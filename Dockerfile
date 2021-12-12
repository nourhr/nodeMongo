# stage 1
FROM node:14
# create working directory in the pod that contains node
RUN mkdir -p /app
#change the workdirectory to the /app
WORKDIR /app
#copy all files in existence directory to the /app
COPY . /app
#intall npm on the working directory ==> /app
RUN npm install
# run npm build in the working directory
CMD npm start




