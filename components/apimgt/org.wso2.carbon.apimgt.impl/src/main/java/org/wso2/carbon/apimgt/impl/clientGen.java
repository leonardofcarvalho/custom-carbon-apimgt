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
    public void sdkGeneration(String appName, String sdkLanguage,String userName, String groupId)
            throws RegistryException, APIManagementException, IOException {
        Subscriber currentSubscriber = null;
        Set<SubscribedAPI> APISet;
        String resourcePath = null;
        APIIdentifier api;
        String swagger="failed";
        String path="none";
        String uuid="none";
        String parentpath ="none";
        String permPath = "none";
          // APIConsumerImpl consumer = new APIConsumerImpl();
        //APIConsumer consumer = APIManagerFactory.getInstance().getAPIConsumer(userName);
        APIConsumerImpl consumer =  (APIConsumerImpl)APIManagerFactory.getInstance().getAPIConsumer(userName);
            currentSubscriber = ApiMgtDAO.getSubscriber(userName);
            ApiMgtDAO DAO = new ApiMgtDAO();
            System.out.println(currentSubscriber.getName());
            APISet=DAO.getSubscribedAPIs(currentSubscriber,appName,groupId);
            System.out.println(APISet.size());
           File file = null;
        for (Iterator<SubscribedAPI> it = APISet.iterator(); it.hasNext(); ) {
                SubscribedAPI f = it.next();
                resourcePath = APIUtil.getSwagger20DefinitionFilePath(f.getApiId().getApiName(),f.getApiId().getVersion(),f.getApiId().getProviderName());
                //swagger = APIManagerFactory.getInstance().getAPIConsumer(userName).getSwagger20Definition(f.getApiId());
               // System.out.println(swagger);
                if (consumer.registry.resourceExists(resourcePath + APIConstants.API_DOC_2_0_RESOURCE_NAME)) {
                    swagger = consumer.definitionFromSwagger20.getAPIDefinition(f.getApiId(),consumer.registry);
//                    path = consumer.registry.get(resourcePath + APIConstants.API_DOC_2_0_RESOURCE_NAME).getPath();
//                    uuid=consumer.registry.getRegistryContext().getBasePath();
//                    parentpath = consumer.registry.getRegistryContext().getRegistryRoot();
                    file = new File("resources/swaggerCodegen/swagger.json");
                    if (!file.exists()) {
                        file.createNewFile();
                    }
                    FileWriter fw = new FileWriter(file.getAbsoluteFile());
                    BufferedWriter bw = new BufferedWriter(fw);
                    bw.write(swagger);
                    bw.close();

                }


//                System.out.println(swagger);
            //System.out.println(path);
            }
//        ClientOpts clientOpts = new ClientOpts();
//       // clientOpts.setOutputDirectory("/home/randika/Documents/WSO2_stuff/wso2am-1.10.1-SNAPSHOT/bin");
//        clientOpts.setTarget("java");
//        clientOpts.setUri("http://petstore.swagger.io/v2/swagger.json");
//        ClientOptInput clientOptInput = new ClientOptInput();
//        clientOptInput.setOpts(clientOpts);
//        Generate generate = new Generate();
//        generate.run();
//        System.out.println(path);
//        uuid=consumer.registry.getRegistryContext().getBasePath();
        }
}
