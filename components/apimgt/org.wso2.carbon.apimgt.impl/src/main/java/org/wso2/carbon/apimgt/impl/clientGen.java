package org.wso2.carbon.apimgt.impl;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.wso2.carbon.apimgt.api.APIManagementException;
import org.wso2.carbon.apimgt.api.model.SubscribedAPI;
import org.wso2.carbon.apimgt.impl.dao.ApiMgtDAO;
import org.wso2.carbon.apimgt.api.model.Subscriber;
import org.wso2.carbon.apimgt.impl.utils.APIUtil;
import org.wso2.carbon.apimgt.api.model.APIIdentifier;
import org.wso2.carbon.apimgt.impl.APIMRegistryService;
import org.wso2.carbon.apimgt.impl.internal.ServiceReferenceHolder;
import org.wso2.carbon.apimgt.impl.APIManagerFactory;
import java.util.Iterator;
import java.util.Set;
import java.io.*;

/**
 * Created by randika on 2/1/16.
 */
public class clientGen{
    public void sdkGeneration(String appName, String sdkLanguage,String userName, String groupId)
            throws APIManagementException {
        Subscriber currentSubscriber = null;
        Set<SubscribedAPI> APISet;
        String swaggerPath = null;
        APIIdentifier api;
        String swagger;
            currentSubscriber = ApiMgtDAO.getSubscriber(userName);
            ApiMgtDAO DAO = new ApiMgtDAO();
            System.out.println(currentSubscriber.getName());
            APISet=DAO.getSubscribedAPIs(currentSubscriber,appName,groupId);
            System.out.println(APISet.size());
            for (Iterator<SubscribedAPI> it = APISet.iterator(); it.hasNext(); ) {
                SubscribedAPI f = it.next();
                swaggerPath = APIUtil.getSwagger20DefinitionFilePath(f.getApiId().getApiName(),f.getApiId().getVersion(),f.getApiId().getProviderName());
                swagger = APIManagerFactory.getInstance().getAPIConsumer(userName).getSwagger20Definition(f.getApiId());
                System.out.println(swagger);

            }

        //ProcessBuilder pb = new ProcessBuilder("sh","/home/randika/workspace/carbon-apimgt-release-1.10.x/components/apimgt/swagger-codegen-master/generate.sh");

        }
}
