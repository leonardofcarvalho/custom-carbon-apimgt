package org.wso2.carbon.apimgt.rest.api.store.dto;

import java.util.*;
import org.wso2.carbon.apimgt.rest.api.store.dto.APIBusinessInformationDTO;

import io.swagger.annotations.*;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.validation.constraints.NotNull;



@ApiModel(description = "")
public class APIDTO  {
  
  
  
  private String id = null;
  
  @NotNull
  private String name = null;
  
  
  private String description = null;
  
  @NotNull
  private String context = null;
  
  @NotNull
  private String version = null;
  
  @NotNull
  private String provider = null;
  
  @NotNull
  private String apiDefinition = null;
  
  @NotNull
  private String status = null;
  
  
  private Boolean isDefaultVersion = null;
  
  
  private List<String> transport = new ArrayList<String>();
  
  
  private List<String> tags = new ArrayList<String>();
  
  
  private List<String> tiers = new ArrayList<String>();
  
  
  private String thumbnailUrl = null;
  
  
  private APIBusinessInformationDTO businessInformation = null;

  
  /**
   * UUID of the api registry artifact
   **/
  @ApiModelProperty(value = "UUID of the api registry artifact")
  @JsonProperty("id")
  public String getId() {
    return id;
  }
  public void setId(String id) {
    this.id = id;
  }

  
  /**
   **/
  @ApiModelProperty(required = true, value = "")
  @JsonProperty("name")
  public String getName() {
    return name;
  }
  public void setName(String name) {
    this.name = name;
  }

  
  /**
   **/
  @ApiModelProperty(value = "")
  @JsonProperty("description")
  public String getDescription() {
    return description;
  }
  public void setDescription(String description) {
    this.description = description;
  }

  
  /**
   **/
  @ApiModelProperty(required = true, value = "")
  @JsonProperty("context")
  public String getContext() {
    return context;
  }
  public void setContext(String context) {
    this.context = context;
  }

  
  /**
   **/
  @ApiModelProperty(required = true, value = "")
  @JsonProperty("version")
  public String getVersion() {
    return version;
  }
  public void setVersion(String version) {
    this.version = version;
  }

  
  /**
   * If the provider value is not given user invoking the api will be used as the provider.
   **/
  @ApiModelProperty(required = true, value = "If the provider value is not given user invoking the api will be used as the provider.")
  @JsonProperty("provider")
  public String getProvider() {
    return provider;
  }
  public void setProvider(String provider) {
    this.provider = provider;
  }

  
  /**
   * Swagger definition of the API which contains details about URI templates and scopes
   **/
  @ApiModelProperty(required = true, value = "Swagger definition of the API which contains details about URI templates and scopes")
  @JsonProperty("apiDefinition")
  public String getApiDefinition() {
    return apiDefinition;
  }
  public void setApiDefinition(String apiDefinition) {
    this.apiDefinition = apiDefinition;
  }

  
  /**
   **/
  @ApiModelProperty(required = true, value = "")
  @JsonProperty("status")
  public String getStatus() {
    return status;
  }
  public void setStatus(String status) {
    this.status = status;
  }

  
  /**
   **/
  @ApiModelProperty(value = "")
  @JsonProperty("isDefaultVersion")
  public Boolean getIsDefaultVersion() {
    return isDefaultVersion;
  }
  public void setIsDefaultVersion(Boolean isDefaultVersion) {
    this.isDefaultVersion = isDefaultVersion;
  }

  
  /**
   **/
  @ApiModelProperty(value = "")
  @JsonProperty("transport")
  public List<String> getTransport() {
    return transport;
  }
  public void setTransport(List<String> transport) {
    this.transport = transport;
  }

  
  /**
   **/
  @ApiModelProperty(value = "")
  @JsonProperty("tags")
  public List<String> getTags() {
    return tags;
  }
  public void setTags(List<String> tags) {
    this.tags = tags;
  }

  
  /**
   **/
  @ApiModelProperty(value = "")
  @JsonProperty("tiers")
  public List<String> getTiers() {
    return tiers;
  }
  public void setTiers(List<String> tiers) {
    this.tiers = tiers;
  }

  
  /**
   **/
  @ApiModelProperty(value = "")
  @JsonProperty("thumbnailUrl")
  public String getThumbnailUrl() {
    return thumbnailUrl;
  }
  public void setThumbnailUrl(String thumbnailUrl) {
    this.thumbnailUrl = thumbnailUrl;
  }

  
  /**
   **/
  @ApiModelProperty(value = "")
  @JsonProperty("businessInformation")
  public APIBusinessInformationDTO getBusinessInformation() {
    return businessInformation;
  }
  public void setBusinessInformation(APIBusinessInformationDTO businessInformation) {
    this.businessInformation = businessInformation;
  }

  

  @Override
  public String toString()  {
    StringBuilder sb = new StringBuilder();
    sb.append("class APIDTO {\n");
    
    sb.append("  id: ").append(id).append("\n");
    sb.append("  name: ").append(name).append("\n");
    sb.append("  description: ").append(description).append("\n");
    sb.append("  context: ").append(context).append("\n");
    sb.append("  version: ").append(version).append("\n");
    sb.append("  provider: ").append(provider).append("\n");
    sb.append("  apiDefinition: ").append(apiDefinition).append("\n");
    sb.append("  status: ").append(status).append("\n");
    sb.append("  isDefaultVersion: ").append(isDefaultVersion).append("\n");
    sb.append("  transport: ").append(transport).append("\n");
    sb.append("  tags: ").append(tags).append("\n");
    sb.append("  tiers: ").append(tiers).append("\n");
    sb.append("  thumbnailUrl: ").append(thumbnailUrl).append("\n");
    sb.append("  businessInformation: ").append(businessInformation).append("\n");
    sb.append("}\n");
    return sb.toString();
  }
}
