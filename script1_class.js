function init_PSD_Process_class(){
    var PSD_Process_class = function(PSD_Process){
        this.ObjOcc = PSD_Process;
        this.functionsList = [];
        this.docList = [];
    }
   
    var proto = PSD_Process_class.prototype; 

        proto.CheckDOC = function(_defdoc){
        var curr_def=this.getObjDef().OccListInModel(this);
            if (curr_def==[]) return false
                else 
                { 
                    for (var i=0; i<defsArray.length; i++) {if (defsArray[i].ObjDef() ==_defs) return true;}
            
                }
                return false;
    }

     proto.getObjDef = function(){
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
           var functionsList =  epc_model.ObjOccListBySymbol(335);
           this.functionsList = functionsList;
           return functionsList;
        }
        return [];        
    }
       proto.getDocs = function(){
        var epc_model = this.getEPC();
        if(epc_model!=null){
           var docList =  epc_model.ObjOccListBySymbol([29,729]);
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