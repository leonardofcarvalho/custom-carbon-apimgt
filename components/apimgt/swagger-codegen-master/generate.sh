#!/bin/bash

MY_PATH="`dirname \"$0\"`"              # relative
MY_PATH="`( cd \"$MY_PATH\" && pwd )`"  # absolutized and normalized
if [ -z "$MY_PATH" ] ; then
  # error; for some reason, the path is not accessible
  # to the script (e.g. permissions re-evaled after suid)
  exit 1  # fail
fi

 java -jar "${MY_PATH}/modules/swagger-codegen-cli/target/swagger-codegen-cli.jar" generate \
  -i "http://petstore.swagger.io/v2/swagger.json"\
  -l java \
  -o "${MY_PATH}/javaClientSdk"

cd $MY_PATH/javaClientSdk
mvn clean compile assembly:single
cd target/
mv swagger-java-client-1.0.0-jar-with-dependencies.jar androidLib.jar
cd ~

cp $MY_PATH/javaClientSdk/target/androidLib.jar $MY_PATH
rm -r $MY_PATH/javaClientSdk
