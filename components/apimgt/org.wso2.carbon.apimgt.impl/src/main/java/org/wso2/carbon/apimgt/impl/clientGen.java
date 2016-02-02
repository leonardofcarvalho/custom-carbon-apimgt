package org.wso2.carbon.apimgt.impl;

import org.apache.openjpa.lib.log.Log;
import org.wso2.carbon.apimgt.impl.utils.APIUtil;

import java.io.FileNotFoundException;
import java.io.PrintWriter;
import java.io.UnsupportedEncodingException;

/**
 * Created by randika on 2/1/16.
 */
public class clientGen {

    public static void sdkGeneration(String appId, String sdkLanguage){
        System.out.println(sdkLanguage);
        Log.INFO(sdkLanguage);
        //APIUtil.getSwagger20DefinitionFilePath();
    }
}
