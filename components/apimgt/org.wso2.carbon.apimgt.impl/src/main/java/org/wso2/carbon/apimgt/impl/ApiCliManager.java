package org.wso2.carbon.apimgt.impl;
import org.wso2.carbon.apimgt.api.APIManagementException;
import org.wso2.carbon.apimgt.api.model.SubscribedAPI;
import org.wso2.carbon.apimgt.impl.dao.ApiMgtDAO;
import org.wso2.carbon.apimgt.api.model.Subscriber;
import org.wso2.carbon.apimgt.impl.utils.APIUtil;
import org.wso2.carbon.apimgt.api.model.APIIdentifier;
import org.wso2.carbon.registry.core.exceptions.RegistryException;


import java.util.*;
import java.io.*;


/**
 * Created by randika on 2/1/16.
 */
public class ApiCliManager{
    public String sdkGeneration(String appName, String sdkLanguage,String userName, String groupId)
            throws RegistryException, APIManagementException, IOException, InterruptedException {
        Subscriber currentSubscriber = null;
        Set<SubscribedAPI> APISet;
        String resourcePath = null;
        APIIdentifier api;
        String swagger="failed";
        ProcessBuilder pb;
        Process p;
        APIConsumerImpl consumer =  (APIConsumerImpl)APIManagerFactory.getInstance().getAPIConsumer(userName);
        currentSubscriber = ApiMgtDAO.getSubscriber(userName);
        ApiMgtDAO DAO = new ApiMgtDAO();
        System.out.println(currentSubscriber.getName());
        APISet=DAO.getSubscribedAPIs(currentSubscriber,appName,groupId);
        System.out.println(APISet.size());
        File file = null;
        String[] commandsToGen =  new String[4];
        String[] commandsToZip =  new String[3];
        commandsToGen[0]="sh";
        commandsToGen[1]="resources/swaggerCodegen/generate.sh";
        commandsToZip[0]="sh";
        commandsToZip[1]="resources/swaggerCodegen/toZip.sh";
        for (Iterator<SubscribedAPI> it = APISet.iterator(); it.hasNext(); ) {
            SubscribedAPI f = it.next();
            resourcePath = APIUtil.getSwagger20DefinitionFilePath(f.getApiId().getApiName(),f.getApiId().getVersion(),f.getApiId().getProviderName());
            if (consumer.registry.resourceExists(resourcePath + APIConstants.API_DOC_2_0_RESOURCE_NAME)) {
                swagger = consumer.definitionFromSwagger20.getAPIDefinition(f.getApiId(),consumer.registry);
                file = new File("resources/swaggerCodegen/swagger.json");
                if (!file.exists()) {
                    file.createNewFile();
                }
                FileWriter fw = new FileWriter(file.getAbsoluteFile());
                BufferedWriter bw = new BufferedWriter(fw);
                bw.write(swagger);
                bw.close();
                commandsToGen[2]=f.getApiId().getApiName();
                commandsToGen[3]=appName;
                pb = new ProcessBuilder(commandsToGen);
                p = pb.start();     // Start the process.
                p.waitFor();
            }


        }
        commandsToZip[2]=appName;
        pb = new ProcessBuilder(commandsToZip);
        p = pb.start();     // Start the process.
        p.waitFor();
        return appName;
    }
}
