function showHideKeys(){

    if($('#showHideKeys').is(':checked')){
        $('.keyValues').each(function(){
            $(this).html($(this).attr('data-value'));
        });
    }else{
        $('.keyValues').each(function(){
            var len = $(this).attr('data-value').length;
            $(this).html(new Array(len + 1).join( '*' ));
        });
    }
}

function generateAndroidSdk(app) {
    $("#cssload-contain").fadeIn();
    jagg.post("/site/blocks/subscription/subscription-list/ajax/subscription-list.jag", {
        action:"generateSdk",
        selectedApp:app,
        language:"android",
    }, function (result) {
    $("#cssload-contain").fadeOut();
        if (!result.error) {
            window.location.href = "../themes/fancy/templates/subscription/subscription-list/js/download.jag?fileName="+result.appName+".zip";
//            location.reload();
        } else {
            jagg.message({content:result.message,type:"error"});
        }
    }, "json");
}

$(document).ready(function () {

    $('#scopeSelectButtonPop').click(function() {
        var selected = ($('.CheckboxProd:checked').map(function() {
            return this.value;
        }).get().join(' '));
        $('#prodScopeInput').attr('value', selected);
    });

    $('#scopeSelectButtonPopSand').click(function() {
        var selected = ($('.CheckboxSand:checked').map(function() {
            return this.value;
        }).get().join(' '));
        $('#sandScopeInput').attr('value', selected);
    });

    $.ajaxSetup({
        contentType: "application/x-www-form-urlencoded; charset=utf-8"
    });

    $("#refreshProdValidityTime").keyup(function() {
        var prodvalidityTime = $(this).val().trim();
        if (isNaN(prodvalidityTime)|| prodvalidityTime>9223372036854775807 || prodvalidityTime.length == 0) {
            if (prodvalidityTime.length != 0) {
                $(this).next().show();
            }
            $('.show-hide-key',$(this).parent()).attr('disabled','disabled');
            $('.app-key-generate-button',$(this).parent().parent().parent()).attr('disabled','disabled');
        } else {
            $(this).next().hide();
            $('.show-hide-key',$(this).parent()).removeAttr('disabled');
            $('.app-key-generate-button',$(this).parent().parent().parent()).removeAttr('disabled');
        }
    });

    $("#refreshSandValidityTime").keyup(function() {
        var sandvalidityTime = $(this).val().trim();
        if (isNaN(sandvalidityTime)|| sandvalidityTime>9223372036854775807 || sandvalidityTime.length == 0) {
            if (sandvalidityTime.length != 0) {
                $(this).next().show();
            }
            $('.show-hide-key',$(this).parent()).attr('disabled','disabled');
            $('.app-key-generate-button',$(this).parent().parent().parent()).attr('disabled','disabled');
        } else {
            $(this).next().hide();
            $('.show-hide-key',$(this).parent()).removeAttr('disabled');
            $('.app-key-generate-button',$(this).parent().parent().parent()).removeAttr('disabled');
        }
    });
    $('.generateAgainBtn').click(function () {

        var elem = $(this);
        var keyType = elem.attr("data-keyType");
        var applicationName = elem.attr("data-applicationName");

        jagg.post("/site/blocks/subscription/subscription-add/ajax/subscription-add.jag", {
            action:"cleanUpApplicationRegistration",
            applicationName:applicationName,
            keyType:keyType
        }, function (result) {
            if (!result.error) {
                location.reload();
            } else {
                jagg.message({content:result.message,type:"error"});
            }
        }, "json");

    });

    $('.js_toggle').click(function(){
        var $i = $('i',this);
        if($i.hasClass('icon-chevron-right')){
            $(this).next().show();
            $i.removeClass('icon-chevron-right');
            $i.addClass('icon-chevron-down');
            $.cookie($(this).attr('data-section'),'show');
        }else{
            $(this).next().hide();
            $i.removeClass('icon-chevron-down');
            $i.addClass('icon-chevron-right');
            $.cookie($(this).attr('data-section'),'hide');
        }
    });

    $('.js_toggle').each(function(){
        if($.cookie($(this).attr('data-section'))=="hide"){
            var $i = $('i',this);
            $(this).next().hide();
            $i.removeClass('icon-chevron-down');
            $i.addClass('icon-chevron-right');
        }
    });

    $('.app-key-generate-button').click(function () {
        var elem = $(this);
        var i = elem.attr("iteration");
        var keyType = elem.attr("data-keytype");
        var authoDomains;
        var domainsDiv;
        var regen;
        var link;
        var userName = elem.attr("data-username");
        var validityTime;
        var tokenScope;
        if (keyType == 'PRODUCTION') {
            authoDomains = $('#allowedDomainsPro').val();
            validityTime = $('#refreshProdValidityTime').val();
            tokenScope = $('#prodScopeInput').val();
        } else {
            authoDomains = $('#allowedDomainsSand').val();
            validityTime = $('#refreshSandValidityTime').val();
            tokenScope = $('#sandScopeInput').val();
        }

        /*
         if we have additional parameters we can pass them as a json object.
         */



        jagg.post("/site/blocks/subscription/subscription-add/ajax/subscription-add.jag", {

            action: "generateApplicationKey",
            application: elem.attr("data-application"),
            keytype: elem.attr("data-keytype"),
            callbackUrl: elem.attr("data-callbackUrl"),
            authorizedDomains: authoDomains,
            validityTime: validityTime,
            tokenScope:tokenScope,
            //jsonParams: oJsonParams
        }, function (result) {
            if (!result.error) {
                location.reload();
            } else {
                jagg.message({content: result.message, type: "error"});
            }
        }, "json");

        $(this).html(i18n.t('info.wait'));
    });

    $('.app-create-key-button').click(function () {
        var elem = $(this);
        var i = elem.attr("iteration");
        var keyType = elem.attr("data-keytype");
        var authoDomains;
        var domainsDiv;
        var regen;
        var link;
        var validityTime;
        var tokenScope;

        if (keyType == 'PRODUCTION') {
            authoDomains = $('#allowedDomainsPro').val();
            validityTime=$('#refreshProdValidityTime').val();
        } else {
            authoDomains = $('#allowedDomainsSand').val();
            validityTime=$('#refreshSandValidityTime').val();
        }
        tokenScope=$('#scopeInput').val();
        jagg.post("/site/blocks/subscription/subscription-add/ajax/subscription-add.jag", {
            action:"generateApplicationKey",
            application:elem.attr("data-application"),
            keytype:elem.attr("data-keytype"),
            callbackUrl:elem.attr("data-callbackUrl"),
            authorizedDomains:authoDomains,
            validityTime:validityTime,
            retryAfterFailure:true
        }, function (result) {
            if (!result.error) {
                location.reload();
            } else {
                jagg.message({content:result.message,type:"error"});
            }
        }, "json");

        $(this).html(i18n.t('info.wait'));
    });


    $('.key-table-content textarea').focus(function() {
        var $this = $(this);
        $this.select();

        // Work around Chrome's little problem
        $this.mouseup(function() {
            // Prevent further mouseup intervention
            $this.unbind("mouseup");
            return false;
        });
    });
    if($.cookie('showHideKeys') == "hide"){
        $('#showHideKeys').removeAttr('checked');
    }else{
        $('#showHideKeys').attr('checked','checked');
    }

    $('#showHideKeys').click(function(){
        if($('#showHideKeys').is(':checked')){
            $.cookie('showHideKeys','show');
        }else{
            $.cookie('showHideKeys','hide');
        }
        showHideKeys();
    });
    showHideKeys();

    $('.help_popup_cli_gen').click(function(){
        $('#cligen_help').toggle('fast', function()
        {
            $('#cligen_help').html(i18n.t('info.clieGenHelpMsg'));
        });
        return false;
    })

    $('.help_popup_prod').click(function(){
        $('#prodtoken_help').toggle('fast', function()
        {
            $('#prodtoken_help').html(i18n.t('info.tokenHelpMsg'));
        });
        return false;
    })

    $('.help_popup_sand').click(function(){
        $('#sandtoken_help').toggle('fast', function()
        {
            $('#sandtoken_help').html(i18n.t('info.tokenHelpMsg'));
        });
        return false;
    });

    $('.update_domain_popup_prod').click(function () {
        $('#update_help_prod').toggle('fast', function () {
            $('#update_help_prod').html(i18n.t('info.domainUpdateHelp'));
        });
        return false;
    });

    $('.update_domain_popup_sand').click(function () {
        $('#update_help_sand').toggle('fast', function () {
            $('#update_help_sand').html(i18n.t('info.domainUpdateHelp'));
        });
        return false;
    });

    $('.curlHelp_popup_prod').click(function () {
        $('#curlProdtoken_help').toggle('fast', function() {
            $('#curlProdtoken_help').html(i18n.t('info.curlHelpMsg'));
        });
        return false;
    });

    $('.curlHelp_popup_sand').click(function () {
        $('#curlSandtoken_help').toggle('fast', function () {
            $('#curlSandtoken_help').html(i18n.t('info.curlHelpMsg'));
        });
        return false;
    });

    $('#btnProvideKeyProduction').click(function () {
        $('.cDivParentOfManualAuthAppCreateProduction').show();
        $('.cDivDefaultBtnSet').hide();
    });

    $('#btnProvideKeySandBox').click(function () {
        $('.cDivParentOfManualAuthAppCreateSandBox').show();
        $('.defaultBtnSetForSandBox').hide();
    });


    $('#btnProvideKeyProductionCancle').click(function () {
        $('.cDivParentOfManualAuthAppCreateProduction').hide();
        $('.cDivDefaultBtnSet').show();
    });

    $('#btnProvideKeySandBoxCancel').click(function () {
        $('.cDivParentOfManualAuthAppCreateSandBox').hide();
        $('.defaultBtnSetForSandBox').show();
    });

    $("#btnProvideKeyProductionSave").click(function () {

        if($("#inputConsumerKeyProduction").val().trim() == "" || $("#inputConsumerSecretProduction").val().trim() == "") {
            jagg.message({content: "Consumer key and Consumer secret can not be empty.", type: "error"});
        }
        else{
            mapExistingOauthClient($(this));
        }

    });

    $("#btnProvideKeySandBoxSave").click(function () {

        if($("#inputConsumerKeySandBox").val().trim() == "" || $("#inputConsumerSecretSandBox").val().trim() == "") {
            jagg.message({content: "Consumer key and Consumer secret can not be empty.", type: "error"});
        }
        else{
            mapExistingOauthClient($(this));
        }

    });

});

var mapExistingOauthClient=function(oBtnElement){

    var elem = oBtnElement;
    var i = elem.attr("iteration");
    var keyType = elem.attr("data-keytype");
    var authoDomains;
    var clientId;
    var clientSecret;
    var userName = elem.attr("data-username");
    var validityTime;
    if (keyType == 'PRODUCTION') {
        authoDomains = $('#allowedDomainsPro').val();
        validityTime = $('#refreshProdValidityTime').val();
        clientId = $('#inputConsumerKeyProduction').val();
        clientSecret = $('#inputConsumerSecretProduction').val();
    } else {
        authoDomains = $('#allowedDomainsSand').val();
        validityTime = $('#refreshSandValidityTime').val();
        clientId = $('#inputConsumerKeySandBox').val();
        clientSecret = $('#inputConsumerSecretSandBox').val();
    }

    /*
     if we have additional parameters we can pass them as a json object.
     */
    var oJsonParams = {
        "username" : userName,
        "key_type" : keyType,
        "client_secret":clientSecret,
        "validityPeriod" : validityTime,
        "client_id" : clientId
    };
    console.log(oJsonParams);

    jagg.post("/site/blocks/subscription/subscription-add/ajax/subscription-add.jag", {
        action: "mapExistingOauthClient",
        applicationName: elem.attr("data-application"),
        keytype: elem.attr("data-keytype"),
        callbackUrl: elem.attr("data-callbackUrl"),
        authorizedDomains: authoDomains,
        validityTime: validityTime,
        jsonParams: JSON.stringify(oJsonParams),
        client_id : clientId
    }, function (result) {
        if (!result.error) {
            location.reload();
        } else {
            jagg.message({content: result.message, type: "error"});
        }
    }, "json");

    $(this).html(i18n.t('info.wait'));

}


var regenerate=function(appName,keyType,i,btn,div,clientId,clientSecret) {
    if(jagg.sessionExpired()){
        window.location.reload();
    }
    //jagg.sessionAwareJS({redirect:'/site/pages/subscriptions.jag'});
    //$('.show-hide-key pull-right').attr('disabled');
    $(btn).parent().hide();
    $(btn).parent().prev().show();
    var elem = $(this);
    var divId;
    var oldAccessToken;
    var inputId;
    var authorizedDomainsTemp;
    var clientId;
    var clientSecret;
    var validityTime;
    var tokenScope;

    if (keyType == 'PRODUCTION') {
        oldAccessToken = $('.prodAccessTokenHidden').val();
        authorizedDomainsTemp = $('#allowedDomainsPro').val();
        if(authorizedDomainsTemp == ''){$('#allowedDomainsPro').val('ALL')}
        validityTime=$('#refreshProdValidityTime').val().trim();
        tokenScope=$('#prodScopeInput').val();
    } else {
        oldAccessToken = $('.sandAccessTokenHidden').val();
        authorizedDomainsTemp = $('#allowedDomainsSand').val();
        if(authorizedDomainsTemp == ''){$('#allowedDomainsSand').val('ALL')}
        validityTime=$('#refreshSandValidityTime').val().trim();
        tokenScope=$('#sandScopeInput').val();
    }


    jagg.post("/site/blocks/subscription/subscription-add/ajax/subscription-add.jag", {
        action:"refreshToken",
        application:appName,
        keytype:keyType,
        oldAccessToken:oldAccessToken,
        authorizedDomains:authorizedDomainsTemp,
        clientId:clientId,
        clientSecret:clientSecret,
        validityTime:validityTime,
        tokenScope:tokenScope
    }, function (result) {
        if (!result.error) {
            $(btn).parent().show();
            $(btn).parent().prev().hide();
            var regenerateOption=result.data.key.enableRegenarate;
            var generatedScopesNames = "";

            if(result.data.key.tokenScope.length > 1){
                //generating comma seperated string of scope names.
                var generatedScopesArr = result.data.key.tokenScope;
                for(var i = 0; i<generatedScopesArr.length; i++){
                    var scopeId = "#"+generatedScopesArr[i];
                    var attr = $(scopeId).attr('name');
                    // For some browsers, `attr` is undefined; for others,
                    // `attr` is false.  Check for both.
                    if (attr) {
                        generatedScopesNames+=$(scopeId).attr('name');
                        if(i<generatedScopesArr.length - 1){
                            generatedScopesNames+=", ";
                        }
                    }
                }
            }

            // get scopeTxtBox successor
            var tokenTxtBox=$('#prodAccess').parents(".row-fluid .keys");
            var scopeTxtBox=$('#prodAccessScope');          // select scopeTxtBox

            //checking whether Scope is selected
            if(generatedScopesNames!=""){

                if(scopeTxtBox.length==0){  // checking whether scopeTxtBox is already exist

                    //generate scopeTxtBox and append
                    var scopeTxtDiv=    '<div class="row-fluid keys">'+
                        '<div class="span3">'+
                        '<b>Scope:</b>'+
                        '</div>'+
                        '<div class="span9">'+
                        '<div class="token">'+
                        '<span class="accessTokenScopeDisplayPro keyValues" id="prodAccessScope" data-value="'+generatedScopesNames+'">'+generatedScopesNames+'</span>'+
                        '</div>'+
                        '</div>'+
                        '</div>';
                    tokenTxtBox.before(scopeTxtDiv);
                }
            }else{  // if Scope is not selected
                if(scopeTxtBox.length>0){
                    //remove scopeTxtBox if Scope is not selected
                    tokenTxtBox.prev().remove();
                }
            }

            if(keyType == "PRODUCTION"){
                $('.prodAccessTokenHidden').val(result.data.key.accessToken);
                if(!regenerateOption){ $('.proRegenerateForm').hide(); }
                $('.accessTokenDisplayPro').html(result.data.key.accessToken).attr('data-value',result.data.key.accessToken);
                $('.accessTokenScopeDisplayPro').html(generatedScopesNames).attr('data-value',generatedScopesNames);
                showHideKeys();
            } else{
                $('.sandAccessTokenHidden').val(result.data.key.accessToken);
                if(!regenerateOption){ $('.sandRegenerateForm').hide(); }
                $('.accessTokenDisplaySand').html(result.data.key.accessToken).attr('data-value',result.data.key.accessToken);
                $('.sandScopeDisplayPro').html(generatedScopesNames).attr('data-value',generatedScopesNames);
                //change sandScopeDisplayPro name
                showHideKeys();
            }

            //Setting the domain info
            var domainResultVal = result.data.key.accessallowdomains;
            if (domainResultVal == '') {
                domainResultVal = 'ALL';
            }

            /*
             if (keyType == 'PRODUCTION') {
             $('#allowedDomainsPro').val(domainResultVal);
             } else {
             $('#allowedDomainsSand').val(domainResultVal);
             }
             */

        } else {
            jagg.message({content:result.message,type:"error"});
        }

        if (regenerateOption) {
            $(btn).show();
            $('#' + div).show();
        }



    }, "json");

    $(this).html(i18n.t('info.wait'));

}


var updateAccessAllowDomains = function(appName, keyType, i, btn) {
    jagg.sessionAwareJS({redirect:'/site/pages/subscriptions.jag'});
    var elem = $(btn);
    var oldAccessToken;
    var authorizedDomainsEdit;
    elem.next().hide();
    $(btn).html('Updating..').attr('disabled','disabled');
    if (keyType == 'PRODUCTION') {
        oldAccessToken = $('.prodAccessTokenHidden').val();
        authorizedDomainsEdit = $('#allowedDomainsPro').val();

    } else {
        oldAccessToken = $('.sandAccessTokenHidden').val();
        authorizedDomainsEdit = $('#allowedDomainsSand').val();
    }
    if(/([<>\"\'])/g.test(authorizedDomainsEdit)){
        jagg.message({content:"Input contains one or more illegal characters",type:"error"});
    }else{
        if(authorizedDomainsEdit == ''){$('#allowedDomainsPro').val('ALL')}
        jagg.post("/site/blocks/subscription/subscription-add/ajax/subscription-add.jag", {
            action:"updateAccessAllowDomains",
            application:appName,
            keytype:keyType,
            oldAccessToken:oldAccessToken,
            authorizedDomains:authorizedDomainsEdit
        }, function (result) {
            if (!result.error) {
                elem.html('Update Domains').removeAttr('disabled');
                elem.next().show();
                setTimeout(function(){elem.next().hide()},3000);
            } else {
                jagg.message({content:result.message,type:"error"});
            }
        }, "json");
    }
}

function toggleKey(toggleButton){
    var keyTable = $(toggleButton).parent().parent();

    if($('table',keyTable).is(":visible")){
        $('table',keyTable).hide();
        $('.info-msg',keyTable).show();
        $('.oauth-title',keyTable).hide();
        if(!$('.allowDomainDiv',keyTable).attr('.data-value') == "havetohide"){
            $('.allowDomainDiv',keyTable).show();
        }
        $(toggleButton).html('<i class="icon-arrow-down icon-white"></i>'+ i18n.t('titles.showKeys')+'');
    }else{
        $('table',keyTable).show();
        $('.info-msg',keyTable).hide();
        $('.oauth-title',keyTable).show();
        $('.allowDomainDiv',keyTable).hide();
        $(toggleButton).html('<i class="icon-arrow-up icon-white"></i>'+ i18n.t('titles.hideKeys')+'');
    }
}
function collapseKeys(index,type,link){

    if(type == 'super'){
        if($('#appDetails'+index+'_super').is(":visible")){
            $('i',link).removeClass('icon-minus').addClass('icon-plus');
        }else{
            $('i',link).removeClass('icon-plus').addClass('icon-minus');
        }
        $('#appDetails'+index+'_super').toggle();
    }else{
        if($('#appDetails'+index).is(":visible")){
            $('i',link).removeClass('icon-minus').addClass('icon-plus');
        }else{
            $('i',link).removeClass('icon-plus').addClass('icon-minus');
        }

        $('#appDetails'+index).toggle();
    }
}

function toggleAutSection(link){
    if($(link).next().is(":visible")){
        $(link).next().hide();
        $(link).html('Edit');
    }else{
        $(link).next().show();
        $(link).html('Hide');
        $('textarea',$(link).next()).focus();
    }
}

function toggleTokenTimeSection(link){
    if($(link).parent().next().is(":visible")){
        $(link).parent().next().hide();
        $(link).html('Edit');
    }else{
        $(link).parent().next().show();
        $(link).html('Hide');
        $('.token-validity-input',$(link).parent().next()).focus();
    }
}

function removeSubscription(apiName, version, provider,  applicationId, delLink) {
    jagg.sessionAwareJS({redirect:'/site/pages/subscriptions.jag'});
    $('#messageModal').html($('#confirmation-data').html());
    $('#messageModal h3.modal-title').html(i18n.t('confirm.delete'));
    $('#messageModal div.modal-body').html('\n\n'+i18n.t('confirm.unsubscribeMsg') +'<b>"' + apiName+'-'+version + '</b>"?');
    $('#messageModal a.btn-primary').html(i18n.t('info.yes'));
    $('#messageModal a.btn-other').html(i18n.t('info.no'));
    $('#messageModal a.btn-primary').click(function() {
        jagg.post("/site/blocks/subscription/subscription-remove/ajax/subscription-remove.jag", {
            action:"removeSubscription",
            name:apiName,
            version:version,
            provider:provider,
            applicationId:applicationId
        }, function (result) {
            if (!result.error) {
                $('#messageModal').modal("hide");
                location.href = '?removeSession=true&'+urlPrefix;
            } else {

                jagg.message({content:result.message,type:"error"});
            }
        }, "json"); });
    $('#messageModal a.btn-other').click(function() {
        return;
    });
    $('#messageModal').modal();

}
function toggleHelp(icon){
    var theHelpBlock = $('.help-block',$(icon).parent().parent());
    if(theHelpBlock.is(':visible')) { theHelpBlock.hide(); } else { theHelpBlock.show(); }
}
