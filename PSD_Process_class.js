function init_PSD_Process_class(){
    var PSD_Process_class = function(PSD_Process){
        this.ObjOcc = PSD_Process;
        this.functionsList = [];
        this.docList = [];
    }
   
    var proto = PSD_Process_class.prototype; 

        proto.CheckDOC = function(_defdoc){
        var epc = this.getEPC();
        if (epc==null) return false
        var curr_def=_defdoc.OccListInModel(epc);
        
      //  if (_defdoc.length==0) return false
           if (curr_def.length!=0) return true;
                return false;
    }
    
    proto.getDefs = function(){
        return this.ObjOcc.ObjDef();
    }
    proto.getName = function(){
        return this.ObjOcc.ObjDef().Name(g_Nloc);
    }
    
    proto.getEPC = function(){
        var assicnedModels = this.ObjOcc.ObjDef().AssignedModels(13);
        if(assicnedModels.length>0){
            return assicnedModels[0];
        }
        return null;
    }
    
    proto.getFunctions = function(){
        var epc_model = this.getEPC();
        if(epc_model!=null){
           var functionsList =  epc_model.ObjOccListBySymbol(335);
           this.functionsList = functionsList;
           return functionsList;
        }
        return [];        
    }
       proto.getDocs = function(){
        var epc_model = this.getEPC();
        if(epc_model!=null){
           var docList =  epc_model.ObjOccListBySymbol([29,729]);
           this.docList = docList;
           return docList;
        }
        return [];        
    }
    proto.getAutomationPercent = function(){
        return this.getAutomatedFunctions().length/this.getFunctions().length*100
    }
    
    proto.getAutomatedFunctions = function(){
        return this.getFunctions().filter(function(epc_func){ return epc_func.getConnectedObjOccs([Constants.ST_APPL_SYS_TYPE, Constants.ST_MOD_TYPE] , Constants.EDGES_INOUT )>0});  
    }
    
    return PSD_Process_class;
}

