package org.wso2.carbon.apimgt.impl;

import org.wso2.carbon.apimgt.api.APIManagementException;
import org.wso2.carbon.apimgt.impl.dao.ApiMgtDAO;
import org.wso2.carbon.apimgt.api.model.Subscriber;

/**
 * Created by randika on 2/1/16.
 */
public class clientGen {

    public static void sdkGeneration(String appName, String sdkLanguage,String userName, String groupId){
        System.out.println(sdkLanguage);

        Subscriber currentSubscriber = null;
        try {
            currentSubscriber = ApiMgtDAO.getSubscriber(userName);
            ApiMgtDAO DAO = new ApiMgtDAO();
            DAO.getSubscribedAPIs(currentSubscriber,appName,groupId);
        } catch (APIManagementException e) {
            e.printStackTrace();
        }


        }


        //APIUtil.getSwagger20DefinitionFilePath();

}
