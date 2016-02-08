package org.wso2.carbon.apimgt.impl;

import io.swagger.codegen.*;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.wso2.carbon.apimgt.api.APIConsumer;
import org.wso2.carbon.apimgt.api.APIManagementException;
import org.wso2.carbon.apimgt.api.model.SubscribedAPI;
import org.wso2.carbon.apimgt.impl.dao.ApiMgtDAO;
import org.wso2.carbon.apimgt.api.model.Subscriber;
import org.wso2.carbon.apimgt.impl.utils.APIUtil;
import org.wso2.carbon.apimgt.api.model.APIIdentifier;
import org.wso2.carbon.apimgt.impl.APIMRegistryService;
import org.wso2.carbon.apimgt.impl.internal.ServiceReferenceHolder;
import org.wso2.carbon.apimgt.impl.APIManagerFactory;
import org.wso2.carbon.apimgt.impl.internal.ServiceReferenceHolder;
import org.wso2.carbon.registry.api.*;
import org.wso2.carbon.registry.api.Resource;
import org.wso2.carbon.registry.core.Registry;
import org.wso2.carbon.registry.core.exceptions.RegistryException;
import org.wso2.carbon.registry.core.utils.RegistryUtils;
import org.wso2.carbon.registry.core.*;
import java.util.Iterator;
import java.util.List;
import java.util.Set;
import org.wso2.carbon.registry.core.RegistryConstants;
import java.io.*;
import io.swagger.codegen.cmd.Generate;
import io.swagger.codegen.CliOption;
/**
 * Created by randika on 2/1/16.
 */
public class clientGen{
    public File sdkGeneration(String appName, String sdkLanguage,String userName, String groupId)
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
            file = new File("resources/swaggerCodegen/"+appName+".zip");
            return file;
        }
}
